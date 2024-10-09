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
              <p class="car-status">
                {{ car.forSale && car.forRent ? 'For Sale and Open for Rent' : car.forSale ? 'For Sale' : car.forRent ? 'Open for Rent' : '' }}
              </p>
            </v-card-text>
            <v-card-actions class="d-flex justify-content-end">
              <v-btn color="red" @click.stop="deleteCar(car.id)">
                <v-icon left>mdi-delete</v-icon>
                Delete
              </v-btn>
              <v-btn color="blue" @click.stop="openEditModal(car)">
                <v-icon left>mdi-pencil</v-icon>
                Edit
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>

  <!-- Edit Car Modal -->
  <v-dialog v-model="editModal" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="headline">Edit Car Details</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="editForm" v-model="valid">
          <v-text-field v-model="editedCar.year" label="Year" required></v-text-field>
          <v-text-field v-model="editedCar.price" label="Price" required></v-text-field>

          <!-- For Sale Radio Buttons -->
          <v-radio-group v-model="editedCar.forSale" label="For Sale" required>
            <v-radio label="True" :value="true"></v-radio>
            <v-radio label="False" :value="false"></v-radio>
          </v-radio-group>

          <!-- For Rent Radio Buttons -->
          <v-radio-group v-model="editedCar.forRent" label="For Rent" required>
            <v-radio label="True" :value="true"></v-radio>
            <v-radio label="False" :value="false"></v-radio>
          </v-radio-group>

           <!-- For Rent Radio Buttons -->
           <v-radio-group v-model="editedCar.is_garage" label="Insert Garage" required>
            <v-radio label="True" :value="true"></v-radio>
            <v-radio label="False" :value="false"></v-radio>
          </v-radio-group>

          <v-textarea v-model="editedCar.description" label="Description" required></v-textarea>
          <v-text-field v-model="editedCar.mileage" label="Mileage" required></v-text-field>
          <v-text-field v-model="editedCar.engine" label="Engine" required></v-text-field>
          <v-text-field v-model="editedCar.horsepower" label="Horsepower" required></v-text-field>
          <v-text-field v-model="editedCar.torque" label="Torque" required></v-text-field>
          <v-text-field v-model="editedCar.topSpeed" label="Top Speed" required></v-text-field>
          <v-text-field v-model="editedCar.transmission" label="Transmission" required></v-text-field>
          <v-text-field v-model="editedCar.yearsowned" label="Years Owned" required></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="updateCar" :disabled="!valid">Save</v-btn>
        <v-btn @click="editModal = false">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
      editModal: false,
      editedCar: {},
      valid: false,
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
    openEditModal(car) {
      this.editedCar = { ...car }; // Clone the car object to edit
      this.editModal = true; // Show the modal
    },
    async updateCar() {
      const { id, ...updatedData } = this.editedCar; 

      try {
        const { error } = await supabase.from('Car').update(updatedData).eq('id', id); 
        if (error) throw error;

       
        const index = this.userCars.findIndex(car => car.id === id);
        if (index !== -1) {
          this.userCars[index] = { ...this.userCars[index], ...updatedData };
        }

        this.editModal = false; 
        alert(`Car Updated Successfully!`);
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteCar(carId) {
      const confirmDelete = confirm("Are you sure you want to delete this car?");
      if (!confirmDelete) return; 

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

.car-status {
  font-weight: bold; 
}
</style>
