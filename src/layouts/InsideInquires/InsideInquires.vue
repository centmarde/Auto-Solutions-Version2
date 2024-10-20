<template>
  <v-row v-if="loading || error || cars.length === 0">
    <v-col v-if="loading" class="loading">
      <v-alert type="info">Loading...</v-alert>
    </v-col>

    <v-col v-if="error" class="error">
      <v-alert type="error">{{ error }}</v-alert>
    </v-col>

    <v-col v-if="!loading && !error && cars.length === 0" class="no-cars">
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
              <p class="truncate-text">{{ item.car.description }}</p>
              <p><small class="text-body-secondary">Added at: {{ item.transaction.created_at }}</small></p>
            </v-card-text>
            <v-card-actions class="d-flex justify-content-end">
              <v-btn color="red" @click="openConfirmationDialog(item.car.id)">
                <v-icon left>mdi-cancel</v-icon>
                Cancel
              </v-btn>
              <v-btn color="green" @click="finalizePurchase(item.transaction.id, item.transaction.price)">
                <v-icon left>mdi-check</v-icon>
                Purchase
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="isDialogVisible" max-width="500px">
    <v-card>
      <v-card-title class="headline">Are You Sure You Want to Cancel?</v-card-title>
      <v-card-text>
        <p>You are about to cancel this order. Please note the following consequences:</p>
        <ul>
          <li>You may lose any deposits associated with this order.</li>
          <li>This cancellation will be recorded in your rental history.</li>
          <li>You might not be eligible for future discounts or promotions.</li>
          <li>Any false information may lead to disqualification.</li>
        </ul>
        <p>If you wish to proceed, please contact the supplier of the mentioned car.</p>
        <router-link to="/Chat">
          <v-btn color="blue">
            <v-icon left>mdi-message</v-icon>
            Chat with Supplier
          </v-btn>
        </router-link>
        <p>Do you want to proceed with the cancellation?</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="isDialogVisible = false">Cancel</v-btn>
        <v-btn color="red" text @click="confirmDelete">Yes, Cancel Order</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="isConfirmationDialogVisible" max-width="500px">
    <v-card>
      <v-card-title class="headline">Confirmation Required</v-card-title>
      <v-card-text>
        <p>Please confirm your purchase of this vehicle. Here are the terms and conditions:</p>
        <ul>
          <li>You are responsible for the full payment of the price agreed upon.</li>
          <li>Any warranty information will be provided post-purchase.</li>
          <li>Refund policies and procedures will be shared through email.</li>
          <li>By proceeding, you accept all terms and conditions.</li>
        </ul>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" text @click="isConfirmationDialogVisible = false">Cancel</v-btn>
        <v-btn color="green" text @click="confirmFinalizePurchase">Confirm Purchase</v-btn>
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
      isConfirmationDialogVisible: false,
      carIdToDelete: null,
      transactionIdToFinalize: null,
      priceToFinalize: null,
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
    // Fetch purchased cars for the logged-in user
    const { data: purchasedCars, error: purchaseError } = await supabase
      .from('purchased_cars')
      .select('transaction_id');

    if (purchaseError) throw purchaseError;

    const purchasedTransactionIds = purchasedCars.map(car => car.transaction_id);

    // Fetch cars that are available for sale and not purchased
    const { data, error } = await supabase
      .from('transactions')
      .select(`*, cars (*), user:buyer_id (*)`)
      .eq('cars.for_sale', true)
      .eq('buyer_id', loggedInUserId)
      .not('id', 'in', `(${purchasedTransactionIds.join(',')})`);

    if (error) throw error;

    const carsForSale = data
      .map(transaction => transaction.cars)
      .filter(car => car !== null);

    this.cars = this.shuffleArray(carsForSale);

    this.carsWithTransactions = data
      .map(transaction => ({
        car: transaction.cars,
        transaction: transaction,
      }))
      .filter(item => item.car !== null);
  } catch (err) {
    this.error = err.message;
  } finally {
    this.loading = false;
  }
},

    openConfirmationDialog(carId) {
      this.isDialogVisible = true;
      this.carIdToDelete = carId;
    },

    async confirmDelete() {
      try {
        const { error } = await supabase
          .from('transactions')
          .delete()
          .eq('car_id', this.carIdToDelete);

        if (error) throw error;

        this.carsWithTransactions = this.carsWithTransactions.filter(item => item.car.id !== this.carIdToDelete);
        this.isDialogVisible = false;
      } catch (err) {
        this.error = err.message;
      }
    },

    async finalizePurchase(transactionId) {
  const transaction = this.carsWithTransactions.find(item => item.transaction.id === transactionId);
  const carId = transaction ? transaction.car.id : null; // Accessing car_id from the car object
  const price = transaction ? transaction.car.price : null; // Accessing price from the car object
  this.transactionIdToFinalize = transactionId;
  this.carIdToFinalize = carId; // Save carId for later use
  this.priceToFinalize = price;
  this.isConfirmationDialogVisible = true;
},

async confirmFinalizePurchase() {
  const { transactionIdToFinalize: transactionId, priceToFinalize: price, carIdToFinalize: carId } = this;

  try {
    const { data: existingCars, error: checkError } = await supabase
      .from('purchased_cars')
      .select('*')
      .eq('transaction_id', transactionId);

    if (checkError) throw checkError;

    if (existingCars.length > 0) {
      this.error = 'This car has already been purchased.';
      this.isConfirmationDialogVisible = false;
      return;
    }

    const warrantyDate = new Date();
    warrantyDate.setFullYear(warrantyDate.getFullYear() + 1);

    // Insert car_id into purchased_cars
    const { error } = await supabase
      .from('purchased_cars')
      .insert([{ price, transaction_id: transactionId, warranty: warrantyDate.toISOString(), car_id: carId }]);

    if (error) throw error;

    this.isConfirmationDialogVisible = false;
    location.reload();
  } catch (err) {
    this.error = err.message;
    this.isConfirmationDialogVisible = false;
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
