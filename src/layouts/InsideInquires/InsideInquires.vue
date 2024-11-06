<template>
  <!-- Loading, Error, No Cars Display -->
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

  <!-- Cars Display with Cancel and Purchase Actions -->
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
              <p>
                <small class="text-body-secondary">Added at: {{ item.transaction.created_at }}</small>
              </p>
            </v-card-text>
            <v-card-actions class="d-flex justify-content-end">
              <v-btn color="red" @click="openCancelDialog(item.car.id)">
                <v-icon left>mdi-cancel</v-icon>
                Cancel
              </v-btn>
              <v-btn color="green" @click="finalizePurchase(item.transaction.id)">
                <v-icon left>mdi-check</v-icon>
                Purchase
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>

  <!-- Purchase Confirmation Dialog -->
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

  <!-- Payment Link Dialog -->
  <v-dialog v-model="isPaymentDialogVisible" max-width="500px">
    <v-card>
      <v-card-title class="headline">Proceed to Payment</v-card-title>
      <v-card-text>
        <p>You are about to be redirected to the PayMongo page to finalize your purchase.</p>
        <br>
        <p class="text-center">Using Paymongo</p>
        <v-row justify="center">
          <v-col cols="12" md="4">
            <v-img src="../../assets/images/paymongo.png" alt="paymongo" width="100%"></v-img>
          </v-col>
        </v-row>
        <div class="d-flex justify-content-end mt-2">
          <v-btn color="green" class="mx-2" text @click="openPaymentLink">Go to Payment</v-btn>
          <v-btn color="blue darken-1" class="mx-2" text @click="isPaymentDialogVisible = false">Cancel</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

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
import axios from "axios";
import { supabase } from "../../lib/supaBase";

export default {
  data() {
    return {
      cars: [],
      transactions: [],
      carsWithTransactions: [],
      loading: true,
      error: null,
      isConfirmationDialogVisible: false,
      isPaymentDialogVisible: false,
      isCancelDialogVisible: false,
      carIdToDelete: null,
      transactionIdToFinalize: null,
      priceToFinalize: null,
      paymentLink: null,
      carIdToCancel: null,
      currentTransaction: null,
    };
  },
  async created() {
    await this.fetchCars();
  },
  methods: {
    openCancelDialog(carId) {
      this.isCancelDialogVisible = true;
      this.carIdToCancel = carId;
    },
    async confirmCancel() {
      try {
        const { error } = await supabase.from("transactions").delete().eq("car_id", this.carIdToCancel);

        if (error) throw error;

        this.carsWithTransactions = this.carsWithTransactions.filter(
          (item) => item.car.id !== this.carIdToCancel
        );
        this.isCancelDialogVisible = false;
      } catch (err) {
        this.error = err.message;
      }
    },
    async fetchCars() {
      this.loading = true;
      const loggedInUserId = localStorage.getItem("user_id");

      try {
        const { data: purchasedCars, error: purchaseError } = await supabase
          .from("purchased_cars")
          .select("transaction_id");

        if (purchaseError) throw purchaseError;

        const purchasedTransactionIds = purchasedCars.map((car) => car.transaction_id);

        const { data, error } = await supabase
          .from("transactions")
          .select(`*, cars (*), user:buyer_id (*)`)
          .eq("cars.for_sale", true)
          .eq("buyer_id", loggedInUserId)
          .not("id", "in", `(${purchasedTransactionIds.join(",")})`);

        if (error) throw error;

        const carsForSale = data.map((transaction) => transaction.cars).filter((car) => car !== null);

        this.cars = this.shuffleArray(carsForSale);
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
    async finalizePurchase(transactionId) {
      const transaction = this.carsWithTransactions.find((item) => item.transaction.id === transactionId);
      if (transaction) {
        this.currentTransaction = transaction;
        this.transactionIdToFinalize = transactionId;
        this.carIdToFinalize = transaction.car.id;
        this.priceToFinalize = transaction.car.price;
        this.isConfirmationDialogVisible = true;
      }
    },
    async confirmFinalizePurchase() {
      if (!this.currentTransaction) return;

      const { car, transaction } = this.currentTransaction;
      const amountInCentavos = car.price * 100;
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: "Basic c2tfdGVzdF84VGtzZW1LcHZucExnVURGRUJWTTg1YTE6",
        },
        body: JSON.stringify({
          data: {
            attributes: {
              amount: amountInCentavos,
              description: car.for_sale ? "Car for Sale" : "Car for Rent",
              remarks: car.for_sale ? "Sale transaction" : "Rental transaction",
            },
          },
        }),
      };

      try {
        const response = await fetch("https://api.paymongo.com/v1/links", options);
        const result = await response.json();

        if (response.ok) {
          this.paymentLink = result.data.attributes.checkout_url;
          this.isConfirmationDialogVisible = false;
          this.isPaymentDialogVisible = true;

          const warrantyDate = new Date();
          warrantyDate.setFullYear(warrantyDate.getFullYear() + 1);

          const { error } = await supabase.from("purchased_cars").insert([
            {
              price: car.price,
              transaction_id: transaction.id,
              warranty: warrantyDate.toISOString(),
              car_id: car.id,
            },
          ]);

          if (error) throw error;
        } else {
          throw new Error(result.errors[0].detail || "Payment link creation failed");
        }
      } catch (err) {
        this.error = err.message;
        this.isConfirmationDialogVisible = false;
      }
    },
    openPaymentLink() {
      window.open(this.paymentLink, "_blank");
      this.isPaymentDialogVisible = false;
      location.reload();
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
