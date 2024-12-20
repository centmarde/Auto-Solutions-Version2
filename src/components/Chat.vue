<template>
  <br /><br /><br />
  <InsideNavbar />
  <v-container fluid>
    <v-row>
      <v-col lg="4" md="4" sm="12" cols="12">
        <Inbox />
      </v-col>
      <v-col lg="8" md="8" sm="12" cols="12">
        <v-card class="chat-card">
          <v-card-title class="chat-title">
            Chat with {{ isSupplier ? buyerName : supplierName }} about
            {{ carBrand }} {{ carModel }}
          </v-card-title>
          <v-card-text class="chat-messages">
            <v-list>
              <div class="messages-container">
                <v-list-item-group>
                  <v-list-item
                    v-for="(message, index) in messages"
                    :key="index"
                    :class="{
                      'buyer-message': message.senderName === userName,
                      'supplier-message': message.senderName !== userName,
                    }"
                  >
                    <v-list-item-content>
                      <v-list-item>
                        <v-list-item-icon>
                          <v-icon>{{
                            message.senderName === buyerName
                              ? "mdi mdi-face-agent"
                              : "mdi-account-circle"
                          }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title>
                            <span class="font-weight-bold"
                              >{{ message.senderName }}:</span
                            >
                          </v-list-item-title>
                          <span class="message-text">{{ message.text }}</span>
                          <v-list-item-subtitle
                            class="timestamp"
                            style="text-align: right; margin-top: 4px"
                          >
                            {{
                              new Date(message.created_at).toLocaleTimeString()
                            }}
                          </v-list-item-subtitle>
                        </v-list-item-content>
                      </v-list-item>
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
import { supabase } from "@/lib/supaBase";
import Inbox from "@/layouts/Inbox.vue";

export default {
  data() {
    return {
      isFetching: false,
      chatId: null,
      supplierName: "",
      buyerName: "",
      carBrand: "",
      carModel: "",
      input: "",
      messages: [],
      userName: "",
      isSupplier: false,
      allConversations: [], // Holds all fetched conversations
      selectedConversationId: null, // Currently selected conversation ID
    };
  },

  async created() {
    if (this.isFetching) return;
    this.isFetching = true;

    const sellerId = this.$route.query.seller_id;
    const carId = this.$route.query.car_id;
    const loggedInUserId = localStorage.getItem("user_id");

    if (sellerId && loggedInUserId) {
      try {
        // Fetch car details
        const { data: carData, error: carError } = await supabase
          .from("cars")
          .select("brand, model")
          .eq("id", carId)
          .single();

        if (carError) throw carError;
        this.carBrand = carData.brand;
        this.carModel = carData.model;

        // Fetch all conversations
        const { data: conversationData, error: conversationError } =
          await supabase
            .from("conversations")
            .select("id, buyer_id, supplier_id, created_at")
            .eq("car_id", carId)
            .or(
              `supplier_id.eq.${loggedInUserId},buyer_id.eq.${loggedInUserId}`
            );

        if (conversationError) throw conversationError;

        if (conversationData && conversationData.length > 0) {
          // Save all conversations for selection
          this.allConversations = conversationData;

          // Default to the latest conversation
          const latestConversation = conversationData.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          )[0];
          this.selectedConversationId = latestConversation.id;
          this.chatId = latestConversation.id;
          this.isSupplier = latestConversation.supplier_id === loggedInUserId;

          // Fetch names for buyer and supplier
          const { data: buyerData, error: buyerError } = await supabase
            .from("users")
            .select("user_name")
            .eq("id", latestConversation.buyer_id)
            .single();

          if (buyerError) throw buyerError;
          this.buyerName = buyerData.user_name;

          const { data: supplierData, error: supplierError } = await supabase
            .from("users")
            .select("user_name")
            .eq("id", latestConversation.supplier_id)
            .single();

          if (supplierError) throw supplierError;
          this.supplierName = supplierData.user_name;

          await this.fetchMessages();
          this.setupRealtimeSubscription();
        } else {
          console.warn("No conversation found for the given criteria.");
        }
      } catch (err) {
        console.error("Error during chat setup:", err);
      } finally {
        this.isFetching = false;
      }
    }
  },

  methods: {
    async fetchMessages() {
      try {
        const { data: messagesData, error: messagesError } = await supabase
          .from("messages")
          .select("message, user_id, created_at")
          .eq("conversation_id", this.chatId)
          .order("created_at", { ascending: true });

        if (messagesError) throw messagesError;

        this.messages = await Promise.all(
          messagesData.map(async (message) => {
            const senderId = message.user_id;

            const { data: senderData, error: senderError } = await supabase
              .from("users")
              .select("user_name")
              .eq("id", senderId)
              .single();

            if (senderError) throw senderError;

            return {
              senderName: senderData.user_name,
              text: message.message,
              created_at: message.created_at,
            };
          })
        );
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    },

    async sendMessage() {
      if (this.input.trim() && this.chatId) {
        try {
          const loggedInUserId = localStorage.getItem("user_id");

          const { error: messageError } = await supabase
            .from("messages")
            .insert([
              {
                conversation_id: this.chatId,
                message: this.input,
                user_id: loggedInUserId,
              },
            ]);

          if (messageError) throw messageError;

          this.messages.push({
            senderName: this.userName,
            text: this.input,
            created_at: new Date().toISOString(),
          });
          this.input = "";
        } catch (err) {
          console.error("Error sending message:", err);
        }
      }
    },

    async onConversationChange() {
      // Change the current conversation and reload messages
      this.chatId = this.selectedConversationId;
      await this.fetchMessages();
    },

    setupRealtimeSubscription() {
      const channel = supabase
        .channel("public:messages")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "messages" },
          (payload) => {
            if (payload.new.conversation_id === this.chatId) {
              this.fetchMessages();
            }
          }
        )
        .subscribe();
    },
  },
};
</script>

<script setup>
import InsideNavbar from "@/layouts/InsideNavbar.vue";
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
  max-height: 50vh;
  overflow-y: auto;
}
</style>
