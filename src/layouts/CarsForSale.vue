<template>
  <v-container class="cars-for-sale">
    <v-row>
      <v-col>
        <v-container class="pa-5" elevation="8">
          <h1 class="my-4 text-center arimo">Cars for Sale</h1>
        </v-container>
      </v-col>
    </v-row>

    <!-- Loading, Error, or No Cars -->
    <v-row
      v-if="carStore.loading || carStore.error || carStore.cars.length === 0"
    >
      <v-col v-if="carStore.loading" class="loading">
        <v-alert type="info">Loading...</v-alert>
      </v-col>

      <v-col v-if="carStore.error" class="error">
        <v-alert type="error">{{ carStore.error }}</v-alert>
      </v-col>

      <v-col
        v-if="
          carStore.cars.length === 0 && !carStore.loading && !carStore.error
        "
        class="no-cars"
      >
        <v-alert type="warning">No cars available for sale.</v-alert>
      </v-col>
    </v-row>

    <!-- Car List Carousel -->
    <v-row v-else>
      <v-carousel hide-delimiters cycle show-arrows autoplay>
        <v-carousel-item
          v-for="(chunk, index) in chunkedCars"
          :key="index"
          class="carousel-item"
        >
          <v-row>
            <v-col
              v-for="car in chunk"
              :key="car.id"
              cols="12"
              md="3"
              class="mb-4 border"
            >
              <v-card elevation="8" class="car-card">
                <v-img
                  v-if="car.img"
                  :src="car.img"
                  alt="Car Image"
                  class="car-image"
                  cover
                ></v-img>
                <v-card-title>{{ car.brand }} {{ car.model }}</v-card-title>
                <v-card-actions>
                  <router-link
                    :to="{ name: 'CarDetails', params: { id: car.id } }"
                    exact
                  >
                    <v-btn class="mx-auto" outlined color="primary">
                      <span>More Information</span>
                      <v-icon>mdi-arrow-right</v-icon>
                    </v-btn>
                  </router-link>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCarStore } from "../stores/carStore.js";
import { onMounted, onBeforeUnmount, computed, ref } from "vue";

const carStore = useCarStore();
const chunkSize = ref(4); // Default chunk size for larger screens

//  to update chunk size based on screen width
const updateChunkSize = () => {
  chunkSize.value = window.innerWidth < 768 ? 1 : 4; // Adjust for smaller screens like iPads
};

// Computed property to chunk cars for layout
const chunkedCars = computed(() => {
  const result = [];
  for (let i = 0; i < carStore.cars.length; i += chunkSize.value) {
    result.push(carStore.cars.slice(i, i + chunkSize.value));
  }
  return result;
});

// Lifecycle hooks
onMounted(async () => {
  await carStore.fetchCars(); // Fetch cars from Pinia store
  updateChunkSize(); // Set initial chunk size
  window.addEventListener("resize", updateChunkSize); // Listen for window resize
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateChunkSize); // Clean up the listener
});
</script>

<style scoped>
.cars-for-sale {
  padding: 20px;
}

.loading {
  font-size: 18px;
  color: #666;
}

.error {
  color: red;
}

.no-cars {
  font-size: 18px;
}

.carousel-item {
  height: 90%;
  overflow: hidden;
}

.car-card {
  height: 400px; /* Fixed height for uniform cards */
  overflow: hidden; /* Prevent overflow of content */
}

.car-image {
  width: 100%;
  height: 250px; /* Adjust as necessary */
  object-fit: cover; /* Ensure images fill the space without distortion */
}

.arimo {
  font-family: "Arimo", sans-serif;
  font-optical-sizing: auto;
  font-weight: 692;
  font-style: italic;
}
</style>
