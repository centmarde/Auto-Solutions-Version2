<template>
  <br><br><br>
  <InsideNavbar />
  <v-container fluid>
    <v-row>
      <v-col lg="4" md="4" sm="12" cols="12">
        <Inbox />
      </v-col>
      <v-col lg="8" md="8" sm="12" cols="12">
        <v-card class="chat-card">
          <v-card-title class="chat-title">
            Chat with {{ isSupplier ? buyerName : supplierName }} about {{ carBrand }} {{ carModel }}
          </v-card-title>
          <v-card-text class="chat-messages">
            <v-list>
              <div class="messages-container">
                <v-list-item-group>
                  <v-list-item
                    v-for="(message, index) in messages"
                    :key="index"
                    :class="{'buyer-message': message.senderName === userName, 'supplier-message': message.senderName !== userName}"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        <span>{{ message.senderName }}:</span>
                        <span class="message-text">{{ message.text }}</span>
                        <span class="timestamp">{{ new Date(message.created_at).toLocaleTimeString() }}</span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </div>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-text-field
              v-model="input"
              label="Type your message"
              @keyup.enter="sendMessage"
              outlined
              clearable
              class="message-input"
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
      isFetching: false,
      chatId: null,
      supplierName: '',
      buyerName: '',
      carBrand: '',
      carModel: '',
      input: '',
      messages: [],
      userName: '',
      isSupplier: false,
    };
  },

  async created() {
    if (this.isFetching) return;
    this.isFetching = true;

    const sellerId = this.$route.query.seller_id;
    const carId = this.$route.query.car_id;
    const loggedInUserId = localStorage.getItem('user_id');

    if (sellerId && loggedInUserId) {
      try {
        const { data: carData, error: carError } = await supabase
          .from('Car')
          .select('brand, model')
          .eq('id', carId)
          .single();

        if (carError) throw carError;
        this.carBrand = carData.brand;
        this.carModel = carData.model;

        const { data: conversationData, error: conversationError } = await supabase
          .from('Conversation')
          .select('id, buyer_id, supplier_id')
          .eq('car_id', carId)
          .or(`supplier_id.eq.${loggedInUserId},buyer_id.eq.${loggedInUserId}`)
          .maybeSingle();

        if (conversationError) throw conversationError;

        if (conversationData) {
          this.chatId = conversationData.id;

          // Determine if the logged-in user is the supplier or buyer
          this.isSupplier = conversationData.supplier_id == loggedInUserId;

          // Fetch usernames based on buyer_id and supplier_id
          const { data: buyerData, error: buyerError } = await supabase
            .from('User')
            .select('username')
            .eq('id', conversationData.buyer_id)
            .single();

          if (buyerError) throw buyerError;
          this.buyerName = buyerData.username;

          const { data: supplierData, error: supplierError } = await supabase
            .from('User')
            .select('username')
            .eq('id', conversationData.supplier_id)
            .single();

          if (supplierError) throw supplierError;
          this.supplierName = supplierData.username;

          await this.fetchMessages();
          this.setupRealtimeSubscription(); // Setup real-time subscription
        }
      } catch (err) {
        console.error('Error during chat setup:', err);
      } finally {
        this.isFetching = false;
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

        this.messages = await Promise.all(messagesData.map(async (message) => {
          const senderId = message.user_id;

          const { data: senderData, error: senderError } = await supabase
            .from('User')
            .select('username')
            .eq('id', senderId)
            .single();

          if (senderError) throw senderError;

          return {
            senderName: senderData.username,
            text: message.message,
            created_at: message.created_at,
          };
        }));
      } catch (err) {
        console.error('Error fetching messages:', err);
      }
    },

    async sendMessage() {
      if (this.input.trim() && this.chatId) {
        try {
          const loggedInUserId = localStorage.getItem('user_id');

          const { data, error: messageError } = await supabase
            .from('Messages')
            .insert([{ conversation_id: this.chatId, message: this.input, user_id: loggedInUserId }]);

          if (messageError) throw messageError;

          this.messages.push({ senderName: this.userName, text: this.input, created_at: new Date().toISOString() });
          this.input = '';
        } catch (err) {
          console.error('Error sending message:', err);
        }
      }
    },

    setupRealtimeSubscription() {
      const channel = supabase
        .channel('public:messages')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'Messages' }, (payload) => {
          if (payload.new.conversation_id === this.chatId) {
            this.fetchMessages(); 
          }
        })
        .subscribe();
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
.messages-container {
  max-height: 400px; /* Adjust the height as needed */
  overflow-y: auto;
}

</style>
