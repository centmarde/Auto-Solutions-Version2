<template>
  <v-row v-if="userCars.length > 0">
    <v-col v-for="car in userCars" :key="car.id" cols="12" md="6" class="mb-4">
      <v-card elevation="8" @click="handleCardClick(car.id)">
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
            <v-card-title>
              {{ car.brand }} {{ car.model }}
            </v-card-title>
            <v-card-text>
              <p class="truncate-text single-line">
                {{ car.description }}
              </p>
              <p class="car-status">
                {{ car.forSale && car.forRent ? 'For Sale and Open for Rent' : car.forSale ? 'For Sale' : car.forRent ? 'Open for Rent' : '' }}
              </p>

              <!-- Transaction Status Message -->
              <p v-if="isCarInTransaction(car.id)" class="transaction-status">
                Your car is in transaction
              </p>
              <!-- Pending or Approved Indicator -->
              <v-chip
                :color="car.is_pending ? 'orange' : 'green'"
                dark
                small
                class="status-chip"
              >
                {{ car.is_pending ? 'Pending' : 'Approved' }}
              </v-chip>
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
</template>

<script>
import { supabase } from '../../lib/supaBase';

export default {
  data() {
    return {
      userCars: [],
      transactionsCarIds: [],
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
    await this.fetchTransactionCarIds();
  },
  methods: {
    async fetchUserCars() {
      this.loading = true;
      const loggedInUserId = localStorage.getItem('user_id');

      try {
        const { data, error } = await supabase
          .from('cars')
          .select('*')
          .eq('user_id', loggedInUserId); 

        if (error) throw error;

        this.userCars = data || [];
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    async fetchTransactionCarIds() {
      try {
        const { data, error } = await supabase
          .from('transactions')
          .select('car_id'); 

        if (error) throw error;

        this.transactionsCarIds = data.map(transaction => transaction.car_id);
      } catch (err) {
        this.error = err.message;
      }
    },
    isCarInTransaction(carId) {
      return this.transactionsCarIds.includes(carId); // Check if car ID exists in transactions
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
        const { error } = await supabase.from('cars').update(updatedData).eq('id', id); 
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
        const { error } = await supabase.from('cars').delete().eq('id', carId); 
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
.status-chip {
  margin-top: 8px;
  font-weight: bold;
}
.v-card-text p {
  margin: 0;
}

.car-status {
  font-weight: bold; 
}
.transaction-status{
  background-color: #ffcccb; /* Light red background color */
  color: #800000; /* Darker text for contrast */
  padding: 8px;
  border-radius: 4px;
  font-weight: bold;
  margin-top: 8px;
}
</style>
