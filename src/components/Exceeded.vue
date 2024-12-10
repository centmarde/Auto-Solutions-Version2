<template>
  <v-container>
    <v-row v-if="loading">
      <v-col>
        <v-alert type="info">Loading...</v-alert>
      </v-col>
    </v-row>

    <v-row v-if="error">
      <v-col>
        <v-alert type="error">{{ error }}</v-alert>
      </v-col>
    </v-row>

    <v-row v-if="exceededRentals.length > 0">
      <v-col
        v-for="item in exceededRentals"
        :key="item.transaction.id"
        cols="12"
        md="6"
      >
        <v-card elevation="4" class="mb-4">
          <v-row no-gutters>
            <v-col cols="4">
              <v-img
                v-if="item.car.img"
                :src="item.car.img"
                alt="Car Image"
                height="150px"
                cover
              ></v-img>
            </v-col>

            <v-col cols="8">
              <v-card-title>
                {{ item.car.brand }} {{ item.car.model }}
              </v-card-title>
              <v-card-text>
                <p>
                  <strong>Rental End Date:</strong>
                  {{ item.rented_car.date_end }}
                </p>
                <p>
                  <strong>Days Exceeded:</strong>
                  {{ calculateDaysExceeded(item.rented_car.date_end) }}
                </p>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <v-alert type="success">
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
    async fetchExceededRentals() {
      this.loading = true;
      try {
        const { data, error } = await supabase
          .from("rented_cars")
          .select("*, transaction:transaction_id(*), cars:cars_id(*)");

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
    calculateDaysExceeded(endDate) {
      const end = new Date(endDate);
      const today = new Date(this.currentDate);
      const exceededDays = Math.floor((today - end) / (1000 * 60 * 60 * 24));
      return exceededDays > 0 ? exceededDays : 0;
    },
  },
};
</script>

<style scoped>
.v-card {
  transition: box-shadow 0.3s ease-in-out;
}

.v-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
</style>
