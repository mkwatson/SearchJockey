import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';

import * as ROUTES from '../../constants/routes';
import { FirebaseContext } from '../Firebase';
import { User } from 'firebase';
import { AuthUserContext, PrivateRoute } from '../Session';

const App: FunctionComponent = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase?.auth.onAuthStateChanged((authUser) => {
      return authUser ? setAuthUser(authUser) : setAuthUser(null);
    });
  });

  return (
    <AuthUserContext.Provider value={authUser}>
      <Router>
        <div>
          <Navigation />

          <hr />

          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <PrivateRoute path={ROUTES.HOME} component={HomePage} />
          <PrivateRoute path={ROUTES.ACCOUNT} component={AccountPage} />
        </div>
      </Router>
    </AuthUserContext.Provider>
  );
};

export default App;
