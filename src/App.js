import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { Users } from './users/pages/Users';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './users/pages/Auth';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useRef } from 'react';
import { login } from './shared/redux/reducer';

const App = () => {
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  //needs to change routes when token changes
  //runs after the render cycle
  //Get the signed in data if it has not expired so the user can stay logged in.
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'));
    if (data && data.token && new Date() < new Date(data.expiration)) {
      dispatch(login({ userId: data.userId, token: data.token }));
    } else {
      localStorage.removeItem('userData');
    }
  }, [dispatch]);

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
    } else {
      routes.current = (
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
    <Router>
      <MainNavigation />
      <main>{routes.current}</main>
    </Router>
  );
};

export default App;
