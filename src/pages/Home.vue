<template>
  <br /><br /><br />
  <v-app>
    <Ai v-if="!$route.meta.hideAi" />

    <Nav />

    <v-spacer height="100"></v-spacer>
    <div class="text-center mt-5"><h1>Featured Car</h1></div>
    <p class="text-center">2024 GR SUPRA</p>
    <FeaturedCar />

   
    <v-divider></v-divider>

    <v-container>
      <v-row>
        <v-col cols="12" md="6" lg="3">
          <v-card elevation="8">
            <SellCarInside />
          </v-card>
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <v-card elevation="8">
            <CarRental />
          </v-card>
        </v-col>

        <v-col cols="12" md="6" lg="3">
          <v-card elevation="8">
            <Garage />
          </v-card>
        </v-col>
        <v-col cols="12" md="6" lg="3">
          <v-card elevation="8">
            <LoanCarOuter />
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <Compare />
        </v-col>
      </v-row>
    </v-container>

    <v-divider></v-divider>

    <v-container>
      <v-row>
        <v-col>
          <CarsForSale />
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>

    <v-container>
      <v-row>
        <v-col>
          <CarsForRent />
        </v-col>
      </v-row>
    </v-container>
  <div class="pb-2 border-top">
    <h1 class="text-center fw-bolder pt-5">Find us here! </h1>
    <v-container>
      <div id="map"></div> 
    </v-container>
  </div>
    <Footer />
  </v-app>
</template>

<script setup>
import 'leaflet/dist/leaflet.css'; 
import L from 'leaflet';
import { onMounted } from 'vue';
import { doLogout } from "../lib/supaBase";
import Nav from "../layouts/InsideNavbar.vue";
import FeaturedCar from "../layouts/FeaturedCar.vue";
import CarsForSale from "../layouts/CarsForSale.vue";
import CarRental from "../layouts/CarRental.vue";
import Footer from "../layouts/Footer.vue";
import SellCarInside from "@/layouts/SellCarInside.vue";
import CarsForRent from "../layouts/CarsForRent.vue";
import Garage from "../layouts/GarageOuter.vue";
import Compare from "../layouts/Compare.vue";
import Ai from "../layouts/Ai.vue";
import LoanCarOuter from "@/layouts/LoanCarOuter.vue";
import MainComponent from "../components/NavigationBar/MainComponent.vue";

const logout = async () => {
  await doLogout();
};

onMounted(() => {
  //  location of CSU badi atik2 sa auto-sol
  let map = L.map('map').setView([8.956213, 125.597562], 13); // Latitude and Longitude Sa CSU

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.marker([8.956213, 125.597562]).addTo(map) 
    .bindPopup('Auto Solutions')
    .openPopup();
});
</script>
<style>
 #map{
  height: 500px;
 }
</style>
