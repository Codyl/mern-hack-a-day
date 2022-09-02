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
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRef } from 'react';

const App = () => {
  const token = useSelector((state) => state.token);
  //needs to change routes when token changes

  const routes = useRef(
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
  useEffect(() => {
    if (token) {
      routes.current = (
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
      console.log(token);
    }
  }, [token]);

  return (
    <Router>
      <MainNavigation />
      <main>{routes.current}</main>
    </Router>
  );
};

export default App;
