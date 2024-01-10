// authStore.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: null as string | null,
  }),
  actions: {
    setToken(token: string) {
      this.token = token;
      localStorage.setItem('userToken', token);
    },
    getToken() {
      return this.token;
    },
    removeToken() {
      this.token = null;
      localStorage.removeItem('userToken');
    },
    init() {
      const token = localStorage.getItem('userToken');
      if (token) {
        this.token = token;
      }
    },
  },
});