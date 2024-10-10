<template>
  <v-app>
    <!-- Main page content -->
    <v-main v-if="loaded">
      <Navbar />
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

      <Ai v-if="!hideAi" />
    </v-main>

    <!-- Loader Overlay -->
    <div class="loader-overlay" v-if="!loaded">
      <IntroLoader />
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
import Ai from '@/layouts/Ai.vue';
import IntroLoader from '@/layouts/Loader.vue'; // Import the loader

const hideAi = ref(true); // Set this to true to hide the AI component
const loaded = ref(false); // Used to track when to hide the loader

onMounted(() => {
  // Simulate a loader delay before showing the main app content
  setTimeout(() => {
    loaded.value = true;
  }, 10000); // 10 seconds delay
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
}
</style>
