<template>
  <!-- Loading, Error, No Cars Display -->
  <v-row v-if="loading || error || carsWithTransactions.length === 0">
    <v-col>
      <v-alert v-if="loading" type="info">Loading...</v-alert>
      <v-alert v-else-if="error" type="error">
        {{ error }}
        <v-btn color="primary" text @click="fetchCars">Retry</v-btn>
      </v-alert>
      <v-alert
        v-else-if="!loading && !error && carsWithTransactions.length === 0"
        type="warning"
      >
        You haven't bought any Cars yet..
      </v-alert>
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
      <v-card elevation="8">
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
            <v-card-title
              >{{ item.car.brand }} {{ item.car.model }}</v-card-title
            >
            <v-card-text>
              <p class="truncate-text">{{ item.car.description }}</p>
              <p>
                <small class="text-body-secondary"
                  >Added at: {{ item.transaction.created_at }}</small
                >
              </p>
            </v-card-text>

            <!-- Check if the transaction is purchased -->
            <div v-if="isTransactionPurchased(item.transaction.id)">
              <v-alert
                v-if="item.purchased_cars[0].is_paid"
                type="success"
                dense
                outlined
              >
                The car has been paid. Please proceed to the store to complete
                the process.
              </v-alert>
              <v-alert v-else type="warning" dense outlined>
                You have 3 days to pay for the purchased car, or the reservation
                will be cancelled.
              </v-alert>
            </div>

            <v-card-actions v-else class="d-flex justify-content-end flex-wrap">
              <v-btn
                color="red"
                @click="openCancelDialog(item.car.id)"
                class="mb-2"
              >
                <v-icon left>mdi-cancel</v-icon>
                Cancel
              </v-btn>
              <v-btn
                color="green"
                @click="finalizePurchase(item.transaction.id)"
                class="mb-2"
              >
                <v-icon left>mdi-check</v-icon>
                Purchase
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>

  <!-- Payment Choice and Confirmation Dialog -->
  <v-dialog v-model="isPaymentChoiceDialogVisible" max-width="500px">
    <v-card>
      <v-card-title class="headline">Select Payment Method</v-card-title>
      <v-card-text>
        <p>Please select your payment option:</p>
        <v-btn color="green" text @click="choosePayment('online')"
          >Pay Online</v-btn
        >
        <v-btn color="blue" text @click="choosePayment('in-person')"
          >Pay In Person</v-btn
        >
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue" text @click="isPaymentChoiceDialogVisible = false"
          >Cancel</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Payment Link Dialog -->
  <v-dialog v-model="isPaymentDialogVisible" max-width="500px">
    <v-card>
      <v-card-title class="headline">Proceed to Payment</v-card-title>
      <v-card-text>
        <p>
          You are about to be redirected to the PayMongo page to finalize your
          purchase.
        </p>
        <v-row justify="center">
          <v-col cols="12" md="4">
            <v-img
              src="../../assets/images/paymongo.png"
              alt="paymongo"
              width="100%"
            ></v-img>
          </v-col>
        </v-row>
        <div class="d-flex justify-content-end mt-2">
          <v-btn color="green" class="mx-2" text @click="openPaymentLink"
            >Go to Payment</v-btn
          >
          <v-btn
            color="blue darken-1"
            class="mx-2"
            text
            @click="isPaymentDialogVisible = false"
            >Cancel</v-btn
          >
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- Cancel Confirmation Dialog -->
  <v-dialog v-model="isCancelDialogVisible" max-width="500px">
    <v-card>
      <v-card-title class="headline">Cancel Transaction</v-card-title>
      <v-card-text
        >Are you sure you want to cancel this transaction?</v-card-text
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="isCancelDialogVisible = false"
          >Back</v-btn
        >
        <v-btn color="red" text @click="confirmCancel"
          >Confirm Cancellation</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { supabase } from "../../lib/supaBase";

export default {
  data() {
    return {
      carsWithTransactions: [],
      loading: true,
      error: null,
      isPaymentChoiceDialogVisible: false,
      isPaymentDialogVisible: false,
      isCancelDialogVisible: false,
      transactionIdToFinalize: null,
      carIdToCancel: null,
      currentTransaction: null,
      paymentLink: null,
      paymentType: null,
    };
  },
  async created() {
    await this.fetchCars();
  },
  methods: {
    openCancelDialog(carId, transactionId) {
      console.log("Car ID:", carId);
      console.log("Transaction ID:", transactionId);

      // Check if the transactionId is valid here
      const transaction = this.carsWithTransactions.find(
        (item) => item.car.id === carId
      )?.transaction; // Find the transaction by car ID
      console.log("Transaction object:", transaction);

      if (transaction) {
        this.transactionIdToCancel = transaction.id; // Set the transaction ID to cancel
      }

      this.isCancelDialogVisible = true;
      this.carIdToCancel = carId;
    },
    async deleteTransaction(transactionId) {
      try {
        // Step 1: Delete from purchased_cars
        const { error: purchasedError } = await supabase
          .from("purchased_cars")
          .delete()
          .eq("transaction_id", transactionId);

        if (purchasedError) {
          console.error(
            "Error deleting from purchased_cars:",
            purchasedError.message
          );
          throw new Error("Failed to delete purchased car record.");
        }

        // Step 2: Delete from rented_cars if not in purchased_cars
        const { data: rentedCars } = await supabase
          .from("rented_cars")
          .select("transaction_id")
          .eq("transaction_id", transactionId);

        if (rentedCars.length > 0) {
          const { error: rentedError } = await supabase
            .from("rented_cars")
            .delete()
            .eq("transaction_id", transactionId);

          if (rentedError) {
            console.error(
              "Error deleting from rented_cars:",
              rentedError.message
            );
            throw new Error("Failed to delete rented car record.");
          }
        }

        // Step 3: Now delete the transaction
        const { error: transactionError } = await supabase
          .from("transactions")
          .delete()
          .eq("id", transactionId);

        if (transactionError) {
          console.error(
            "Error deleting transaction:",
            transactionError.message
          );
          throw new Error("Failed to delete transaction.");
        }

        console.log("Transaction and related records deleted successfully.");
      } catch (error) {
        console.error("Error in deleting transaction:", error.message);
      }
    },
    async confirmCancel() {
      console.log(
        "Confirming cancellation for transaction ID: ",
        this.transactionIdToCancel
      );

      if (this.transactionIdToCancel) {
        try {
          await this.deleteTransaction(this.transactionIdToCancel); // Proceed with cancellation
          this.isCancelDialogVisible = false; // Close the dialog
          await this.fetchCars(); // Reload the cars list
        } catch (error) {
          console.error("Cancellation failed:", error.message);
          this.error = "Failed to cancel transaction. Please try again.";
        }
      } else {
        console.log("No transaction ID to cancel.");
      }
    },
    async fetchCars() {
      this.loading = true;
      this.error = null;
      const loggedInUserId = localStorage.getItem("user_id");

      try {
        if (!loggedInUserId) {
          this.error = "Network error, please Login again";
          this.loading = false;
          return;
        }

        const { data, error } = await supabase
          .from("transactions")
          .select(`*, cars (*), user:buyer_id (*), purchased_cars (*)`)
          .eq("cars.for_sale", true)
          .eq("buyer_id", loggedInUserId);

        if (error) throw error;

        // Log the data structure
        console.log("Fetched transactions:", data);

        this.carsWithTransactions = data
          .map((transaction) => ({
            car: transaction.cars,
            transaction: transaction, // This is where the transaction object should be
            purchased_cars: transaction.purchased_cars,
          }))
          .filter((item) => item.car !== null);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async finalizePurchase(transactionId) {
      const transaction = this.carsWithTransactions.find(
        (item) => item.transaction.id === transactionId
      );
      if (transaction) {
        this.currentTransaction = transaction;
        this.isPaymentChoiceDialogVisible = true;
      }
    },

    choosePayment(type) {
      this.paymentType = type;
      this.isPaymentChoiceDialogVisible = false;
      if (type === "online") {
        this.handleOnlinePayment();
      } else {
        this.handleInPersonPayment();
      }
    },

    async handleOnlinePayment() {
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
              description: "Car for Sale",
              remarks: "Purchase transaction",
            },
          },
        }),
      };

      try {
        const response = await fetch(
          "https://api.paymongo.com/v1/links",
          options
        );
        const result = await response.json();

        if (response.ok) {
          this.paymentLink = result.data.attributes.checkout_url;
          this.isPaymentDialogVisible = true;

          const warrantyDate = new Date();
          warrantyDate.setFullYear(warrantyDate.getFullYear() + 1);

          const { error } = await supabase.from("purchased_cars").insert([
            {
              price: car.price,
              transaction_id: transaction.id,
              warranty: warrantyDate.toISOString(),
              car_id: car.id,
              is_paid: true,
            },
          ]);

          if (error) throw error;
        } else {
          throw new Error(
            result.errors[0]?.detail || "Payment link creation failed"
          );
        }
      } catch (err) {
        this.error = err.message;
      }
    },

    async handleInPersonPayment() {
      const { car, transaction } = this.currentTransaction;

      try {
        const warrantyDate = new Date();
        warrantyDate.setFullYear(warrantyDate.getFullYear() + 1);

        const { error } = await supabase.from("purchased_cars").insert([
          {
            price: car.price,
            transaction_id: transaction.id,
            warranty: warrantyDate.toISOString(),
            car_id: car.id,
            is_paid: false,
          },
        ]);

        if (error) throw error;

        alert(
          "You have chosen to pay in person. Please complete your payment within 3 days."
        );
        location.reload();
      } catch (err) {
        this.error = err.message;
      }
    },

    openPaymentLink() {
      window.open(this.paymentLink, "_blank");
      this.isPaymentDialogVisible = false;
      location.reload();
    },

    isTransactionPurchased(transactionId) {
      return this.carsWithTransactions.some(
        (item) =>
          item.purchased_cars &&
          item.purchased_cars.some(
            (purchasedCar) => purchasedCar.transaction_id === transactionId
          )
      );
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
