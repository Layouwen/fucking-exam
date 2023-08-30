import { defineStore } from 'pinia';
import { loginApi } from '@/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
  }),
  actions: {
    async login(userInfo: { email: string; password: string }) {
      const res = await loginApi({
        email: userInfo.email,
        password: userInfo.password,
      });
      if (res.code === 200) {
        this.token = res.data.token;
      }
      return res;
    },
    async logout() {
      this.token = '';
    },
  },
  persist: {},
});
