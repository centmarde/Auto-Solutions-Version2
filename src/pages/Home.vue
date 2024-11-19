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

    <v-sheet
      :class="isDark ? 'bg-grey-darken-4' : 'bg-grey-lighten-1'"
      elevation="8"
      fluid
    >
      <CarsForSale />
    </v-sheet>
    <v-divider></v-divider>

    <v-container>
      <v-row>
        <v-col>
          <CarsForRent />
        </v-col>
      </v-row>
    </v-container>
    <v-sheet
      :class="isDark ? 'bg-grey-darken-4' : 'bg-grey-lighten-1'"
      elevation="8"
      fluid
    >
      <div class="pb-2 border-top">
        <h1 class="text-center fw-bolder pt-5">Find us here!</h1>
        <v-container>
          <v-sheet elevation="10">
            <div id="map" class="z-3"></div>
          </v-sheet>
        </v-container>
      </div>
    </v-sheet>
    <Footer />
  </v-app>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { ref, onMounted, watch } from "vue";
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
import { useTheme } from "vuetify";

const theme = useTheme();
const isDark = ref(theme.global.current.value.dark);

// Watch theme changes and update `isDark`
watch(
  () => theme.global.name.value,
  (newTheme) => {
    isDark.value = newTheme === "dark";
  }
);

// Initialize the theme and map
onMounted(() => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  theme.global.name.value = savedTheme; // Set theme
  isDark.value = savedTheme === "dark"; // Update reactive theme variable

  // Initialize map
  const map = L.map("map").setView([8.956213, 125.597562], 13); // Location: CSU
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([8.956213, 125.597562])
    .addTo(map)
    .bindPopup("Auto Solutions")
    .openPopup();
});

const logout = async () => {
  await doLogout();
};
</script>

<style>
#map {
  height: 500px;
}
.v-container {
  transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transitions */
}
</style>
