import { defineStore } from "pinia";
import { supabase } from "../lib/supaBase";

export const useCarStore = defineStore("carStore", {
  state: () => ({
    cars: [],
    purchasedCount: 0, // New state property to hold the count of cars not purchased
    loading: false,
    error: null,
  }),
  actions: {
    async fetchCars() {
      this.loading = true;
      const loggedInUserId = this.getLoggedInUserId(); // Use a helper method to get user ID

      if (!loggedInUserId) {
        this.error = "Network error, please Login again";
        this.loading = false;
        return;
      }

      try {
        const { data, error } = await supabase
          .from("cars")
          .select(
            `
            *,
            users (*)
          `
          )
          .eq("for_sale", true)
          .eq("is_pending", false)
          .eq("is_for_shop", false)
          .neq("user_id", loggedInUserId);

        if (error) throw error;

        this.cars = this.shuffleArray(data); // Store the fetched cars in Pinia state
      } catch (err) {
        this.error = err.message || "An error occurred while fetching cars.";
      } finally {
        this.loading = false;
      }
    },

    // New function to fetch cars not in the purchased_cars table and count them
    async fetchCarsNotInPurchased() {
      this.loading = true;
      const loggedInUserId = this.getLoggedInUserId(); // Helper method to get user ID

      if (!loggedInUserId) {
        this.error = "Network error, please login again.";
        this.loading = false;
        return;
      }

      try {
        // Fetch cars from the new Supabase view
        const { data, error } = await supabase
          .from("cars_not_in_purchased") // Use the view
          .select("*")
          .neq("car_owner_id", loggedInUserId); // Exclude cars belonging to the logged-in user

        if (error) throw error;

        this.cars = this.shuffleArray(data); // Shuffle the results
        this.purchasedCount = this.cars.length; // Update the count of available cars
      } catch (err) {
        this.error = err.message || "An error occurred while fetching cars.";
      } finally {
        this.loading = false;
      }
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
      }
      return array;
    },

    getLoggedInUserId() {
      return localStorage.getItem("user_id"); // Utility function to get user ID
    },
  },
});
