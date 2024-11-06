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

  <!-- Rent Confirmation Dialog -->
  <v-dialog v-model="isConfirmationDialogVisible" max-width="500px">
    <v-card>
      <v-card-title class="headline">Confirm Rent</v-card-title>
      <v-card-text>
        <p>Please confirm your rental of this vehicle. Here are the terms and conditions:</p>
        <ul>
          <li>You are responsible for the full payment of the agreed rental price.</li>
          <li>Any rental agreement details will be provided post-payment.</li>
        </ul>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue" text @click="isConfirmationDialogVisible = false">Cancel</v-btn>
        <v-btn color="green" text @click="confirmFinalizeRental">Confirm Rent</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Payment Link Dialog -->
  <v-dialog v-model="isPaymentDialogVisible" max-width="500px">
    <v-card>
      <v-card-title class="headline">Proceed to Payment</v-card-title>
      <v-card-text>
        <p>You are about to be redirected to the PayMongo page to finalize your rental payment.</p>
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
      isCancelDialogVisible: false,
      isConfirmationDialogVisible: false,
      isPaymentDialogVisible: false,
      carIdToCancel: null,
      transactionIdToFinalize: null,
      currentTransaction: null,
      paymentLink: null,
    };
  },
  async created() {
    await this.fetchCars();
  },
  methods: {
    async fetchCars() {
      this.loading = true;
      this.error = null;

      try {
        const loggedInUserId = localStorage.getItem("user_id");

        const { data, error } = await supabase
          .from("transactions")
          .select("*, cars (*), user:buyer_id (*)")
          .eq("cars.for_rent", true)
          .eq("buyer_id", loggedInUserId);

        if (error) throw error;

        this.carsWithTransactions = data
          .map((transaction) => ({
            car: transaction.cars,
            transaction: transaction,
          }))
          .filter((item) => item.car !== null);

        this.cars = this.carsWithTransactions.map((item) => item.car);
      } catch (err) {
        console.error("Error fetching cars:", err);
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

        const transaction = this.carsWithTransactions.find(
          (item) => item.car.id === this.carIdToCancel
        );
        if (!transaction) {
          throw new Error("Transaction not found for the selected car.");
        }
        const transactionIdToCancel = transaction.transaction.id;

        const { error: purchasedCarsError } = await supabase
          .from("purchased_cars")
          .delete()
          .eq("transaction_id", transactionIdToCancel);

        if (purchasedCarsError) throw purchasedCarsError;

        const { error: transactionError } = await supabase
          .from("transactions")
          .delete()
          .eq("id", transactionIdToCancel);

        if (transactionError) throw transactionError;

        this.carsWithTransactions = this.carsWithTransactions.filter(
          (item) => item.car.id !== this.carIdToCancel
        );
      } catch (err) {
        this.error = err.message;
      } finally {
        this.isCancelDialogVisible = false;
        this.carIdToCancel = null;
      }
    },

    finalizeRental(transactionId) {
      const transaction = this.carsWithTransactions.find(
        (item) => item.transaction.id === transactionId
      );
      if (transaction) {
        this.currentTransaction = transaction;
        this.transactionIdToFinalize = transactionId;
        this.isConfirmationDialogVisible = true;
      }
    },

    async confirmFinalizeRental() {
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
              description: "Car for Rent",
              remarks: "Rental transaction",
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

          const rentalEndDate = new Date();
          rentalEndDate.setDate(rentalEndDate.getDate() + 30);

          const { error } = await supabase.from("purchased_cars").insert([
            {
              price: car.price,
              transaction_id: transaction.id,
              rental_end: rentalEndDate.toISOString(),
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
