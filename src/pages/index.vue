<template>
  <v-app>
    <!-- Main page content -->
    <v-main v-if="loaded">
      <Navbar />
      <Scroller />
      <Topcontents />

      <v-container fluid id="ygar">
        <v-row>
          <v-col>
            <Yourgarage />
            <Popularcars />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" lg="6" md="6" sm="12">
            <Sellcar />
          </v-col>
          <v-col cols="12" lg="6" md="6" sm="12">
            <Researchcar />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <Carsearch />
          </v-col>
        </v-row>
        <br><br>
        <Footer />
      </v-container>

      <!-- Scroll Down Awareness Indicator -->
      <ScrollAwareness />
    </v-main>

    <!-- Loader Overlay -->
    <div class="loader-overlay" :class="{ 'fade-out': loaded }">
      <IntroLoader />
      <!-- Optional skip button -->
      <v-btn class="skip-btn" @click="skipLoader">Skip</v-btn>
    </div>
  </v-app>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Topcontents from '@/components/Topcontents.vue';
import Carsearch from '@/layouts/Carsearch.vue';
import Footer from '@/layouts/Footer.vue';
import Popularcars from '@/layouts/Popularcars.vue';
import Researchcar from '@/layouts/Researchcar.vue';
import Sellcar from '@/layouts/Sellcar.vue';
import Yourgarage from '@/layouts/Yourgarage.vue';
import IntroLoader from '@/layouts/Loader.vue';
import Scroller from '@/layouts/ScrollAwareness.vue';
import ScrollAwareness from '@/layouts/ScrollAwareness.vue'; // Import your new component

const loaded = ref(false); 

const skipLoader = () => {
  loaded.value = true; 
};

onMounted(() => {
  setTimeout(() => {
    loaded.value = true;
  }, 10000); 
});
</script>

<style scoped>
#ygar {
  background-color: #151515;
  position: relative;
}

.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(21, 21, 21, 0.9); /* Dark semi-transparent overlay */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Ensure it's on top of all content */
  transition: opacity 0.5s ease-in-out;
}

.loader-overlay.fade-out {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease-in-out, visibility 0s 0.5s; /* Visibility hidden after fade-out */
}

.skip-btn {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #151515; /* Adjust color as needed */
  color: white;
}

.scroll-awareness {
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  transition: opacity 0.5s ease;
  opacity: 1;
}
</style>
