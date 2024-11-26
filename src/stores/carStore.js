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
        this.error = "User not logged in";
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
      const loggedInUserId = this.getLoggedInUserId(); // Use a helper method to get user ID

      if (!loggedInUserId) {
        this.error = "User not logged in";
        this.loading = false;
        return;
      }

      try {
        // First, fetch the list of car_ids from the purchased_cars table
        const { data: purchasedCars, error: purchasedCarsError } =
          await supabase.from("purchased_cars").select("car_id");

        if (purchasedCarsError) throw purchasedCarsError;

        // Extract the car_ids from the result
        const purchasedCarIds = purchasedCars.map((car) => car.car_id);

        if (purchasedCarIds.length === 0) {
          // If there are no purchased cars, fetch all the cars for sale
          this.fetchCars();
          this.purchasedCount = this.cars.length; // Set purchasedCount to the length of all available cars
          return;
        }

        // Initialize the query for fetching cars for sale
        let query = supabase
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

        // Add individual "not equals" condition for each car_id in the purchased_cars list
        purchasedCarIds.forEach((carId) => {
          query = query.not("id", "eq", carId);
        });

        // Run the final query with the exclusion conditions
        const { data, error } = await query;

        if (error) throw error;

        this.cars = this.shuffleArray(data); // Store the fetched cars in Pinia state
        this.purchasedCount = this.cars.length; // Set purchasedCount to the length of available cars
      } catch (err) {
        this.error =
          err.message ||
          "An error occurred while fetching cars not in purchased_cars table.";
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
