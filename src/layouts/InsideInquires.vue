<template>
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
  
    <v-row v-if="carsWithTransactions.length > 0">
      <v-col v-for="item in carsWithTransactions" :key="item.car.id" cols="12" md="6" class="mb-4">
        <v-card elevation="8">
          <v-row no-gutters>
            <!-- Car Image -->
            <v-col cols="4">
              <v-img
                v-if="item.car.img"
                :src="item.car.img"
                alt="Car Image"
                class="img-fluid rounded-start"
                contain
                cover
                height="150px"
              ></v-img>
            </v-col>
  
            <!-- Car Details -->
            <v-col cols="8">
  <v-card-title>{{ item.car.brand }} {{ item.car.model }}</v-card-title>
  <v-card-text>
    <p>{{ item.car.description }}</p>
    <p><small class="text-body-secondary">added at: {{ item.transaction.created_at }}</small></p>
  </v-card-text>

  <!-- Buttons -->
  <v-card-actions>
    <v-btn color="red" @click="deleteCar(item.car.id)">
      <v-icon left>mdi-delete</v-icon>
      Delete
    </v-btn>
    
    <v-btn color="blue" @click="chatWithSupplier(item.transaction.supplier_id)">
      <v-icon left>mdi-chat</v-icon>
      Chat with Supplier
    </v-btn>
  </v-card-actions>
</v-col>

           
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </template>
  
  <script>
  import { supabase } from '../lib/supaBase';
  
  export default {
    data() {
      return {
        cars: [],
        transactions: [],
        carsWithTransactions: [], // This will hold the combined data
        loading: true,
        error: null
      };
    },
    async created() {
      await this.fetchCars();
    },
    methods: {
      async fetchCars() {
        this.loading = true;
        const loggedInUserId = localStorage.getItem('user_id'); // Get the logged-in user's ID
  
        try {
          const { data, error } = await supabase
            .from('Transaction')
            .select(`
              *,
              Car (
                *
              ),
              User:buyer_id ( 
               *
              )
            `)
            .eq('Car.forSale', true); // Fetch only cars for sale
  
          if (error) throw error;
  
          // Filter out transactions that don't have a car for sale
          const carsForSale = data.map(transaction => transaction.Car).filter(car => car !== null);
  
          // Randomly shuffle the cars
          this.cars = this.shuffleArray(carsForSale);
  
          // Combine cars and transactions
          this.carsWithTransactions = data.map((transaction, index) => ({
            car: transaction.Car,
            transaction: transaction
          }));
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
      async deleteCar(carId) {
  try {
    const { error } = await supabase
      .from('Transaction')
      .delete()
      .eq('car_id', carId); // Delete transaction based on the car ID

    if (error) {
      throw error;
    }

    // Remove the car from the list after deletion
    this.carsWithTransactions = this.carsWithTransactions.filter(item => item.car.id !== carId);
  } catch (err) {
    this.error = err.message;
  }
}

    /* chatWithSupplier(supplierId) {
      // Logic to chat with supplier, e.g., navigate to a chat component
      this.$router.push({ name: 'Chat', params: { supplierId } });
    }*/

    }
  };
  </script>
  