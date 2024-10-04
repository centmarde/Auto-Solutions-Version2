<template>
  <v-container fluid class="mb-3">
    <v-row>
      <v-col>
        <v-card elevation="10">
          <v-row no-gutters>
            <v-col cols="12" md="7">
              <!-- Image takes up more space -->
              <v-img v-if="car.img" :src="car.img" alt="Car Image" class="card-img"></v-img>
            </v-col>
            <v-col cols="12" md="5">
              <!-- Details take up less space -->
              <v-card-text>
                <h1 class="card-title">{{ car.brand }} {{ car.model }}</h1>
                <v-list dense>
                  <v-list-item v-for="(value, key) in carDetails" :key="key" class="car-detail-item">
                    <v-list-item-content>
                      <strong>{{ key }}:</strong> {{ value }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="user.mobile_no" class="car-detail-item">
                    <v-list-item-content>
                      <strong>Contact:</strong> {{ user.mobile_no }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item v-if="user.address" class="car-detail-item">
                    <v-list-item-content>
                      <strong>Location:</strong> {{ user.address }}
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-row v-if="user.username" class="car-detail-item d-flex justify-end">
                  <div class="my-2 mx-2">{{ user.username }}</div>
                  <v-avatar size="40">
                    <v-img :src="user.img" alt="User Image"></v-img>
                  </v-avatar>
                </v-row>
                <v-divider></v-divider>
              </v-card-text>
              <v-col class="bm-3 text-center mx-auto mb-4 d-flex justify-center">
                <router-link to="/Home" exact>
                  <v-btn class="mx-3" outlined color="primary">
                    <span>Exit</span>
                    <v-icon>mdi-arrow-right</v-icon>
                  </v-btn>
                </router-link>
                <v-btn class="lofi interested" @click="insertTransaction" :loading="isSubmitting" :disabled="isSubmitting">
                  <template v-slot:loader>
                    <v-progress-circular indeterminate size="20" color="white"></v-progress-circular>
                  </template>
                  <span v-if="!isSubmitting">Interested</span>
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-col>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { supabase } from '../lib/supaBase';
import gsap from 'gsap';

export default {
  name: 'CarDetails',
  data() {
    return {
      car: {},
      user: {},
      isSubmitting: false, // Add isSubmitting state
      buyerId: localStorage.getItem("user_id"), // Assume the logged-in user's ID is stored here
    };
  },
  computed: {
    carDetails() {
      return {
        Year: this.car.year,
        Price: `php${this.car.price}`,
        Mileage: this.car.mileage,
        Engine: this.car.engine,
        Horsepower: `${this.car.horsepower} HP`,
        Torque: `${this.car.torque} Nm`,
        TopSpeed: `${this.car.topSpeed} km/h`,
        Transmission: this.car.transmission,
        YearsOwned: this.car.yearsowned,
        Description: this.car.description,
      };
    },
  },
  async mounted() {
    const carId = this.$route.params.id;
    await this.fetchCarDetails(carId);

    // GSAP animation
    gsap.from('.car-detail-item', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
    });
  },
  methods: {
    async fetchCarDetails(id) {
      try {
        const { data, error } = await supabase
          .from('Car')
          .select('*, User(*)')
          .eq('id', id)
          .single();

        if (error) throw error;

        this.car = data;
        this.user = data.User;
      } catch (err) {
        console.error('Error fetching car details:', err.message);
      }
    },
    async insertTransaction() {
      this.isSubmitting = true; // Start submission process
      const car_ids = this.car.id;

      try {
        // Check if a transaction with the same car_id already exists
        const { data: existingTransaction, error: checkError } = await supabase
          .from('Transaction')
          .select('*')
          .eq('car_id', this.car.id)
          .eq('buyer_id', this.buyerId)
          .single();
          

   

        if (existingTransaction) {
          alert('Transaction already exists for this car!');
          return; // Exit if a transaction already exists
        }
        const buyer_ids = this.buyerId;
        const seller_ids = this.user.id;
        // Proceed to insert the transaction
        const { data, error } = await supabase
          .from('Transaction')
          .insert([
            {
              buyer_id: buyer_ids, // Assuming this is the logged-in user
              seller_id: seller_ids, // Seller's ID (from the car details)
              car_id: car_ids, // Car's ID
            },
          ]);

        if (error) throw error;

        alert('Transaction inserted successfully!');
      } catch (err) {
        console.error('Error inserting transaction:', err.message);
      } finally {
        this.isSubmitting = false; // End submission process
      }
    }
  },
};
</script>


<style scoped>
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 2rem;
  font-weight: bold;
}

ul.list-unstyled {
  padding-left: 0;
}

.car-detail-item {
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.user-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
