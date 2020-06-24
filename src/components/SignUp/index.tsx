import React, { useContext, useCallback, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from '../Firebase';
import { get } from 'lodash';

const SignUpPage: React.FunctionComponent = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
);

type ISignUpState = {
  email: string;
  passwordOne: string;
  passwordTwo: string;
  error: Error | null;
};

const SignUpForm: React.FunctionComponent = () => {
  const firebase = useContext(FirebaseContext);

  const { register, handleSubmit, watch, setValue } = useForm<ISignUpState>();
  const [error, setError] = useState(null);

  const history = useHistory();

  const onSubmit = useCallback(
    (event: ISignUpState) => {
      const { email, passwordOne } = event;

      firebase
        ?.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(() => {
          // eslint-disable-next-line
          // @ts-ignore
          window.heap.identify(firebase.auth.currentUser?.uid);
          setValue([{ email: '' }, { passwordOne: '' }, { passwordTwo: '' }]);
          history.push(ROUTES.SEARCH);
        })
        .catch((error) => {
          setError(error);
        });
    },
    // eslint doesn't like the next line, but Jest does
    // eslint likes `firebase?doCreateUserWithEmailAndPassword` instead of `firebase`,
    // but Jest doesn't like it
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [firebase, setValue, history]
  );

  const { email, passwordOne, passwordTwo } = watch();

  // TODO: This is computed twice with every keystroke in the text input
  const isInvalid =
    passwordOne !== passwordTwo || passwordOne === '' || email === '';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="email"
        type="text"
        placeholder="Email Address"
        ref={register({ required: true })}
      />
      <input
        name="passwordOne"
        type="password"
        placeholder="Password"
        ref={register({ required: true })}
      />
      <input
        name="passwordTwo"
        type="password"
        placeholder="Confirm Password"
        ref={register({ required: true })}
      />
      <button disabled={isInvalid} type="submit">
        Sign Up
      </button>
      {get(error, 'message')}
    </form>
  );
};

const SignUpLink: React.FunctionComponent = () => (
  <p>
    Don&#39;t have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
