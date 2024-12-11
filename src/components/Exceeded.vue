<template>
  <v-container>
    <!-- Loading State -->
    <v-row v-if="loading" justify="center" align="center">
      <v-col cols="12" md="6">
        <v-alert type="info" class="text-center">
          Loading data, please wait...
        </v-alert>
      </v-col>
    </v-row>

    <!-- Error State -->
    <v-row v-if="error" justify="center" align="center">
      <v-col cols="12" md="6">
        <v-alert type="error" class="text-center">
          {{ error }}
        </v-alert>
      </v-col>
    </v-row>

    <!-- Rentals Exceeding End Date -->
    <v-row v-if="exceededRentals.length > 0" justify="center">
      <v-col
        v-for="item in exceededRentals"
        :key="item.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card elevation="6" class="rounded-lg overflow-hidden">
          <!-- Car Image -->
          <v-img
            v-if="item.car && item.car.img"
            :src="item.car.img"
            alt="Car Image"
            height="200px"
            cover
          ></v-img>
          <v-img
            v-else
            src="https://via.placeholder.com/200"
            alt="No Image Available"
            height="200px"
            cover
          ></v-img>

          <!-- Card Content -->
          <v-card-title class="font-weight-bold text-black">
            {{
              item.car ? `${item.car.brand} ${item.car.model}` : "Unknown Car"
            }}
          </v-card-title>

          <v-card-text>
            <!-- Rental End Date -->
            <p class="mb-1 text-black">
              <strong>Rental End Date:</strong> {{ item.date_end }}
            </p>

            <!-- Days Exceeded -->
            <p class="mb-1 text-black">
              <strong>Days Exceeded:</strong>
              <span class="text-red">{{
                calculateDaysExceeded(item.date_end)
              }}</span>
            </p>

            <!-- Buyer Name -->
            <p class="mb-0 text-black">
              <strong>Buyer Name:</strong>
              <span v-if="item.transaction && item.transaction.user">
                {{ formatFullName(item.transaction.user) }}
              </span>
              <span v-else>Not available</span>
            </p>
          </v-card-text>

          <!-- Actions -->
        </v-card>
      </v-col>
    </v-row>

    <!-- No Rentals Exceeded -->
    <v-row v-else justify="center" align="center">
      <v-col cols="12" md="6">
        <v-alert type="success" class="text-center">
          No rentals have exceeded their total days.
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { supabase } from "../lib/supaBase";

export default {
  data() {
    return {
      exceededRentals: [],
      loading: true,
      error: null,
      currentDate: new Date().toISOString().substr(0, 10),
    };
  },
  async created() {
    await this.fetchExceededRentals();
  },
  methods: {
    // Fetch rentals that exceeded their end date
    async fetchExceededRentals() {
      this.loading = true;
      try {
        const { data, error } = await supabase.from("rented_cars").select(`
            *,
            transaction:transaction_id(buyer_id, user:buyer_id(first_name, middle_name, last_name)),
            car:cars_id(brand, model, img)
          `);

        if (error) throw error;

        // Filter rentals where end date has passed
        this.exceededRentals = data.filter((item) => {
          const endDate = new Date(item.date_end);
          const today = new Date(this.currentDate);
          return endDate < today; // Check if the rental is overdue
        });
      } catch (err) {
        console.error("Error fetching exceeded rentals:", err);
        this.error = "Failed to load data. Please try again.";
      } finally {
        this.loading = false;
      }
    },
    // Calculate how many days have exceeded the rental end date
    calculateDaysExceeded(endDate) {
      if (!endDate) return 0;
      const end = new Date(endDate);
      const today = new Date(this.currentDate);
      const exceededDays = Math.floor((today - end) / (1000 * 60 * 60 * 24));
      return exceededDays > 0 ? exceededDays : 0;
    },
    // Format full name
    formatFullName(user) {
      const { first_name = "", middle_name = "", last_name = "" } = user;
      return `${first_name} ${middle_name} ${last_name}`.trim();
    },
    // Dummy View Details Action
    viewDetails(item) {
      alert(
        `Viewing details for car: ${item.car ? item.car.brand : "Unknown"}`
      );
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: box-shadow 0.3s ease-in-out;
  background-color: #f9f9f9;
}

.v-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
}

.text-red {
  font-size: larger;
  font-weight: bold;
  color: red;
}

.v-alert {
  border-radius: 12px;
}
</style>
