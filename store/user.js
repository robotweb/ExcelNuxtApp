import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    username: null,
  }),
  persist: {
    storage: process.client ? localStorage : null
  } 
});