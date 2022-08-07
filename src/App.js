import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom/cjs/react-router-dom.min';
import { Users } from './users/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';
import { AuthContext } from './shared/context/authContext';
import useAuth from './shared/hooks/authHook';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route exact path='/'>
          <Users />
        </Route>
        <Route path='/:userId/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/places/new' exact>
          <NewPlace />
        </Route>
        <Route path='/places/:pid' exact>
          <UpdatePlace />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path='/'>
          <Users />
        </Route>
        <Route path='/:userId/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedin: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
