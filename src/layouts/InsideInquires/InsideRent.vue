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
      <p>Please confirm your rental of this vehicle. Select the start and end dates for the rental:</p>

      <!-- Date Pickers for Start and End Dates -->
      <v-row>
      <!-- Start Date Picker -->
<v-col cols="12">
  <v-text-field
    v-model="formattedStartDate"
    label="Start Date"
    prepend-icon="mdi-calendar"
    @click="startDatePickerVisible = true"
    readonly
  ></v-text-field>
  <v-date-picker
    v-if="startDatePickerVisible"
    v-model="startDate"
    @input="updateStartDate; startDatePickerVisible = false"
  ></v-date-picker>
</v-col>

<!-- End Date Picker -->
<v-col cols="12">
  <v-text-field
    v-model="formattedEndDate"
    label="End Date"
    prepend-icon="mdi-calendar"
    @click="endDatePickerVisible = true"
    readonly
  ></v-text-field>
  <v-date-picker
    v-if="endDatePickerVisible"
    v-model="endDate"
    :min="startDate"
    @input="updateEndDate; endDatePickerVisible = false"
  ></v-date-picker>
</v-col>

      </v-row>

      <!-- Display the Total Days Calculated -->
      <p>Total Days: {{ totalDays }}</p>
      <p>Terms and conditions:</p>
      <ul>
        <li>You are responsible for the full payment of the agreed rental price.</li>
        <li>Any rental agreement details will be provided post-payment.</li>
      </ul>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue" text @click="isConfirmationDialogVisible = false">Cancel</v-btn>
      <v-btn color="green" text :disabled="totalDays <= 0" @click="confirmFinalizeRental">
        Confirm Rent
      </v-btn>


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
      startDate: null,          
    endDate: null,             
    totalDays: 0,
    startDatePickerVisible: false,
    endDatePickerVisible: false,
    };
  },
  async created() {
    await this.fetchCars();
  },
  computed: {
    totalDays() {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      const difference = (end - start) / (1000 * 60 * 60 * 24);
      return difference >= 0 ? difference : 0;
    }
    return 0;
  }
},
watch: {
  startDate: 'calculateTotalDays',
  endDate: 'calculateTotalDays'
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
    updateStartDate(date) {
  this.startDate = new Date(date);
  this.calculateTotalDays();
},
updateEndDate(date) {
  this.endDate = new Date(date);
  this.calculateTotalDays();
},

  calculateTotalDays() {
  if (this.startDate && this.endDate) {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    const timeDiff = end - start;

    this.totalDays = timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : 0;
  } else {
    this.totalDays = 0;
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

    // Delete related records in rented_cars first
    const { error: rentedCarsError } = await supabase
      .from("rented_cars")
      .delete()
      .eq("transaction_id", transactionIdToCancel);

    if (rentedCarsError) throw rentedCarsError;

    // Now delete the transaction
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

    calculateTotalDays() {
      if (this.startDate && this.endDate) {
        const start = new Date(this.startDate);
        const end = new Date(this.endDate);
        const timeDiff = end - start;

        this.totalDays = timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : -1;
      }
    },

    async confirmFinalizeRental() {
  if (!this.currentTransaction || this.totalDays <= 0) return;

  const { car, transaction } = this.currentTransaction;
  const totalPrice = car.price * this.totalDays; // Calculate total price based on daily rate

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
          amount: totalPrice * 100, // amount in centavos for PayMongo
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

      // Insert the rental details into `rented_cars` table in Supabase
      const { error } = await supabase.from("rented_cars").insert([
  {
    price: totalPrice,
    transaction_id: transaction.id,
    date_start: this.startDate.toISOString(),
    date_end: this.endDate.toISOString(),
    cars_id: car.id,
    total_days: this.totalDays, // Set total_days to the calculated total days
    created_at: new Date().toISOString() // Set created_at to current timestamp
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
}
,

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
