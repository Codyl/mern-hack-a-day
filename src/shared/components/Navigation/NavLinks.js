import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './NavLinks.css';
import { AuthContext } from '../../context/authContext';

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <ul className='nav-links'>
      <li>
        <NavLink to={'/'} exact>
          ALL USERS
        </NavLink>
      </li>
      {auth.isLoggedin && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedin && (
        <li>
          <NavLink to={'/places/new'}>ADD PLACE</NavLink>
        </li>
      )}
      {!auth.isLoggedin && (
        <li>
          <NavLink to={'/auth'}>AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedin && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
