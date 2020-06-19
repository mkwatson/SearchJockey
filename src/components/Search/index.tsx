import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Firebase, { FirebaseContext } from '../Firebase';
import { get } from 'lodash';
import moment from 'moment';

const getUserIntegrationDetails = async (key: string, firebase: Firebase) =>
  firebase.db
    .ref(key)
    .once('value')
    .then((userData) => userData.val());

interface ISlackMessage {
  username: string;
  text: string;
  permalink: string;
  iid: string;
  ts: string;
  [x: string]: any;
}

interface ISlackMessages {
  matches: Array<ISlackMessage>;
  pagination: any;
  paging: any;
  total: number;
}

interface ISlackQueryResult {
  ok: boolean;
  query: string;
  files: any;
  posts: any;
  messages: ISlackMessages;
}

const makeQuery = (firebase: Firebase, query: string, setStateFn: any) => {
  const key = 'users/' + firebase?.auth.currentUser?.uid;
  getUserIntegrationDetails(key, firebase).then((data) => {
    const token = data.slack.authed_user.access_token;

    fetch(
      `https://slack.com/api/search.all?
        token=${token}&
        query=${query}&
        sort=timestamp&`
    ).then(
      (response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        response
          .json()
          .then((data: ISlackQueryResult) => setStateFn(data.messages.matches));
      },

      (err) => {
        throw new Error(err);
      }
    );
  });
};

const resultRow: React.FunctionComponent<ISlackMessage> = (
  result: ISlackMessage
) => {
  console.log(result);
  return (
    <li key={result.iid}>
      <a
        href={result.permalink}
        target="_blank"
        rel="noopener noreferrer"
      >{`${moment.unix(parseFloat(result.ts)).format('llll')} ${
        result.username
      } - ${result.text}`}</a>
    </li>
  );
};

type Inputs = {
  query: string;
};

const Search: React.FunctionComponent = () => {
  const [queryResults, setQueryResults] = useState([]);
  const firebase = useContext(FirebaseContext);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    const query = get(data, 'query');
    console.log(makeQuery(firebase!, query, setQueryResults));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="query"
          placeholder="Search Across All Apps"
          ref={register({ required: true })}
        />
        <button type="submit">Search</button>
      </form>
      <ul>{queryResults.map(resultRow)}</ul>
    </div>
  );
};

export default Search;
