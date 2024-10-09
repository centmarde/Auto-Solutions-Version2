<template>
  <v-card>
    <v-card-title><v-icon class="mx-2">mdi-message-outline</v-icon>User Inbox</v-card-title>
    <v-card-text>
      <v-list v-if="conversations.length > 0">
        <v-list-item-group>
          <v-list-item
            v-for="conversation in conversations"
            :key="conversation.id"
            @click="openConversation(conversation.supplier_id, conversation.car_id,conversation.buyer_id)"
          >
            <v-img 
              :src="conversation.user_picture || '/default-avatar.png'" 
              class="rounded-circle" 
              style="width: 3rem; height: 3rem; object-fit: cover; border: 2px solid white; border-radius: 50%;"
            />
            <v-list-item-content>
              <v-list-item-avatar />
             

              <v-list-item-title>{{ conversation.username }}</v-list-item-title>
              <v-list-item-subtitle>
  <v-icon>mdi-car</v-icon>
  Car: {{ conversation.car_brand }} - {{ conversation.car_model }}
</v-list-item-subtitle>

              <v-list-item-subtitle>
                <strong>Latest Message:</strong> 
                {{ conversation.latestMessage.message || 'No messages yet' }}
                <br />
                <small>{{ conversation.latestMessage.created_at ? new Date(conversation.latestMessage.created_at).toLocaleString() : '' }}</small>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <!-- Temporary UI when there are no messages -->
      <div v-else class="empty-state">
        <v-icon large color="grey lighten-1">mdi-message-outline</v-icon>
        <p>No messages yet</p>
        <router-link to="/Home">
  <v-btn color="primary">
    Browse Cars
  </v-btn>
</router-link>


      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { supabase } from '@/lib/supaBase';

export default {
  data() {
    return {
      conversations: [] // List of conversations for the user
    };
  },
  async created() {
    const userId = localStorage.getItem('user_id');
    if (userId) {
      await this.fetchConversations(userId);
    }
  },
  methods: {
    async fetchConversations(loggedInUserId) {
  try {
    const { data, error } = await supabase
      .from('Conversation')
      .select(`
        id, car_id, supplier_id, buyer_id,
        Car (brand, model),
        Messages (message, created_at, user_id),
        buyer:buyer_id (username, img),
        supplier:supplier_id (username, img)
      `)
      .or(`buyer_id.eq.${loggedInUserId},supplier_id.eq.${loggedInUserId}`)
      // .neq('supplier_id', loggedInUserId);

    if (error) {
      console.error('Error fetching conversations:', error);
      return;
    }

    console.log('Fetched conversations:', data); // Log fetched data

    const uniqueConversations = [];

    data.forEach(conversation => {
      const latestMessage = conversation.Messages.length > 0 ? conversation.Messages[conversation.Messages.length - 1] : null;

      
      if (latestMessage) {
        const isBuyer = conversation.buyer_id === loggedInUserId;
        const otherUser = isBuyer ? conversation.supplier : conversation.buyer;

        uniqueConversations.push({
          id: conversation.id,
          car_model: conversation.Car?.model || 'Unknown Model',
          car_brand: conversation.Car?.brand || 'Unknown Brand',
          username: otherUser?.username || 'Unknown User',
          user_picture: otherUser?.img || '/default-avatar.png',
          latestMessage: {
            message: latestMessage.message || 'No messages',
            created_at: latestMessage.created_at || ''
          },
          supplier_id: conversation.supplier_id,
          car_id: conversation.car_id,
          buyer_id: conversation.buyer_id // Include buyer_id for reference
        });
      }
    });

    this.conversations = uniqueConversations;
  } catch (error) {
    console.error('Error fetching inbox conversations:', error);
  }
},


    async openConversation(sellerId, carId, buyerId) {
  try {
    // Fetch the existing conversation
    const { data: conversationData, error: conversationError } = await supabase
      .from('Conversation')
      .select('id')
      .eq('supplier_id', sellerId)
      .eq('car_id', carId)
      .eq('buyer_id', buyerId)
      .single();

    if (conversationError) throw conversationError;

    if (conversationData) {
      const existingChatId = conversationData.id;
      const newUrl = `/Chat?seller_id=${sellerId}&car_id=${carId}&buyer_id=${buyerId}&chat_id=${existingChatId}`;
      window.location.href = newUrl;
    } else {
      alert('No existing conversation found for this seller and car.');
    }
  } catch (err) {
    console.error('Error fetching conversation:', err);
  }
},


    browseCars() {
      this.$router.push('/cars'); // Adjust this based on your routes
    }
  }
};
</script>


<style scoped>
.v-card {
  max-width: 600px;
  margin: auto;
}
.v-list-item-avatar {
  margin-right: 16px;
}
.rounded-circle {
  border-radius: 50%;
}
.empty-state {
  text-align: center;
  padding: 40px;
  color: grey;
}
.empty-state p {
  margin: 20px 0;
  font-size: 18px;
}
</style>
