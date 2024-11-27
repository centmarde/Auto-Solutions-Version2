<template>
  <v-row v-if="userCars.length > 0">
    <v-col v-for="car in userCars" :key="car.id" cols="12" md="6" class="mb-4">
      <v-card elevation="8" @click="handleCardClick(car.id)">
        <v-row no-gutters>
          <v-col cols="4">
            <v-img
              v-if="car.img"
              :src="car.img"
              alt="Car Image"
              class="img-fluid rounded-start"
              cover
              height="180px"
            ></v-img>
          </v-col>
          <v-col cols="8">
            <v-card-title> {{ car.brand }} {{ car.model }} </v-card-title>
            <v-card-text>
              <p class="truncate-text single-line">
                {{ car.description }}
              </p>
              <p class="car-status">
                {{
                  car.forSale && car.forRent
                    ? "For Sale and Open for Rent"
                    : car.forSale
                    ? "For Sale"
                    : car.forRent
                    ? "Open for Rent"
                    : ""
                }}
              </p>

              <!-- Transaction Status Message -->
              <p v-if="carStatusMessage(car.id)" class="transaction-status">
                {{ carStatusMessage(car.id) }}
              </p>
              <!-- Pending or Approved Indicator -->
              <v-chip
                :color="car.is_pending ? 'orange' : 'green'"
                dark
                small
                class="status-chip"
              >
                {{ car.is_pending ? "Pending" : "Approved" }}
              </v-chip>
            </v-card-text>
            <v-card-actions class="d-flex justify-content-end">
              <v-btn color="red" @click.stop="deleteCar(car.id)">
                <v-icon left>mdi-delete</v-icon>
                Delete
              </v-btn>
              <v-btn color="blue" @click.stop="viewCar(car)">
                <v-icon left>mdi-eye</v-icon>
                View
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>

  <!-- Modal to View Car Details -->
  <v-dialog v-model="viewModal" max-width="600px">
    <v-card>
      <v-card-title>{{ viewedCar.brand }} {{ viewedCar.model }}</v-card-title>
      <v-card-text>
        <v-img :src="viewedCar.img" alt="Car Image" height="300px"></v-img>
        <p>{{ viewedCar.description }}</p>
        <p class="car-status">
          {{
            viewedCar.forSale && viewedCar.forRent
              ? "For Sale and Open for Rent"
              : viewedCar.forSale
              ? "For Sale"
              : viewedCar.forRent
              ? "Open for Rent"
              : ""
          }}
        </p>
        <p v-if="carStatusMessage(viewedCar.id)" class="transaction-status">
          {{ carStatusMessage(viewedCar.id) }}
        </p>

        <!-- Display Price and Years Owned -->
        <p><strong>Price:</strong> ${{ viewedCar.price }}</p>
        <p><strong>Years Owned:</strong> {{ viewedCar.years_owned }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue" @click="viewModal = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { supabase } from "../../lib/supaBase";

export default {
  data() {
    return {
      userCars: [],
      transactionsCarIds: [],
      rentedCarIds: [],
      purchasedCarIds: [],
      loading: true,
      error: null,
      selectedCarId: null,
      viewModal: false,
      viewedCar: {},
    };
  },
  async created() {
    await this.fetchUserCars();
    await this.fetchTransactionCarIds();
    await this.fetchRentedCarIds();
    await this.fetchPurchasedCarIds();
  },
  methods: {
    async fetchUserCars() {
      this.loading = true;
      const loggedInUserId = localStorage.getItem("user_id");

      try {
        if (!loggedInUserId) {
          this.error = "Network error, please Login again";
          this.loading = false;
          return;
        }

        const { data, error } = await supabase
          .from("cars")
          .select("*") // Make sure to select all necessary fields including price and years_owned
          .eq("user_id", loggedInUserId);

        if (error) throw error;

        this.userCars = data || [];
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchTransactionCarIds() {
      try {
        const { data, error } = await supabase
          .from("transactions")
          .select("car_id");

        if (error) throw error;

        this.transactionsCarIds = data.map((transaction) => transaction.car_id);
      } catch (err) {
        this.error = err.message;
      }
    },
    async fetchRentedCarIds() {
      try {
        const { data, error } = await supabase
          .from("rented_cars")
          .select("car_id");

        if (error) throw error;

        this.rentedCarIds = data.map((rentedCar) => rentedCar.car_id);
      } catch (err) {
        this.error = err.message;
      }
    },
    async fetchPurchasedCarIds() {
      try {
        const { data, error } = await supabase
          .from("purchased_cars")
          .select("car_id");

        if (error) throw error;

        this.purchasedCarIds = data.map((purchasedCar) => purchasedCar.car_id);
      } catch (err) {
        this.error = err.message;
      }
    },
    carStatusMessage(carId) {
      if (this.rentedCarIds.includes(carId)) {
        return "Your car is rented";
      } else if (this.purchasedCarIds.includes(carId)) {
        return "Your car has been purchased";
      } else if (this.transactionsCarIds.includes(carId)) {
        return "Your car is in transaction";
      } else {
        return null;
      }
    },
    handleCardClick(carId) {
      this.selectedCarId = carId;
    },
    viewCar(car) {
      this.viewedCar = { ...car }; // Clone the car object to view, including price and years_owned
      this.viewModal = true; // Show the modal
    },
    async deleteCar(carId) {
      const confirmDelete = confirm(
        "Are you sure you want to delete this car?"
      );
      if (!confirmDelete) return;

      try {
        const { error } = await supabase.from("cars").delete().eq("id", carId);
        if (error) throw error;

        this.userCars = this.userCars.filter((car) => car.id !== carId);
        alert("Car Deleted Successfully!");
      } catch (err) {
        this.error = err.message;
      }
    },
  },
};
</script>

<style scoped>
.fixed-card {
  height: 165px;
  max-height: 165px;
}

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
.transaction-status {
  background-color: #ffcccb; /* Light red background color */
  color: #800000; /* Darker text for contrast */
  padding: 8px;
  border-radius: 4px;
  font-weight: bold;
  margin-top: 8px;
}
</style>
