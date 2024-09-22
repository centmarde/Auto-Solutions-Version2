<template>
    <section id="CarSale">
      <v-container fluid class="mt-5">
        <v-card class="pa-10">
            <h2>Select Brand</h2>
  
  <v-form @submit.prevent="submitForm">
    <v-row>
      <v-col cols="12" md="6" class="pa-10">
        <!-- Brand Selection Dropdown -->
        <div class="mb-3">
          <label class="form-label" for="brand">Brand</label>
          <select
            id="brand"
            class="form-select"
            v-model="selectedMake"
            @change="filterModels"
          >
            <option value="" disabled>Select a brand</option>
            <option v-for="make in uniqueMakes" :key="make" :value="make">
              {{ make }}
            </option>
          </select>
        </div>

        <!-- Model Selection Dropdown -->
        <div class="mb-3" v-if="selectedMake">
          <label class="form-label" for="model">Model</label>
          <select
            id="model"
            class="form-select"
            v-model="selectedModel"
            @change="showCarImage"
          >
            <option value="" disabled>Select a model</option>
            <option
              v-for="model in filteredModels"
              :key="model.Model"
              :value="model.Model"
            >
              {{ model.Model }}
            </option>
          </select>
        </div>

        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea
            class="form-control"
            id="description"
            rows="3"
            :placeholder="selectedCar ? selectedCar.Description : 'Car Description'"
          ></textarea>
        </div>
      </v-col>

      <v-col>
        <!-- Display Car Image and Details -->
        <transition name="fade" mode="out-in">
    <v-card v-if="selectedCar" key="card" elevation="10" class="mt-3">
      <v-card-text class="text-center">
        <h5 class="card-title">
          {{ selectedCar.Brand }} {{ selectedCar.Model }} ({{ selectedCar.yearModel }})
        </h5>
        <v-img
          :src="selectedCar.ImageURL"
          :alt="selectedCar.Model"
          class="my-3"
          width="100%"
        ></v-img>
      </v-card-text>
    </v-card>
  </transition>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-center mt-3">
        <!-- Submit Button -->
        <v-btn
          type="submit"
          :disabled="isSubmitting"
          color="primary"
          class="btnn"
        >
          <v-progress-circular
            v-if="isSubmitting"
            indeterminate
            size="20"
            width="2"
            class="me-2"
          ></v-progress-circular>
          <span v-if="isSubmitting">Loading...</span>
          <span v-else>Show Matches {{ $count }}</span>
          <v-icon right>
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
        </v-card>
     
      </v-container>
    </section>
  </template>
  
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        cars: [],
        selectedMake: "",
        selectedModel: "",
        selectedCar: null,
        uniqueMakes: [],
        filteredModels: [],
        yearsOwned: "",
        description: "",
        isSubmitting: false,
        isDataFetched: false,
      };
    },
    async mounted() {
      if (!this.isDataFetched) {
        await this.fetchCarData();
      }
    },
    methods: {
      GoBack() {
        this.$router.push("/Home");
      },
      async fetchCarData() {
        try {
          const response = await axios.get(
            "https://centmarde.github.io/carsMockdata/allcars.json"
          );
          this.cars = response.data;
          this.uniqueMakes = [...new Set(this.cars.map((car) => car.Brand))];
          this.isDataFetched = true;
        } catch (error) {
          console.error("Error fetching car data:", error);
          this.cars = []; // Empty array or default data
        }
      },
      filterModels() {
        this.filteredModels = this.cars.filter(car => car.Brand === this.selectedMake);
        this.selectedModel = "";
        this.selectedCar = null;
      },
      showCarImage() {
        this.selectedCar = this.cars.find(
          car => car.Brand === this.selectedMake && car.Model === this.selectedModel
        );
      },
      async submitForm() {
        this.isSubmitting = true;
        try {
          // Handle form submission logic here...
          alert("Form submitted successfully");
        } catch (error) {
          console.error("Error submitting form:", error);
        } finally {
          this.isSubmitting = false;
        }
      },
    },
  };
  </script>
  <style scoped>
  .card {
    cursor: pointer;
    max-width: 100%;
    margin: auto;
  }
  .img-fluid {
    max-width: 100%;
    height: auto;
  }
  
  /* From Uiverse.io by satyamchaudharydev */
  .btnn {
    position: relative;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
    padding-block: 0.5rem;
    padding-inline: 1.25rem;
    background-color: rgb(97, 40, 255);
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffff;
    gap: 10px;
    font-weight: bold;
    border: 3px solid #ffffff4d;
    outline: none;
    overflow: hidden;
    font-size: 15px;
    cursor: pointer;
  }
  
  .icon {
    width: 24px;
    height: 24px;
    transition: all 0.3s ease-in-out;
  }
  
  .btnn:hover {
    transform: scale(1.05);
    border-color: #fff9;
  }
  
  .btnn:hover .icon {
    transform: translate(4px);
  }
  
  .btnn:hover::before {
    animation: shine 1.5s ease-out infinite;
  }
  
  .btnn::before {
    content: "";
    position: absolute;
    width: 100px;
    height: 100%;
    background-image: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0) 70%
    );
    top: 0;
    left: -100px;
    opacity: 0.6;
  }
  
  @keyframes shine {
    0% {
      left: -100px;
    }
  
    60% {
      left: 100%;
    }
  
    to {
      left: 100%;
    }
  }
  #CarSale{
    overflow: hidden;
    padding: 1rem;
  }
  </style>
  