import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '.';

export const ProtectedRoute: React.FC<RouteProps> = (props) => {
  const authUser = useContext(AuthUserContext);
  return authUser ? <Route {...props} /> : <Redirect to={ROUTES.SIGN_IN} />;
};

export default ProtectedRoute;
