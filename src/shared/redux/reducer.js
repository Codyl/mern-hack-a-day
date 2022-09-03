import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedin: false,
    userId: null,
    token: null,
    tokenExpiration: null,
  },
  reducers: {
    login: (state, action) => {
      let expiration;
      const prevExpiration = JSON.parse(
        localStorage.getItem('userData')
      )?.expiration;
      //If no previous expiration then create a new expiration
      if (!prevExpiration) {
        //User was not signed in or sign in has expired
        expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
      } else {
        expiration = new Date(prevExpiration); //action in actions does not have expiration
      }
      const { payload } = action;
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: payload.userId,
          token: payload.token,
          expiration: expiration.toISOString(),
        })
      );

      return {
        ...state,
        isLoggedin: true,
        userId: payload.userId,
        token: payload.token,
        tokenExpiration: expiration.toISOString(),
      };
    },
    logout: (state) => {
      return {
        ...state,
        isLoggedin: false,
        userId: null,
        token: null,
        tokenExpiration: null,
      };
    },
  },
});

export const { login, logout } = slice.actions;
export default slice.reducer;
