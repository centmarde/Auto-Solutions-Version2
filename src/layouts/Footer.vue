<template>
    <section id="footer" color="grey darken-4" app>
      <v-container fluid>
        <v-row>
          <v-col cols="12" md="6">
            <!-- Quick Links example -->
            <h3 class="white--text">Terms & Conditions</h3>
            <v-list>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-phone</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Input</v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-icon>
                  <v-icon>mdi-email</v-icon>
                </v-list-item-icon>
                <v-list-item-content>Input</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-col>
          
          <v-col cols="12" md="6">
            <!-- Social Links example -->
            <h3 class="white--text">Connect With Us</h3>
            <div class="social-links">
              <v-btn icon :href="'https://github.com/Centmarde'" target="_blank">
                <v-icon>mdi-github</v-icon>
              </v-btn>
              <v-btn icon :href="'https://web.facebook.com/centmarde.campado'" target="_blank" class="ms-3">
                
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row>
          <v-col class="text-center">
            <!-- Copyright notice example -->
            <p class="white--text">&copy; 2024 Auto Solutions. All rights reserved.</p>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </template>
  
  <script setup>
  </script>
  
  <style scoped>
  
  </style>
  