import React, { useState, useCallback, useEffect } from 'react';
let logoutTimer;
const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, token, tokenExpirationDate]);

  //runs after the render cycle
  //Get the signed in data if it has not expired so the user can stay logged in.
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('userData'));
    if (data && data.token && new Date() < new Date(data.expiration)) {
      login(data.userId, data.token, data.expiration);
    }
  }, [login]);

  const login = useCallback((uid, token, prevExpiration) => {
    setUserId(uid);
    setToken(token);
    let expiration;
    if (!prevExpiration) {
      //User was not signed in or sign in has expired
      expiration = new Date();
      expiration.setHours(expiration.getHours() + 1);
    } else {
      expiration = prevExpiration;
    }

    setTokenExpirationDate(expiration);

    //react sanitizes to prevent cross site scripting
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: expiration.toISOString(),
      })
    );
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);
  return { token, login, logout, userId };
};
export default useAuth;
