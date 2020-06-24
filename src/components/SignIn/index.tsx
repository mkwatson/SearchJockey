import React, { useContext, useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { get } from 'lodash';

import { SignUpLink } from '../SignUp';
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { useForm } from 'react-hook-form';

const SignInPage: React.FunctionComponent = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

type ISignInState = {
  email: string;
  password: string;
  error: Error | null;
};

const SignInForm: React.FunctionComponent = () => {
  const firebase = useContext(FirebaseContext);

  const { register, handleSubmit, watch, setValue } = useForm<ISignInState>();
  const [error, setError] = useState(null);

  const history = useHistory();

  const onSubmit = useCallback(
    (event: ISignInState) => {
      const { email, password } = event;

      firebase
        ?.doSignInWithEmailAndPassword(email, password)
        .then(() => {
          // eslint-disable-next-line
          // @ts-ignore
          window.heap.identify(firebase.auth.currentUser?.uid);
          setValue([{ email: '' }, { password: '' }]);
          history.push(ROUTES.SEARCH);
        })
        .catch((error) => {
          setError(error);
        });
    },
    // eslint doesn't like the next line, but Jest does
    // eslint likes `firebase?doSignInWithEmailAndPassword` instead of `firebase`,
    // but Jest doesn't like it
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [firebase, history, setValue]
  );

  const { email, password } = watch();

  const isInvalid = password === '' || email === '';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="email"
        type="text"
        placeholder="Email Address"
        ref={register({ required: true })}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        ref={register({ required: true })}
      />
      <button disabled={isInvalid} type="submit">
        Sign In
      </button>
      {get(error, 'message')}
    </form>
  );
};

export default SignInPage;

export { SignInForm };
