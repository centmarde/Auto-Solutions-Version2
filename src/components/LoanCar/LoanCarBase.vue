<template>
  <router-link to="/Home"><button>Back to Home Page</button></router-link>
  <v-card class="mx-auto my-10 px-10" elevation="16" max-width="800">
    <v-card-item>
      <v-card-title>Loan a Car</v-card-title>
      <v-card-subtitle>Get a car loan quickly and easily</v-card-subtitle>
    </v-card-item>

    <v-card-text>
      Please fill out the form below to submit a loan request. Our team will
      review your application and get back to you as soon as possible.
    </v-card-text>

    <div class="loan-car-form">
      <form @submit.prevent="submitLoanRequest">
        <!-- Carousel to select a car -->
        <div class="form-group">
          <label>Select a Car:</label>
          <v-carousel
            height="400"
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
                  <img :src="car.image" :alt="car.name" class="car-image" />
                </div>
                <div class="car-name">{{ car.name }}</div>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
          <span v-if="formErrors.selectedCar" class="error">{{
            formErrors.selectedCar
          }}</span>
          <div v-if="loanRequest.selectedCar" class="selected-car">
            Selected Car: {{ loanRequest.selectedCar.name }}
          </div>

          <!-- Undo button that shows when a car is selected -->
          <div v-if="loanRequest.selectedCar">
            <button type="button" @click="undoCarSelection" class="undo-button">
              Undo Selection
            </button>
          </div>
        </div>

        <!-- Loan Duration -->
        <div class="form-group">
          <label for="duration">Loan Duration (months):</label>
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

        <!-- Monthly Income -->
        <div class="form-group">
          <label for="income">Monthly Income:</label>
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

      <!-- Loan Request Table -->
      <loan-request-table
        :requests="loanRequests"
        @remove="removeLoanRequest"
      />
    </div>
  </v-card>
</template>

<script>
import { createClient } from "@supabase/supabase-js";
import LoanRequestTable from "./LoanRequestTable.vue";

const supabaseUrl = "https://xgjgtijbrkcwwsliqubk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhnamd0aWpicmtjd3dzbGlxdWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4MzYxMzAsImV4cCI6MjA0MDQxMjEzMH0.C8nvHjy-fHXY4bxI1OBTf3NqVf76RznvwoO1-ReC-5s";
const supabase = createClient(supabaseUrl, supabaseKey);

export default {
  components: { LoanRequestTable },
  data() {
    return {
      loanRequest: {
        selectedCar: null,
        duration: "",
        income: "",
      },
      loanRequests: [],
      formErrors: {
        selectedCar: null,
        duration: null,
        income: null,
      },
      carOptions: [], // Initialize carOptions as an empty array
    };
  },
  methods: {
    selectCar(car) {
      // Set the selected car when an image is clicked
      this.loanRequest.selectedCar = car;
      this.formErrors.selectedCar = null;
    },
    undoCarSelection() {
      // Reset the selected car to null when the undo button is clicked
      this.loanRequest.selectedCar = null;
    },
    validateForm() {
      let isValid = true;
      this.formErrors = {
        selectedCar: null,
        duration: null,
        income: null,
      };

      if (!this.loanRequest.selectedCar) {
        this.formErrors.selectedCar = "Please select a car.";
        isValid = false;
      }
      if (!this.loanRequest.duration) {
        this.formErrors.duration = "Loan Duration is required.";
        isValid = false;
      }
      if (!this.loanRequest.income) {
        this.formErrors.income = "Monthly Income is required.";
        isValid = false;
      }

      return isValid;
    },
    submitLoanRequest() {
      if (this.validateForm()) {
        this.loanRequests.push({ ...this.loanRequest });
        this.saveLoanRequests();
        this.loanRequest = { selectedCar: null, duration: "", income: "" };
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
      // Fetch car data from Supabase
      const { data, error } = await supabase
        .from("cars") // Replace 'cars' with your actual table name
        .select("name, image"); // Adjust the fields as needed

      if (error) {
        console.error("Error fetching car options:", error);
      } else {
        this.carOptions = data; // Set the fetched data to carOptions
      }
    },
  },
  mounted() {
    this.loadLoanRequests();
    this.fetchCarOptions(); // Fetch car options when the component is mounted
  },
};
</script>

<style scoped>
.loan-car-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
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
  max-width: 100%;
  height: auto;
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
}

.centered-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  margin: 3%;
}

.outlined-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.dark-mode {
  background-color: #333;
  color: white;
}
</style>
