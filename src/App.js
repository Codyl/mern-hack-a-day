import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import { Users } from "./users/pages/Users";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import NewPlace from "./places/pages/NewPlace";
import UserPlaces from "./places/pages/UserPlaces";
import UpdatePlace from "./places/pages/UpdatePlace";
import Auth from "./places/pages/Auth";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route exact path='/'>
            <Users />
          </Route>
          <Route path={'/places/new'} exact>
            <NewPlace />
          </Route>
          <Route path='/:userId/places' exact>
            <UserPlaces />
          </Route>
          <Route path='/places/:pid' exact>
            <UpdatePlace />
          </Route>
          <Route path='/auth'>
            <Auth></Auth>
          </Route>
          <Redirect to='/' />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
