<template>
  <InsideNavbar />
  <br /><br /><br />
  <v-container fluid>
    <v-row>
      <v-col lg="4" md="4" sm="12" cols="12">
        <Inbox />
    </v-col>
    <v-col lg="8" md="8" sm="12" cols="12">
      <v-card>
      <v-card-title>
        Chat with {{ username }} about {{ carBrand }} {{ carModel }}
      </v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <v-list-item v-for="(message, index) in messages" :key="index">
              <v-list-item-content>
                <v-list-item-title
                  :class="{'buyer-message': message.sender === 'Buyer', 'supplier-message': message.sender === 'Supplier'}"
                >
                  {{ message.sender }}: {{ message.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-text-field
          v-model="input"
          label="Type your message"
          @keyup.enter="sendMessage"
          outlined
          clearable
        ></v-text-field>
        <v-btn @click="sendMessage" color="primary">Send</v-btn>
      </v-card-actions>
    </v-card>
    </v-col>
    </v-row>
   
  </v-container>
</template>


<script>
import { supabase } from '@/lib/supaBase';
import Inbox from '@/layouts/Inbox.vue';


export default {
  data() {
    return {
      isFetching: false, // Flag to prevent multiple fetches
      chatId: null,
      username: '',
      carBrand: '',
      carModel: '',
      messages: []
    };
  },
  async created() {
    if (this.isFetching) return; // Prevent fetching if already in progress

    this.isFetching = true;
    const sellerId = this.$route.query.seller_id;
    const carId = this.$route.query.car_id;
    const loggedInUserId = localStorage.getItem('user_id');

    if (sellerId && loggedInUserId) {
      try {
        // Fetch seller's username
        const { data: userData, error: userError } = await supabase
          .from('User')
          .select('username')
          .eq('id', sellerId)
          .single();

        if (userError) throw userError;
        this.username = userData.username;

        // Fetch car brand and model
        const { data: carData, error: carError } = await supabase
          .from('Car')
          .select('brand, model')
          .eq('id', carId)
          .single();

        if (carError) throw carError;
        this.carBrand = carData.brand;
        this.carModel = carData.model;

        // Check if a chat already exists
        const { data: chatData, error: chatError } = await supabase
          .from('Conversation')
          .select('id')
          .eq('user_id', loggedInUserId)
          .eq('car_id', carId)
          .maybeSingle();

        if (chatError) throw chatError;

        if (chatData) {
          this.chatId = chatData.id;
          await this.fetchMessages(); // Fetch messages if chat exists
        } else {
          // Create a new chat if none exists
          const { data: newChatData, error: newChatError } = await supabase
            .from('Conversation')
            .insert([{ user_id: loggedInUserId, car_id: carId }])
            .select()
            .single();

          if (newChatError) throw newChatError;
          this.chatId = newChatData.id;

          // Insert initial message
          const initialMessage = 'has initiated a chat';
          const { error: inboxError } = await supabase
            .from('Messages')
            .insert([{ conversation_id: this.chatId, message: initialMessage, user_id: loggedInUserId }]);

          if (inboxError) throw inboxError;

          this.messages.push({ sender: 'System', text: initialMessage });
        }
      } catch (err) {
        console.error('Error during chat setup:', err);
      } finally {
        this.isFetching = false; // Reset the flag after fetch
      }
    }
  },


  methods: {
    async fetchMessages() {
      try {
        const { data: messagesData, error: messagesError } = await supabase
          .from('Messages')
          .select('message, user_id, created_at')
          .eq('conversation_id', this.chatId)
          .order('created_at', { ascending: true });

        if (messagesError) throw messagesError;

        // Map messages to include sender name
        this.messages = await Promise.all(messagesData.map(async (message) => {
          const { data: userData, error: userError } = await supabase
            .from('User')
            .select('username')
            .eq('id', message.user_id)
            .single();
          
          if (userError) throw userError;
          return { sender: userData.username, text: message.message };
        }));
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    },

    async sendMessage() {
      if (this.input.trim() && this.chatId) {
        try {
          const loggedInUserId = localStorage.getItem('user_id');

        
          const { error: messageError } = await supabase
            .from('Messages')
            .insert([{ conversation_id: this.chatId, message: this.input, user_id: loggedInUserId }]);

          if (messageError) throw messageError;

        
          this.messages.push({ sender: 'Buyer', text: this.input });
          this.input = '';

          // Simulate a response from the supplier
        
        } catch (err) {
          console.error('Error sending message:', err);
        }
      }
    },
  },
};
</script>

<script setup>
import InsideNavbar from '@/layouts/InsideNavbar.vue';
</script>

<style scoped>
.buyer-message {
  background-color: #151515;
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
}

.supplier-message {
  background-color: #151515;
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
}
</style>
