import api from './api';

export const registerUser = async (data) => {
  const res = await api.post('/auth/register', data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};
export const googleLogin = async (credential) => {
  const res = await api.post('/auth/google', { credential });
  return res.data;
};

// payload is { password } or, for Google accounts, { credential }
export const deleteAccount = async (payload) => {
  const res = await api.delete('/profile', { data: payload });
  return res.data;
};

export const forgotPassword = async (email) => {
  const res = await api.post('/auth/forgot-password', { email });
  return res.data;
};

export const resetPassword = async (token, password) => {
  const res = await api.post(`/auth/reset-password/${token}`, { password });
  return res.data;
};