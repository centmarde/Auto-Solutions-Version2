<template>
  <v-app>
    <br><br><br>
    <Nav />
    <v-spacer height="100"></v-spacer>
    
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-card elevation="8">
            
              <SellCarInside />
           
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card elevation="8">
            
              <CarRental />
           
          </v-card>
        </v-col>

        <v-col cols="12" md="4">
          <v-card elevation="8">
            
            <Garage />
           
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
      <FeaturedCar />
    </v-container>
    
    <v-divider></v-divider>
    
    <v-container>
      <v-row>
        <v-col>
          <CarsForSale />
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row>
        <v-col>
          <CarsForRent />
        </v-col>
      </v-row>
    </v-container>
    
    <Footer />
  </v-app>
</template>

<script setup>
import { doLogout } from "../lib/supaBase";
import Nav from '../layouts/InsideNavbar.vue';
import FeaturedCar from '../layouts/FeaturedCar.vue';
import CarsForSale from "../layouts/CarsForSale.vue";
import CarRental from "../layouts/CarRental.vue";
import Footer from '../layouts/Footer.vue';
import SellCarInside from "@/layouts/SellCarInside.vue";
import CarsForRent from "../layouts/CarsForRent.vue";
import Garage from "../layouts/GarageOuter.vue";
import Compare from "../layouts/Compare.vue";

const logout = async () => {
  await doLogout();
};
</script>
