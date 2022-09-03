import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './NavLinks.css';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { logout } from '../../redux/reducer';
let logoutTimer;

const NavLinks = (props) => {
  const uid = useSelector((state) => state.userId);
  const isLoggedin = useSelector((state) => state.isLoggedin);
  const token = useSelector((state) => state.token);
  const tokenExpiration = useSelector((state) => state.tokenExpiration);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (token && tokenExpiration) {
      const remainingTime =
        new Date(tokenExpiration).getTime() - new Date().getTime();
      logoutTimer = setTimeout(() => dispatch(logout()), remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpiration, dispatch]);

  const logoutHandler = () => {
    dispatch(logout());
    localStorage.removeItem('userData');
    history.push('/auth');
  };

  return (
    <ul className='nav-links'>
      <li>
        <NavLink to={'/'} exact>
          ALL USERS
        </NavLink>
      </li>
      {isLoggedin && (
        <li>
          <NavLink to={`/${uid}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {isLoggedin && (
        <li>
          <NavLink to={'/places/new'}>ADD PLACE</NavLink>
        </li>
      )}
      {!isLoggedin && (
        <li>
          <NavLink to={'/auth'}>AUTHENTICATE</NavLink>
        </li>
      )}
      {isLoggedin && (
        <li>
          <button onClick={logoutHandler}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
