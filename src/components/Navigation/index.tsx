import React, { FunctionComponent, useContext } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';
import { User } from 'firebase';
import { AuthUserContext } from '../Session';

type INavigationProps = {
  authUser: User | null;
};

const Navigation: FunctionComponent = () => {
  const authUser = useContext(AuthUserContext);
  return <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth: FunctionComponent = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.SEARCH}>Search</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>Integrations</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </div>
);

const NavigationNonAuth: FunctionComponent = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  </div>
);

export default Navigation;
