import { defineStore } from 'pinia';

export const useAnimatorStore = defineStore('animator', {
  state: () => ({
    isLoaded: false,
  }),
  actions: {
    setLoaded(value) {
      this.isLoaded = value;
    },
  },
});
