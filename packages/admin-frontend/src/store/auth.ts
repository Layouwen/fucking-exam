import { defineStore } from 'pinia';
import { loginApi, registerApi } from '@/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
  }),
  actions: {
    async login(data: { email: string; password: string }) {
      const res = await loginApi(data);
      if (res.code === 200) {
        this.token = res.data.token;
      }
      return res;
    },
    async register(data: { email: string; password: string; code: string }) {
      const res = await registerApi(data);
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
