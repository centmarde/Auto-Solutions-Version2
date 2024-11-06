<template>
  <!-- Loading, Error, No Cars Display -->
  <v-row v-if="loading || error || cars.length === 0">
    <v-col v-if="loading" class="loading">
      <v-alert type="info">Loading...</v-alert>
    </v-col>

    <v-col v-if="error" class="error">
      <v-alert type="error">{{ error }}</v-alert>
    </v-col>

    <v-col v-if="cars.length === 0 && !loading && !error" class="no-cars">
      <v-alert type="warning">No cars available for rent.</v-alert>
    </v-col>
  </v-row>

  <!-- Cars Display with Cancel and Rent Actions -->
  <v-row v-if="carsWithTransactions.length > 0">
    <v-col
      v-for="item in carsWithTransactions"
      :key="item.car.id"
      cols="12"
      md="6"
      class="mb-4"
    >
      <v-card elevation="8" class="fixed-card">
        <v-row no-gutters>
          <v-col cols="4">
            <v-img
              v-if="item.car.img"
              :src="item.car.img"
              alt="Car Image"
              class="img-fluid rounded-start"
              cover
              height="180px"
            ></v-img>
          </v-col>

          <v-col cols="8">
            <v-card-title>{{ item.car.brand }} {{ item.car.model }}</v-card-title>
            <v-card-text>
              <p class="truncate-text">{{ item.car.description }}</p>
              <p><small class="text-body-secondary">Added at: {{ item.transaction.created_at }}</small></p>
            </v-card-text>
            <v-card-actions class="d-flex justify-content-end">
              <v-btn color="red" @click="openCancelDialog(item.car.id)">
                <v-icon left>mdi-cancel</v-icon>
                Cancel
              </v-btn>
              <v-btn color="green" @click="finalizeRental(item.transaction.id)">
                <v-icon left>mdi-check</v-icon>
                Rent
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>

  <!-- Cancel Confirmation Dialog -->
  <v-dialog v-model="isCancelDialogVisible" max-width="500px">
    <v-card>
      <v-card-title class="headline">Cancel Transaction</v-card-title>
      <v-card-text>Are you sure you want to cancel this transaction?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="isCancelDialogVisible = false">Back</v-btn>
        <v-btn color="red" text @click="confirmCancel">Confirm Cancellation</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { supabase } from "../../lib/supaBase";

export default {
  data() {
    return {
      cars: [],
      transactions: [],
      carsWithTransactions: [],
      loading: true,
      error: null,
      isCancelDialogVisible: false, // Controls visibility of the cancel dialog
      carIdToCancel: null, // Stores the car ID to cancel
    };
  },
  async created() {
    await this.fetchCars();
  },
  methods: {
    async fetchCars() {
      this.loading = true;
      const loggedInUserId = localStorage.getItem("user_id");

      try {
        const { data, error } = await supabase
          .from("transactions")
          .select(`*, cars (*), user:buyer_id (*)`)
          .eq("cars.for_rent", true)
          .eq("buyer_id", loggedInUserId);

        if (error) throw error;

        const carsForRent = data
          .map((transaction) => transaction.cars)
          .filter((car) => car !== null);

        this.cars = this.shuffleArray(carsForRent);
        this.carsWithTransactions = data
          .map((transaction) => ({
            car: transaction.cars,
            transaction: transaction,
          }))
          .filter((item) => item.car !== null);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    openCancelDialog(carId) {
      this.carIdToCancel = carId;
      this.isCancelDialogVisible = true;
    },

    async confirmCancel() {
  try {
    if (!this.carIdToCancel) {
      throw new Error("No car selected for cancellation.");
    }

    //  the transaction ID associated with the car
    const transaction = this.carsWithTransactions.find(
      (item) => item.car.id === this.carIdToCancel
    );
    if (!transaction) {
      throw new Error("Transaction not found for the selected car.");
    }
    const transactionIdToCancel = transaction.transaction.id;

    //  delete related rows in `purchased_cars` table based on transaction ID
    const { error: purchasedCarsError } = await supabase
      .from("purchased_cars")
      .delete()
      .eq("transaction_id", transactionIdToCancel);

    if (purchasedCarsError) throw purchasedCarsError;

    // delete the transaction in `transactions` table based on transaction ID
    const { error: transactionError } = await supabase
      .from("transactions")
      .delete()
      .eq("id", transactionIdToCancel);

    if (transactionError) throw transactionError;

    // Update the UI by removing the canceled car from the list
    this.carsWithTransactions = this.carsWithTransactions.filter(
      (item) => item.car.id !== this.carIdToCancel
    );

  } catch (err) {
    this.error = err.message;
  } finally {
    this.isCancelDialogVisible = false;
    this.carIdToCancel = null;
  }
}
,

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
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

.v-card-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-card-text p {
  margin: 0;
}
</style>
