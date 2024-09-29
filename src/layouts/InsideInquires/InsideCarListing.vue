<template>
  <v-row v-if="loading || error || userCars.length === 0">
    <v-col v-if="loading" class="loading">
      <v-alert type="info">Loading...</v-alert>
    </v-col>

    <v-col v-if="error" class="error">
      <v-alert type="error">{{ error }}</v-alert>
    </v-col>

    <v-col v-if="userCars.length === 0 && !loading && !error" class="no-cars">
      <v-alert type="warning">No cars posted by you.</v-alert>
    </v-col>
  </v-row>

  <v-row v-if="userCars.length > 0">
    <v-col v-for="car in userCars" :key="car.id" cols="12" md="6" class="mb-4">
      <v-card elevation="8" class="fixed-card" @click="handleCardClick(car.id)">
        <v-row no-gutters>
          <v-col cols="4">
            <v-img
              v-if="car.img"
              :src="car.img"
              alt="Car Image"
              class="img-fluid rounded-start"
              cover
              height="180px"
            ></v-img>
          </v-col>

          <v-col cols="8">
            <v-card-title>{{ car.brand }} {{ car.model }}</v-card-title>
            <v-card-text>
              <p class="truncate-text single-line">
                {{ car.description }}
              </p>
            </v-card-text>
            <v-card-actions class="d-flex justify-content-end">
              <v-btn color="red" @click.stop="deleteCar(car.id)">
                <v-icon left>mdi-delete</v-icon>
                Delete
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { supabase } from '../../lib/supaBase';

export default {
  data() {
    return {
      cars: [],
      userCars: [],
      loading: true,
      error: null,
      selectedCarId: null, 
    };
  },
  async created() {
    await this.fetchUserCars();
  },
  methods: {
    async fetchUserCars() {
      this.loading = true;
      const loggedInUserId = localStorage.getItem('user_id');

      try {
        const { data, error } = await supabase
          .from('Car')
          .select('*')
          .eq('user_id', loggedInUserId); 

        if (error) throw error;

        this.userCars = data || []; 

        
        this.userCars.forEach(car => {
          console.log(`Car ID: ${car.id}`); 
        });
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    handleCardClick(carId) {
   
      this.selectedCarId = carId; 
    },
    async deleteCar(carId) {
  const confirmDelete = confirm("Are you sure you want to delete this car?"); // Confirmation dialog
  if (!confirmDelete) return; // Exit if the user cancels

  try {
    const { error } = await supabase.from('Car').delete().eq('id', carId); 
    if (error) throw error;

    this.userCars = this.userCars.filter(car => car.id !== carId);
    alert(`Car Deleted Successfully!`); 
  } catch (err) {
    this.error = err.message;
  }
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

.single-line {
  max-height: 1.2em;
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
