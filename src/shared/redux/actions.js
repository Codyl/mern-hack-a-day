export const login = (userId, token) => {
  console.log('action', token);
  return {
    type: 'auth/login',
    userId: userId,
    token: token,
  };
};

export const logout = () => {
  return {
    type: 'auth/logout',
  };
};
