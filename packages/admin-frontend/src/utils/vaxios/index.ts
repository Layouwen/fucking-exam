import axios from 'axios';
import { MessagePlugin } from 'tdesign-vue-next';
import router from '@/router';
import { useAuthStore } from '@/store';

export const vaxios = axios.create({
  baseURL: '/api',
});

vaxios.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  const { token } = authStore;

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

vaxios.interceptors.response.use((response) => {
  const authStore = useAuthStore();
  const { data } = response;

  switch (data.code) {
    case 200:
      break;
    case 419:
      authStore.logout();
      router.push('/login');
      MessagePlugin.error(data.msg);
      break;
    case 499:
      authStore.logout();
      router.push('/login');
      MessagePlugin.error(data.msg);
      break;
    default:
      console.log(data.code, data);
      break;
  }

  return data;
});
