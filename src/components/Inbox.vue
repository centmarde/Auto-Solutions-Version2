<template>
    <InsideNavbar />
    <br><br><br>
    <v-container>
      <v-card>
        <v-card-title>Chat</v-card-title>
        <v-card-text>
          <v-list>
            <v-list-item-group>
              <v-list-item v-for="(message, index) in messages" :key="index">
                <v-list-item-content>
                  <v-list-item-title :class="{'buyer-message': message.sender === 'Buyer', 'supplier-message': message.sender === 'Supplier'}">
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
          ></v-text-field>
          <v-btn @click="sendMessage" color="primary">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script>

  export default {
    data() {
      return {
        input: '',
        messages: [],
      };
    },
    methods: {
      sendMessage() {
        if (this.input.trim()) {
          this.messages.push({ sender: 'Buyer', text: this.input });
          this.input = '';
  
          // Simulate a response from Supplier
          setTimeout(() => {
            this.messages.push({ sender: 'Supplier', text: 'This is a response from Supplier.' });
          }, 1000);
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
  