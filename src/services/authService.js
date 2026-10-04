import api from './api';

export const register = (data) => {
  return api.post('/auth/register', data);
};

export const login = (data) => {
  return api.post('/auth/login', data);
};

export const logout = () => {
  return api.post('/auth/logout');
};

export const getProfile = () => {
  return api.get('/auth/profile');
};

export const updateProfile = (data) => {
  
  return api.put('/auth/profile', data);
};

export const changePassword = (data) => {
  
  return api.put('/auth/change-password', data);
};

export const forgotPassword = (data) => {
 
  return api.post('/auth/forgot-password', data);
};

export const resetPassword = (token, email, password) => {
    return api.post('/auth/reset-password', {
        token,
        email,
        password
    });
};

export const verifyEmail = (token,email) => {
  return api.get('/auth/verify-email', {
    params: {
      token,
      email
    }
  });
};
