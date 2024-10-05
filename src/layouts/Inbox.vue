<template>
    <v-card>
      <v-card-title>User Inbox</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item-group>
            <v-list-item
              v-for="participant in participants"
              :key="participant.id"
              @click="openConversation(participant.User.id, participant.Conversation.car_id)"
            >
              <v-img 
                :src="participant.user_picture || '/default-avatar.png'" 
                class="rounded-circle" 
                style="width: 3rem; height: 3rem; object-fit: cover; border: 2px solid white; border-radius: 50%;"
              />
              <v-list-item-content>
                <v-list-item-avatar />
                <v-list-item-title>{{ participant.username }}</v-list-item-title>
                <v-list-item-subtitle>
                  Car: {{ participant.car_brand }} - {{ participant.car_model }}
                </v-list-item-subtitle>
                <v-list-item-subtitle>
                  <!-- Loop through each message and display individually -->
                  <div v-for="message in participant.messages" :key="message.created_at">
                    <strong>Message:</strong> {{ message.message }} <br />
                    <small>{{ new Date(message.created_at).toLocaleString() }}</small>
                  </div>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </template>
  
  
  
  <script>
  import { supabase } from '@/lib/supaBase';
  
  const loggedInUserId = localStorage.getItem('user_id');
  
  export default {
    data() {
      return {
        participants: []
      };
    },
    async created() {
      const userId = loggedInUserId;
      await this.fetchParticipants(userId);
    },
    methods: {
  async fetchParticipants(userId) {
    const { data, error } = await supabase
      .from('Participants')
      .select(`
        *,
        Conversation (
          *,
          Messages (*),
          Car (*)
        ),
        User (*)
      `)
      .neq('user_id', userId)
      .eq('supplier_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching participants:', error);
    } else {
      // Remove duplicates based on 'conversation_id'
      const uniqueParticipants = [];
      const conversationIds = new Set();

      data.forEach(participant => {
        if (!conversationIds.has(participant.Conversation?.id)) {
          conversationIds.add(participant.Conversation?.id);

          const messages = participant.Conversation?.Messages || [];
          
          uniqueParticipants.push({
            ...participant,
            car_model: participant.Conversation?.Car?.model || 'Unknown Model', 
            car_brand: participant.Conversation?.Car?.brand || 'Unknown Brand',
            username: participant.User?.username || 'Unknown User',
            user_picture: participant.User?.img || '/default-avatar.png',
            messages: messages.map(msg => ({
              message: msg.message,
              created_at: msg.created_at
            }))
          });
        }
      });

      this.participants = uniqueParticipants;
    }
  },
  openConversation(sellerId, carId) {
    const newUrl = `/Chat?seller_id=${sellerId}&car_id=${carId}`;
    window.location.href = newUrl;
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
    margin-right: 16px; /* Adjust spacing as needed */
  }
  </style>
  