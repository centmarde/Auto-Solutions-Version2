<template>
    <v-container class="cars-for-sale">
      <v-row>
        <v-col>
          <v-card class="pa-5" elevation="8">
            <h1 class="my-4 text-center">Cars for Rent</h1>
          </v-card>
        </v-col>
      </v-row>
  
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
  
      <v-row v-else>
        <v-carousel hide-delimiters cycle show-arrows autoplay>
          <v-carousel-item v-for="(chunk, index) in chunkedCars" :key="index">
            <v-row>
              <v-col v-for="car in chunk" :key="car.id" cols="12" md="3" class="mb-4">
                <v-card elevation="8">
                  <v-img v-if="car.img" :src="car.img" alt="Car Image" class="card-img-top" contain cover></v-img>
                  <v-card-title>{{ car.brand }} {{ car.model }}</v-card-title>
                  <v-card-actions>
                    <router-link :to="{ name: 'CarDetails', params: { id: car.id } }" exact>
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
  import { supabase } from '../lib/supaBase';
  
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
      window.addEventListener('resize', this.updateChunkSize); // Listen for window resize
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.updateChunkSize); // Clean up the listener
    },
    computed: {
      chunkedCars() {
        const result = [];
        for (let i = 0; i < this.cars.length; i += this.chunkSize) {
          result.push(this.cars.slice(i, i + this.chunkSize));
        }
        return result;
      }
    },
    methods: {
      async fetchCars() {
        this.loading = true;
        const loggedInUserId = localStorage.getItem("user_id"); // Get the logged-in user's ID
  
        try {
          const { data, error } = await supabase
            .from('cars')
            .select(`*
              users (
                *
              )
            `)
            .eq('for_rent', true)
            .neq('user_id', loggedInUserId);
  
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
      }
    }
  };
  </script>
  
  
  
  
  <style scoped>
  .koy {
    text-decoration: none;
  }
  
  .card-img-top {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  
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
  
  .car-item {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 5px;
  }
  
  .car-image {
    max-width: 100%;
    height: auto;
  }
  </style>
  