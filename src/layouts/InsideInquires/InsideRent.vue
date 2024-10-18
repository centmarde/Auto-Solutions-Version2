<template>
  <v-row v-if="loading || error || cars.length === 0">
    <v-col v-if="loading" class="loading">
      <v-alert type="info">Loading...</v-alert>
    </v-col>

    <v-col v-if="error" class="error">
      <v-alert type="error">{{ error }}</v-alert>
    </v-col>

    <v-col v-if="cars.length === 0 && !loading && !error" class="no-cars">
      <v-alert type="warning">No cars available for sale.</v-alert>
    </v-col>
  </v-row>

  <v-row v-if="carsWithTransactions.length > 0">
    <v-col v-for="item in carsWithTransactions" :key="item.car.id" cols="12" md="6" class="mb-4">
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
              <p class="truncate-text">
                {{ item.car.description }}
              </p>
              <p><small class="text-body-secondary">added at: {{ item.transaction.created_at }}</small></p>
            </v-card-text>
            <v-card-actions class="d-flex justify-content-end">
              <v-btn color="red" @click="openConfirmationDialog(item.car.id)">
                <v-icon left>mdi-cancel</v-icon>
                Cancel
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>

  <!-- Confirmation Dialog -->
  <v-dialog v-model="isDialogVisible" max-width="500px">
  <v-card>
    <v-card-title class="headline">Are You Sure You Want to Cancel?</v-card-title>
    <v-card-text>
      <p>You are about to cancel this order. Please note the following consequences:</p>
      <ul>
        <li>You may lose any deposits associated with this order.</li>
        <li>This cancellation will be recorded in your rental history.</li>
        <li>You might not be eligible for future discounts or promotions.</li>
      </ul>
      <p>Do you want to proceed with the cancellation?</p>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="isDialogVisible = false">Cancel</v-btn>
      <v-btn color="red" text @click="confirmDelete">Yes, Cancel Order</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

</template>

<script>
import { supabase } from '../../lib/supaBase';

export default {
  data() {
    return {
      cars: [],
      transactions: [],
      carsWithTransactions: [],
      loading: true,
      error: null,
      isDialogVisible: false,
      carToDelete: null,
    };
  },
  async created() {
    await this.fetchCars();
  },
  methods: {
    async fetchCars() {
      this.loading = true;
      const loggedInUserId = localStorage.getItem('user_id');

      try {
        const { data, error } = await supabase
          .from('transactions')
          .select(`*, cars (*), user:buyer_id (*)`)
          .eq('cars.for_rent', true)
          .eq('buyer_id', loggedInUserId);

        if (error) throw error;

        const carsForRent = data
          .map(transaction => transaction.cars)
          .filter(car => car !== null);

        this.cars = this.shuffleArray(carsForRent);

        this.carsWithTransactions = data.map(transaction => ({
          car: transaction.cars,
          transaction: transaction,
        })).filter(item => item.car !== null);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    openConfirmationDialog(carId) {
      this.carToDelete = carId;
      this.isDialogVisible = true;
    },

    async confirmDelete() {
      try {
        const { error } = await supabase
          .from('transactions')
          .delete()
          .eq('car_id', this.carToDelete);
        if (error) throw error;
        this.carsWithTransactions = this.carsWithTransactions.filter(item => item.car.id !== this.carToDelete);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isDialogVisible = false;
        this.carToDelete = null;
      }
    },

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  }
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
