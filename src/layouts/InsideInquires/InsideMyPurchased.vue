<template>
    <v-row v-if="userCars.length > 0">
      <v-col v-for="car in userCars" :key="car.id" cols="12" md="6" class="mb-4">
        <v-card elevation="8" class="fixed-card" @click="handleCardClick(car.id)">
          <v-row no-gutters>
            <v-col cols="12">
              <v-img
                v-if="car.img"
                :src="car.img"
                alt="Car Image"
                class="img-fluid rounded-top"
                cover
                height="180px"
              ></v-img>
            </v-col>
  
            <v-col cols="12">
              <v-card-title>{{ car.brand }} {{ car.model }}</v-card-title>
              <v-card-subtitle>{{ car.year }} - {{ car.mileage }} miles</v-card-subtitle>
              <v-card-text>
                <p class="truncate-text single-line">{{ car.description }}</p>
                <p><strong>Price:</strong> ${{ car.price }}</p>
                <p><strong>Torque:</strong> {{ car.torque }}</p>
                <p><strong>Top Speed:</strong> {{ car.top_speed }}</p>
             
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <v-chip
                      v-bind="attrs"
                      v-on="on"
                      :color="car.is_paid ? 'green' : 'red'"
                      dark
                      small
                      class="status-chip"
                    >
                      <v-icon left>
                        {{ car.is_paid ? 'mdi-check-circle' : 'mdi-cancel' }}
                      </v-icon>
                      {{ car.is_paid ? 'Paid' : 'Not Paid' }}
                    </v-chip>
                  </template>
                  <span>{{ car.is_paid ? 'Payment Completed' : 'Payment Pending' }}</span>
                </v-tooltip>
  
                <v-alert v-if="!car.is_paid" type="warning" class="mt-2">
                  <v-icon left>mdi-alert-circle</v-icon>
                  After 7 days, you breach our terms and conditions. You must pay the exact amount to avoid cancellation.
                </v-alert>
              </v-card-text>
              <v-card-actions class="d-flex justify-content-end">
                <!-- Add any action buttons here -->
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-alert v-if="error" type="error">{{ error }}</v-alert>
    <v-spinner v-if="loading" color="primary"></v-spinner>
  </template>
  
  <script>
  import { supabase } from "../../lib/supaBase";
  
  export default {
    data() {
      return {
        userCars: [],
        loading: true,
        error: null,
        selectedCarId: null,
        editModal: false,
        editedCar: {},
      };
    },
    async created() {
      await this.fetchUserCars();
    },
    methods: {
      async fetchUserCars() {
        this.loading = true;
        const loggedInUserId = localStorage.getItem("user_id");
        try {
          // Fetch all cars
          const { data: cars, error: carsError } = await supabase
            .from("cars")
            .select(`*`);
  
          if (carsError) throw carsError;
  
          // Fetch all transactions related to the logged-in user
          const { data: transactions, error: transactionsError } = await supabase
            .from("transactions")
            .select(`*`)
            .eq("buyer_id", loggedInUserId);
  
          if (transactionsError) throw transactionsError;
  
          // Fetch purchased cars for the user's transactions
          const { data: purchasedCars, error: purchasedCarsError } = await supabase
            .from("purchased_cars")
            .select(`*`)
            .in("transaction_id", transactions.map(transaction => transaction.id));
  
          if (purchasedCarsError) throw purchasedCarsError;
  
          // Combine data
          this.userCars = purchasedCars.map(purchasedCar => {
            const car = cars.find(car => car.id === purchasedCar.car_id) || {};
            const transaction = transactions.find(transaction => transaction.id === purchasedCar.transaction_id) || {};
            return { ...car, ...purchasedCar, ...transaction };
          });
  
          if (this.userCars.length === 0) {
            console.log("No cars found for this user.");
          } else {
            this.userCars.forEach(car => {
              console.log(`Car ID: ${car.id}`);
              console.log(`Car Details: `, car);
            });
          }
        } catch (err) {
          this.error = err.message;
          console.error("Error fetching user cars: ", err);
        } finally {
          this.loading = false;
        }
      },
      handleCardClick(carId) {
        this.selectedCarId = carId;
      },
    },
  };
  </script>
  
  <style scoped>
 
  
  .truncate-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  
  .single-line {
    max-height: 1.2em;
  }
  
  .v-card-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .status-chip {
    margin-top: 8px;
    font-weight: bold;
  }
  
  .v-card-text p {
    margin: 0;
  }
  
  .car-status {
    font-weight: bold;
  }
  </style>
  