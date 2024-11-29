<template>
  <router-link to="/Home" class="tr" exact>
    <v-btn
      class="lofi"
      :style="{ width: '10%', marginTop: '3%', marginLeft: '5%' }"
    >
      Exit
      <v-icon right>mdi-arrow-left</v-icon>
    </v-btn>
  </router-link>

  <v-card class="mx-auto my-10 px-10" elevation="16" max-width="800">
    <v-card-title class="title">Available Cars for Loan</v-card-title>
    <v-card-subtitle class="subtitle"
      >Get a car loan quickly and easily</v-card-subtitle
    >

    <v-card-text>
      Please fill out the form below to submit a loan request. Our team will
      review your application and get back to you as soon as possible.
    </v-card-text>

    <div class="loan-car-form">
      <form @submit.prevent="showConfirmationDialog">
        <div class="form-group">
          <label class="centered-label">Select a Car:</label>
          <v-carousel
            height="500"
            show-arrows="hover"
            cycle
            hide-delimiter-background
          >
            <v-carousel-item
              v-for="(car, index) in carOptions"
              :key="index"
              @click="selectCar(car)"
              class="selectable-carousel-item"
            >
              <v-sheet height="100%">
                <div class="d-flex fill-height justify-center align-center">
                  <img :src="car.img" :alt="car.name" class="car-image" />
                </div>
                <div class="car-name">{{ car.name }}</div>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
          <span v-if="formErrors.selectedCar" class="error">{{
            formErrors.selectedCar
          }}</span>
          <div v-if="loanRequest.selectedCar" class="selected-car">
            Selected Car: {{ loanRequest.selectedCar.model }}
            {{ loanRequest.selectedCar.brand }}
          </div>

          <div v-if="loanRequest.selectedCar">
            <button type="button" @click="undoCarSelection" class="undo-button">
              Undo Selection
            </button>
          </div>
        </div>

        <div class="form-group">
          <label class="centered-label" for="duration"
            >Loan Duration (months):</label
          >
          <input
            type="number"
            v-model="loanRequest.duration"
            class="outlined-input"
            :class="{ 'dark-mode': $vuetify.theme.dark }"
          />
          <span v-if="formErrors.duration" class="error">{{
            formErrors.duration
          }}</span>
        </div>

        <div class="form-group">
          <label class="centered-label" for="income">Monthly Income:</label>
          <input
            type="number"
            v-model="loanRequest.income"
            class="outlined-input"
            :class="{ 'dark-mode': $vuetify.theme.dark }"
          />
          <span v-if="formErrors.income" class="error">{{
            formErrors.income
          }}</span>
        </div>

        <div class="form-group">
          <button type="submit" class="centered-button">
            Submit Loan Request
          </button>
        </div>
      </form>

      <loan-request-table
        :requests="loanRequests"
        @remove="removeLoanRequest"
      />
    </div>
  </v-card>

  <v-dialog v-model="confirmationDialog" max-width="500">
    <v-card>
      <v-card-title class="headline">Are you sure?</v-card-title>
      <v-card-text>
        You are about to express interest in this car loan. Please be aware of
        the following:
        <ul>
          <li>This is not a final purchase or approval of the loan.</li>
          <li>Our team will review your request and get in touch with you.</li>
          <li>
            Ensure all information provided is accurate before proceeding.
          </li>
          <li>By proceeding, you agree to our terms and conditions.</li>
          <li>Any false information may lead to disqualification.</li>
        </ul>
        Do you wish to continue?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="confirmationDialog = false">Cancel</v-btn>
        <v-btn color="primary" @click="confirmSubmitLoanRequest">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { supabase } from "../../lib/supabase";

export default {
  data() {
    return {
      loanRequest: {
        selectedCar: null,
        duration: "",
        income: "",
      },
      loanRequests: [],
      loanApplications: [], // Add loanApplications to the data
      formErrors: {
        selectedCar: null,
        duration: null,
        income: null,
      },
      carOptions: [],
      confirmationDialog: false,
      snackbar: {
        show: false,
        message: "",
      },
      error: null, // Add error to the data
    };
  },
  methods: {
    selectCar(car) {
      this.loanRequest.selectedCar = car;
      this.formErrors.selectedCar = null;
    },
    undoCarSelection() {
      this.loanRequest.selectedCar = null;
    },
    validateForm() {
      let isValid = true;
      this.formErrors = { selectedCar: null, duration: null, income: null };

      if (!this.loanRequest.selectedCar) {
        this.formErrors.selectedCar = "Please select a car.";
        isValid = false;
      }
      if (!this.loanRequest.duration || this.loanRequest.duration <= 0) {
        this.formErrors.duration = "Loan Duration must be positive.";
        isValid = false;
      }
      if (!this.loanRequest.income || this.loanRequest.income <= 0) {
        this.formErrors.income = "Monthly Income must be positive.";
        isValid = false;
      }

      return isValid;
    },
    showConfirmationDialog() {
      if (this.validateForm()) {
        this.confirmationDialog = true;
      }
    },
    async confirmSubmitLoanRequest() {
      this.confirmationDialog = false;
      await this.submitLoanRequest();
    },
    async submitLoanRequest() {
      if (this.validateForm()) {
        const userId = localStorage.getItem("user_id");

        if (!userId) {
          console.error("User is not logged in");
          return;
        }

        try {
          const { error } = await supabase.from("loan_cars").insert([
            {
              car_id: this.loanRequest.selectedCar.id,
              model: this.loanRequest.selectedCar.model,
              brand: this.loanRequest.selectedCar.brand,
              loan_duration: this.loanRequest.duration,
              monthly_income: this.loanRequest.income,
              user_id: userId,
            },
          ]);

          if (error) throw error;

          this.loanRequests.push({ ...this.loanRequest });
          this.loanRequest = { selectedCar: null, duration: "", income: "" };
          this.saveLoanRequests();
          await this.fetchCarOptions();

          this.snackbar = {
            show: true,
            message: "Your loan request has been successfully submitted!",
          };
        } catch (error) {
          console.error("Error submitting loan request:", error);
        }
      }
    },
    saveLoanRequests() {
      localStorage.setItem("loanRequests", JSON.stringify(this.loanRequests));
    },
    loadLoanRequests() {
      const savedLoans = localStorage.getItem("loanRequests");
      if (savedLoans) {
        this.loanRequests = JSON.parse(savedLoans);
      }
    },
    removeLoanRequest(index) {
      this.loanRequests.splice(index, 1);
      this.saveLoanRequests();
    },
    async fetchCarOptions() {
      try {
        const { data: allCars, error: carsError } = await supabase
          .from("cars")
          .select("id, model, brand, img");

        if (carsError) throw carsError;

        const { data: loanedCars, error: loanedCarsError } = await supabase
          .from("loan_cars")
          .select("car_id");

        if (loanedCarsError) throw loanedCarsError;

        const loanedCarIds = loanedCars.map((loan) => loan.car_id);
        this.carOptions = allCars.filter(
          (car) => !loanedCarIds.includes(car.id)
        );
      } catch (error) {
        console.error("Error fetching car options:", error);
      }
    },
    async fetchLoanApplications() {
      try {
        const userId = localStorage.getItem("user_id");
        const { data, error } = await supabase
          .from("loan_cars")
          .select("*")
          .eq("user_id", userId);

        if (error) throw error;
        this.loanApplications = data;
      } catch (error) {
        console.error("Error fetching loan applications:", error);
        this.error = error.message;
      }
    },
  },
  mounted() {
    this.loadLoanRequests();
    this.fetchCarOptions();
    this.fetchLoanApplications(); // Fetch loan applications on mount
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  font-weight: bold;
}

.subtitle {
  text-align: center;
}

.loan-car-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.centered-label {
  text-align: center;
  font-weight: bold;
}

.error {
  color: red;
  font-size: 0.9em;
}

.selectable-carousel-item {
  cursor: pointer;
  transition: transform 0.2s;
}

.selectable-carousel-item:hover {
  transform: scale(1.05);
}

.car-image {
  width: 100%;
  max-height: 90%;
  object-fit: cover;
}

.car-name {
  text-align: center;
  font-weight: bold;
}

.selected-car {
  margin-top: 10px;
  font-weight: bold;
}

.undo-button {
  margin-top: 10px;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 8px; /* Added border radius */
}

.centered-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin: 3%;
  border-radius: 8px; /* Added border radius */
}

.outlined-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 3%;
}

.dark-mode {
  background-color: #333;
  color: white;
}
</style>
