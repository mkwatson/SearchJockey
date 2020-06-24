import React, {
  FunctionComponent,
  useState,
  useContext,
  useEffect,
} from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Navigation from '../Navigation';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import HomePage from '../Search';
import Admin from '../Admin';

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

          <PrivateRoute exact path={ROUTES.ADMIN} component={Admin} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <PrivateRoute path={ROUTES.SEARCH} component={HomePage} />
        </div>
      </Router>
    </AuthUserContext.Provider>
  );
};

export default App;
