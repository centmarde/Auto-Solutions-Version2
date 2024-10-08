<template>
    <v-row v-if="loading || error || cars.length === 0">
      <v-col v-if="loading" class="loading">
        <v-alert type="info">Loading...</v-alert>
      </v-col>
  
      <v-col v-if="error" class="error">
        <v-alert type="error">{{ error }}</v-alert>
      </v-col>
  
      <v-col v-if="cars.length === 0 && !loading && !error" class="no-cars">
        <v-alert type="warning">No Cars Have Been Listed.</v-alert>
      </v-col>
    </v-row>
  
    <v-row v-if="carsWithTransactions.length > 0">
      <v-col v-for="item in carsWithTransactions" :key="item.car.id" cols="12" md="6" class="mb-4">
        <v-card elevation="8">
          <v-row no-gutters>
            <v-col cols="12">
              <v-img
                v-if="item.car.img"
                :src="item.car.img"
                alt="Car Image"
                class="img-fluid rounded-start"
                cover
                height="180px"
              ></v-img>
            </v-col>
  
            <v-col cols="12">
              <v-card-title>{{ item.car.brand }} {{ item.car.model }}</v-card-title>
              <v-card-text>
                <p><small class="text-body-secondary">added at: {{ item.transaction.created_at }}</small></p>
                <v-card
                  class="mx-auto text-center mt-2"
                  color="dark"
                  max-width="600"
                  dark
                >
                  <v-card-text>
                    <v-sheet color="#151515">
                      <v-sparkline
                        :model-value="item.car.marketValue"
                        color="rgba(255, 255, 255, .7)"
                        height="100"
                        padding="24"
                        stroke-linecap="round"
                        smooth
                      >
                        <template v-slot:label="value">
                          ${{ value }}
                        </template>
                      </v-sparkline>
                    </v-sheet>
                  </v-card-text>
  
                  <v-card-text>
                    <div class="text-h4 font-weight-thin">
                      Market Value Over Last 5 Months
                    </div>
                  </v-card-text>
  
                  <v-divider></v-divider>
  
                  <v-card-actions class="justify-center">
                    <v-btn variant="text" block>
                      Go to Report
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-card-text>
              <v-card-actions class="d-flex justify-content-end">
                <v-btn color="red" @click="deleteCar(item.car.id)">
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
import { getMarketValue } from '../../seed/get-market-value'; 

export default {
  data() {
    return {
      cars: [],
      transactions: [],
      carsWithTransactions: [],
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
    const loggedInUserId = localStorage.getItem('user_id');

    try {
      const { data, error } = await supabase
        .from('Transaction')
        .select(`*, Car (*), User:buyer_id (*)`)
        .eq('Car.is_garage', true)
        .eq('seller_id', loggedInUserId);

      if (error) throw error;

      const carsForSale = data.map(transaction => transaction.Car).filter(car => car !== null);
      this.cars = this.shuffleArray(carsForSale);

      // Fetch the latest market values for the cars
      await Promise.all(this.cars.map(async (car) => {
        const marketValueData = await getMarketValue(car.brand, car.model);
        car.marketValue = marketValueData; // Store the latest market value
      }));

      this.carsWithTransactions = data.map(transaction => ({
        car: transaction.Car,
        transaction: transaction,
      })).filter(item => item.car !== null);
    } catch (err) {
      this.error = err.message;
    } finally {
      this.loading = false;
    }
  },

    async deleteCar(carId) {
      const confirmation = window.confirm("Are you sure you want to delete this Listing?");
      
      if (confirmation) {
        try {
          const { error } = await supabase
            .from('Transaction')
            .delete()
            .eq('car_id', carId);
          
          if (error) throw error;
          
          this.carsWithTransactions = this.carsWithTransactions.filter(item => item.car.id !== carId);
        } catch (err) {
          this.error = err.message;
        }
      }
    },

    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
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
  
  .v-card-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .v-card-text p {
    margin: 0;
  }
  </style>
  