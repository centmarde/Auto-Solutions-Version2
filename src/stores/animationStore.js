// stores/animationStore.js
import { defineStore } from 'pinia';

export const useAnimationStore = defineStore('animation', {
  state: () => ({
    animationData: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchAnimationData() {
      this.loading = true;
      try {
        const response = await fetch('/param.json');
        if (!response.ok) {
          throw new Error('Failed to load param.json');
        }
        const data = await response.json();
        this.animationData = data;
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
