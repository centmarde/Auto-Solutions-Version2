<template>
  <v-container class="cars-for-sale">
    <v-row>
      <v-col>
        <v-card class="pa-5" elevation="8"> <h1 class="my-4 text-center">Cars for Sale</h1></v-card>
       
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
        <v-alert type="warning">No cars available for sale.</v-alert>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="car in cars" :key="car.id" cols="12" md="3" class="mb-4">
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
    };
  },
  async created() {
    await this.fetchCars();
  },
  methods: {
    async fetchCars() {
      this.loading = true;
      try {
        const { data, error } = await supabase
          .from('Car')
          .select('*, User (*)')
          .eq('forSale', true) // Fetch only cars for sale
          .neq('user_id', loggedInUserId);

        if (error) throw error;

        this.cars = data;  // Store fetched cars
        this.$emit('update-car-count', this.cars.length); // Emit only the number of cars
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
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
