import { createContext } from 'react';
//Reflect the content you will have in the context
//Context is used to share data accross components without prop drilling through components that do not need them
export const AuthContext = createContext({
  isLoggedin: false,
  userId: null,
  token: null,
  login: () => {},
  logout: () => {},
});
//Values for the context are set in App.js in Context.Provider
