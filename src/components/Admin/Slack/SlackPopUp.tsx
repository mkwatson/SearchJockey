import React, { useCallback, useContext } from 'react';
import Firebase, { FirebaseContext } from '../../Firebase';

import OauthPopup from 'react-oauth-popup';

const CLIENT_ID = process.env.REACT_APP_SLACK_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_SLACK_CLIENT_SECRET;

const callbackURL = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? ':' + window.location.port : ''
}/`;

const getUserIntegrationDetails = async (key: string, firebase: Firebase) =>
  firebase.db
    .ref(key)
    .once('value')
    .then((userData) => userData.val());

// Todo: more specific type for `token`
const persistSlackToken = (
  token: Record<string, unknown>,
  firebase: Firebase | null
) => {
  const key = 'users/' + firebase?.auth.currentUser?.uid;

  firebase?.db
    .ref(key)
    .update({
      slack: token,
    })
    .then(
      () =>
        getUserIntegrationDetails(key, firebase).then((userData) =>
          console.log(userData)
        ),
      (err) => {
        throw new Error(err);
      }
    );
};

const onCodeBase = (code: string, firebase: Firebase | null) => {
  fetch(
    `https://slack.com/api/oauth.v2.access?
    client_id=${CLIENT_ID}&
    client_secret=${CLIENT_SECRET}&
    code=${code}&
    redirect_uri=${callbackURL}`
  ).then(
    (response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      response.json().then(
        (token) => persistSlackToken(token, firebase),
        (err) => {
          throw new Error(err);
        }
      );
    },
    (err) => {
      throw new Error(err);
    }
  );
};

const onClose = () => 0;

const SlackPopUp: React.FunctionComponent = () => {
  const firebase = useContext(FirebaseContext);

  const onCode = useCallback((code: string) => onCodeBase(code, firebase), [
    firebase,
  ]);

  const url = `https://slack.com/oauth/v2/authorize?
    user_scope=search:read&
    client_id=546986287779.1211613981472&
    redirect_uri=${callbackURL}`;

  return (
    <OauthPopup url={url} onCode={onCode} onClose={onClose}>
      <button>Click me to add Slack</button>
    </OauthPopup>
  );
};

export default SlackPopUp;
