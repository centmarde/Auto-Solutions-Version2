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
                <!-- Chat with supplier -->
                <v-row v-if="user.username" class="car-detail-item d-flex justify-end">
                  <div class="chat-container" @click="chatWithSupplier(user.id, car.id)">
                    <v-icon left>mdi-chat</v-icon>
                    <span class="chat-text">
                      Chat with {{ user.username }}
                    </span>
                    <v-avatar size="40" class="ml-2">
                      <v-img :src="user.img" alt="User Image"></v-img>
                    </v-avatar>
                  </div>
                </v-row>
                <v-divider></v-divider>
              </v-card-text>
              <v-col class="bm-3 text-center mx-auto mb-4 d-flex justify-center">
                <router-link style="text-decoration: none;" to="/Home" exact>
                  <v-btn  class="lofi2 mx-3" outlined color="primary">
                    <span >Exit</span>
                    <v-icon>mdi-arrow-right</v-icon>
                  </v-btn>
                </router-link>
                <!-- Insert Transaction Button -->
                <v-btn class="lofi interested" @click="openConfirmationDialog">
                  <span>Interested</span>
                  <v-icon>mdi-arrow-right</v-icon>
                </v-btn>
              </v-col>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Confirmation Dialog -->
    <v-dialog v-model="isDialogVisible" max-width="500px">
      <v-card>
        <v-card-title class="headline">Are you sure?</v-card-title>
        <v-card-text>
          You are about to express interest in this car. Please be aware of the following:
          <ul>
            <li>This is not a final purchase or final rent, <br> but try to contact the supplier of the mentioned car.</li>
            <li>Make sure to review the car's details before proceeding.</li>
            <li>By proceeding, you agree to our terms and conditions.</li>
            <li>Any false information may lead to disqualification.</li>
          </ul>
          Do you wish to continue?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="isDialogVisible = false">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="confirmTransaction">Continue</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      isSubmitting: false, 
      isDialogVisible: false, // For confirmation dialog
      buyerId: localStorage.getItem("user_id"), 
    };
  },
  computed: {
    carDetails() {
      return {
        Year: this.car.year,
        Price: `php${this.car.price}`,
        Mileage: this.car.mileage,
        Engine: this.car.engine,
        Horsepower: `${this.car.horse_power} HP`,
        Torque: `${this.car.torque} Nm`,
        TopSpeed: `${this.car.top_speed} km/h`,
        Transmission: this.car.transmission,
        YearsOwned: this.car.years_owned,
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
          .from('cars')
          .select('*, users(*)')
          .eq('id', id)
          .single();

        if (error) throw error;

        this.car = data;
        this.user = data.users;
      } catch (err) {
        console.error('Error fetching car details:', err.message);
      }
    },
    
    // Open the confirmation dialog
    openConfirmationDialog() {
      this.isDialogVisible = true;
    },

    // Confirm and insert the transaction
    async confirmTransaction() {
      this.isDialogVisible = false; // Close the dialog
      this.isSubmitting = true; // Start submission process
      const car_ids = this.car.id;

      try {
        // Check for existing transaction
        const { data: existingTransaction } = await supabase
          .from('transactions')
          .select('*')
          .eq('car_id', this.car.id)
          .eq('buyer_id', this.buyerId)
          .single();

        if (existingTransaction) {
          alert('Transaction already exists for this car!');
          return;
        }

        const buyer_ids = this.buyerId;
        const seller_ids = this.user.id;

        // Insert transaction
        const { error } = await supabase
          .from('transactions')
          .insert([
            {
              buyer_id: buyer_ids,
              seller_id: seller_ids,
              car_id: car_ids,
            },
          ]);

        if (error) throw error;

        alert('Transaction inserted successfully!');
        this.$router.push('/Inquires');
      } catch (err) {
        console.error('Error inserting transaction:', err.message);
      } finally {
        this.isSubmitting = false;
      }
    },
    
    // Chat with supplier method
    async chatWithSupplier(sellerId, carId) {
      try {
        const loggedInUserId = localStorage.getItem('user_id');
        if (!loggedInUserId) {
          throw new Error('User is not logged in');
        }

        const isBuyer = loggedInUserId !== sellerId;

        const { data: conversationData, error: conversationError } = await supabase
          .from('conversations')
          .select('id')
          .eq('buyer_id', isBuyer ? loggedInUserId : sellerId)
          .eq('supplier_id', isBuyer ? sellerId : loggedInUserId)
          .eq('car_id', carId);

        if (conversationError) throw conversationError;

        if (conversationData && conversationData.length > 0) {
          const chatId = conversationData[0].id;
          this.$router.push({ path: '/Chat', query: { chat_id: chatId, seller_id: sellerId, car_id: carId } });
        } else {
          const { data: newConversationData, error: newConversationError } = await supabase
            .from('conversations')
            .insert([{ buyer_id: isBuyer ? loggedInUserId : null, supplier_id: sellerId, car_id: carId }])
            .select();

          if (newConversationError) throw newConversationError;

          const newChatId = newConversationData[0].id;
          this.$router.push({ path: '/Chat', query: { chat_id: newChatId, seller_id: sellerId, car_id: carId } });
        }
      } catch (err) {
        console.error('Error starting chat:', err);
      }
    },
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
.chat-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding: 10px;
  border-radius: 10px;
}

.chat-container:hover {
  background-color: #919191; /* Light gray background on hover */
}

.chat-text {
  color: #EEEEEE;
  text-decoration: underline;
  margin-left: 5px;
  font-weight: bold;
}

.chat-container:hover .chat-text {
  text-decoration: none; /* Remove underline on hover */
}

.lofi2 {
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  padding-block: 0.5rem;
  padding-inline: 1.25rem;
  background-color: rgb(97, 40, 255);
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffff;
  gap: 10px;
  font-weight: bold;
  border: 3px solid #ffffff4d;
  outline: none;
  overflow: hidden;
  font-size: 15px;
  cursor: pointer;
  text-decoration: none;
}
.lofi {
  background-color:rgb(97, 40, 255);
  color: white;
}

.lofi:hover {
  background-color: rgb(97, 40, 255);
}

.lofihover {
  transform: scale(1.05);
  border-color: #fff9;
}

.lofi2:hover .icon {
  transform: translate(4px);
}

.lofi2:hover::before {
  animation: shine 1.5s ease-out infinite;
}

.lofi2::before {
  content: "";
  position: absolute;
  width: 100px;
  height: 100%;
  background-image: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0) 30%,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0) 70%
  );
  top: 0;
  left: -100px;
  opacity: 0.6;
}
</style>
