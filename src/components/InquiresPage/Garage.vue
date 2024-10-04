<template>
    <div>
      <InquiresNavbar />
      <br><br><br><br>
      <v-container fluid>
        <v-card class="p-3 vh-80 d-flex flex-column">
          <v-row class="fill-height">
            <v-col cols="12" md="4">
  <router-link to="/RentedCars" class="d-block mb-3">
                           <v-btn block color="primary">Rented Car</v-btn>
  </router-link>
  <router-link to="/Garage" class="d-block mb-3">
    <v-btn block color="primary">Garage</v-btn>
  </router-link>
  <router-link to="/Inquires" class="d-block mb-3">
    <v-btn block color="primary">Buy Car</v-btn>
  </router-link>
  <router-link to="/CarListing" class="d-block mb-3">
    <v-btn block color="primary">My Listings</v-btn>
  </router-link>
  <router-link to="/Home" class="d-block mb-3">
    <v-btn block color="primary">Home</v-btn>
  </router-link>
 
</v-col>

  
            <v-col cols="12" md="8" class="scrollable-col">
              <InsideGarage />
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </div>
  </template>
  
  <script setup>
  import InquiresNavbar from '../../layouts/InquiresNavbar.vue';
  </script>
  
  <style>
  .vh-80 {
    height:80vh;
  }
  
  .scrollable-col {
    overflow-y: auto;
    max-height: 100%;
  }
  .d-block{
    text-decoration: none;
  }
  </style>
  