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
  
                <v-card class="mx-auto text-center mt-2" color="dark" max-width="600" dark>
                  <v-card-text>
                    <div class="text-h5 font-weight-thin">Global Market Value Based on the Last 5 Recent Sales in USD</div>
                    <canvas :id="'chart-' + item.car.id"></canvas>
                  </v-card-text>
  
  
                
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

      <v-col cols="12" md="6" class="mb-4">
        
     
        <router-link :to="{ path: '/GarageContents' }" class="text-decoration-none">
  <v-card elevation="8" class="pa-4 hover-card shine-effect">
    <!-- Centering the v-btn and v-icon -->
    <v-row no-gutters class="d-flex justify-center">
      <v-col cols="auto" class="d-flex justify-center">
        <v-btn icon class="mb-4" color="primary">
          <v-icon large>mdi-plus-circle</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12">
        <v-card-title>Add a Car to Your Garage</v-card-title>
        <v-card-text>
          Secure your investment and stay ahead of market trends! Insert your car here to effortlessly store your vehicle in your personal garage and keep track of its market value based on real-time sales data. Adding your car today ensures you're always informed about its worth, whether you're planning to sell, upgrade, or hold onto it for future gains.
        </v-card-text>

        <v-img
          src="https://www.cars.com/images/garage-landing/garage-hero.webp"
          alt="Add a Car"
        ></v-img>
      </v-col>
    </v-row>
  </v-card>
</router-link>
</v-col>


    </v-row>
  </template>
  
  <script>
  import { supabase } from '../../lib/supaBase';
  import { getMarketValue } from '../../seed/get-market-value';
  import { Chart, registerables } from 'chart.js';
  
  Chart.register(...registerables);
  
  export default {
    data() {
      return {
        cars: [],
        transactions: [],
        carsWithTransactions: [],
        loading: true,
        error: null,
        charts: [],
      };
    },
    async created() {
      await this.fetchCars();
    },
    beforeDestroy() {
      this.charts.forEach(chart => chart.destroy());
    },
    methods: {
      async fetchCars() {
        this.loading = true;
        const loggedInUserId = localStorage.getItem('user_id');
  
        try {
          const { data, error } = await supabase
            .from('Car')
            .select('*')
            .eq('is_garage', true)
            .eq('user_id', loggedInUserId);
  
          if (error) throw error;
  
          this.cars = data.filter(car => car !== null);
  
          await Promise.all(this.cars.map(async (car) => {
  const marketValueData = await getMarketValue(car.brand, car.model);
  
  // Fetch random names using randomuser.me API
  const randomNamesResponse = await fetch('https://randomuser.me/api/?results=' + marketValueData.length);
  const randomNamesData = await randomNamesResponse.json();
  
  const randomNames = randomNamesData.results.map(user => `${user.name.first} ${user.name.last}`);

  // Map market value data to random names
  car.marketValue = marketValueData.map((value, index) => {
    return {
      name: randomNames[index],
      value: value
    };
  });
}));

          this.carsWithTransactions = data.map(transaction => ({
            car: transaction,
            transaction: transaction,
          })).filter(item => item.car !== null);
  
          this.renderCharts();
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
        .from('Car')
        .update({ is_garage: false }) // Set is_garage to false
        .eq('id', carId); // Find the car by its ID

      if (error) throw error;

      // Update the local carsWithTransactions state to reflect the change
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
  
      renderCharts() {
        this.$nextTick(() => {
          this.carsWithTransactions.forEach(item => {
            const ctx = document.getElementById(`chart-${item.car.id}`);
            if (ctx) {
              const marketValues = item.car.marketValue;
  
              const chart = new Chart(ctx, {
                type: 'line',
                data: {
                  labels: marketValues.map(value => `${value.name}`),
                  datasets: [{
                    label: 'Market Value',
                    data: marketValues.map(value => value.value),
                    borderColor: 'rgba(255, 255, 255, 0.6)',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    fill: true,
                  }]
                },
                options: {
                  responsive: true,
                  plugins: {
                    legend: {
                      labels: {
                        color: 'white',
                      }
                    }
                  },
                  scales: {
                    x: {
                      ticks: {
                        color: 'white',
                      }
                    },
                    y: {
                      ticks: {
                        color: 'white',
                      }
                    }
                  }
                }
              });
              this.charts.push(chart);
            } else {
              console.error(`Canvas for car ID ${item.car.id} not found.`);
            }
          });
        });
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

  .hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
}

.shine-effect {
  position: relative;
  overflow: hidden;
}

.shine-effect::before {
  content: '';
  position: absolute;
  top: -100%;
  left: -100%;
  width: 200%;
  height: 200%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0) 75%);
  transform: rotate(-15deg);
  transition: all 0.5s ease-in-out;
  pointer-events: none;
}

.shine-effect:hover::before {
  top: 100%;
  left: 100%;
}
  </style>
  