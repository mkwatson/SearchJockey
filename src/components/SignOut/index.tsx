import React, { useContext } from 'react';

import { FirebaseContext } from '../Firebase';

const SignOutButton: React.FunctionComponent = () => {
  const firebase = useContext(FirebaseContext);

  return (
    <button type="button" onClick={firebase?.doSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;
