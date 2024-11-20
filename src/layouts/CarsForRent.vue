<template>
  <v-container class="cars-for-rent">
    <v-row>
      <v-col>
        <v-container class="pa-5" elevation="8">
          <h1 class="my-4 text-center arimo">Cars for Rent</h1>
        </v-container>
      </v-col>
    </v-row>

    <!-- Loading, Error, or No Cars -->
    <v-row v-if="loading || error || cars.length === 0">
      <v-col v-if="loading" class="loading">
        <v-alert type="info">Loading...</v-alert>
      </v-col>

      <v-col v-if="error" class="error">
        <v-alert type="error">{{ error }}</v-alert>
      </v-col>

      <v-col v-if="cars.length === 0 && !loading && !error" class="no-cars">
        <v-alert type="warning">No cars available for Rent</v-alert>
      </v-col>
    </v-row>

    <!-- Car List Carousel -->
    <v-row v-else class="padding">
      <v-carousel
        hide-delimiters
        cycle
        show-arrows
        autoplay
        class="carouselsize"
        height="350px"
      >
        <v-carousel-item
          v-for="(chunk, index) in chunkedCars"
          :key="index"
          class="carousel-item border"
        >
          <v-row>
            <v-col
              v-for="car in chunk"
              :key="car.id"
              cols="12"
              md="3"
              class="mb-4"
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

<script>
import { supabase } from "../lib/supaBase";

export default {
  data() {
    return {
      cars: [],
      loading: true,
      error: null,
      chunkSize: 4, // Default chunk size for larger screens
    };
  },
  async created() {
    await this.fetchCars();
    this.updateChunkSize(); // Set initial chunk size
    window.addEventListener("resize", this.updateChunkSize); // Listen for window resize
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateChunkSize); // Clean up the listener
  },
  computed: {
    chunkedCars() {
      const result = [];
      for (let i = 0; i < this.cars.length; i += this.chunkSize) {
        result.push(this.cars.slice(i, i + this.chunkSize));
      }
      return result;
    },
  },
  methods: {
    async fetchCars() {
      this.loading = true;
      const loggedInUserId = localStorage.getItem("user_id"); // Get the logged-in user's ID

      try {
        const { data, error } = await supabase
          .from("cars")
          .select(
            `*
              users (
                *
              )
            `
          )
          .eq("for_rent", true)
          .eq("is_pending", false)
          .eq("is_for_shop", false)
          .neq("user_id", loggedInUserId);

        if (error) throw error;

        // Shuffle the cars immediately after fetching them
        this.cars = this.shuffleArray(data);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    updateChunkSize() {
      // Update chunk size based on window width
      this.chunkSize = window.innerWidth < 600 ? 1 : 4; // Adjust the threshold as needed
    },
  },
};
</script>

<style scoped>
.cars-for-rent {
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
  height: 100%;
  overflow: hidden;
}

.car-card {
  height: 400px; /* Fixed height for consistent layout */
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
.padding {
  padding-bottom: 120px;
}
</style>
