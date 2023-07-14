import axios from 'axios';
import router from '@/router';

export const vaxios = axios.create({
  baseURL: '/api',
});

vaxios.interceptors.request.use((config) => {
  try {
    let token = '';
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.token) {
      token = user.token;
    }
    config.headers.Authorization = `Bearer ${token}`;
  } catch (e) {
    console.log(e);
  }

  return config;
});

vaxios.interceptors.response.use((response) => {
  const { data } = response;

  switch (data.code) {
    case 419:
      localStorage.removeItem('user');
      router.push('/login');
      break;
    default:
      console.log(data.code);
      break;
  }

  return data;
});
