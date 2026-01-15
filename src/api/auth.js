import api from './index';

export const login = (firstname, lastname) => {
  return api.post('/api/auth/login', { firstname, lastname });
};

export const register = (firstname, lastname) => {
  return api.post('/api/auth/register', { firstname, lastname });
};
