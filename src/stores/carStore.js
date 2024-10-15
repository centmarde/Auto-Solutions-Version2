import { defineStore } from 'pinia';
import { supabase } from '../lib/supaBase';

export const useCarStore = defineStore('carStore', {
  state: () => ({
    cars: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchCars() {
      this.loading = true;
      const loggedInUserId = localStorage.getItem("user_id"); // Get the logged-in user's ID

      try {
        const { data, error } = await supabase
          .from('cars')
          .select(`
            *,
            users (
              *
            )
            
          `)
          .eq('forSale', true) // Fetch only cars for sale
          .neq('user_id', loggedInUserId);

        if (error) throw error;

        this.cars = this.shuffleArray(data); // Store the fetched cars in Pinia state
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
  },
});
