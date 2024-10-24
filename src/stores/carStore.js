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
      const loggedInUserId = localStorage.getItem("user_id");

      try {
        const { data: cars, error: carsError } = await supabase
          .from('cars')
          .select(`
            *,
            users (
              *
            ),
            purchased_cars (
              *
            )
          `)
          .eq('for_sale', true)
          .eq('is_pending', false)
          .eq('is_for_shop', false)
          .neq('user_id', loggedInUserId);
        
        if (carsError) throw carsError;
        
        // Filter out cars that are not paid from the fetched cars
        const unpaidCars = cars.filter(car => {
          return car.purchased_cars.length === 0 || 
                 !car.purchased_cars.some(purchase => purchase.is_paid);
        });

        this.cars = this.shuffleArray(unpaidCars); // Store the filtered unpaid cars in Pinia state
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
