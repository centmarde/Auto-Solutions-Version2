<template>
  <v-card>
    <div class="text-center mt-5"><h1>Features</h1></div>
    <p class="text-center">2024 GR SUPRA</p>
    <v-tabs v-model="activeTab">
      <v-row>
        <v-col class="d-flex justify-content-center">
          <v-tab>Performance</v-tab>
          <v-tab>Handling</v-tab>
          <v-tab>45th Anniversary Edition</v-tab>
          <v-tab>Exterior</v-tab>
          <v-tab>Interior</v-tab>
          <v-tab>Technology</v-tab>
          <v-tab>Safety & Convenience</v-tab></v-col
        >
      </v-row>
    </v-tabs>

    <v-tabs-items v-model="activeTab">
      <v-tab-item v-for="(component, index) in components" :key="index">
        <component :is="component" v-if="activeTab === index"></component>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import PerformancePage from "./PerformancePage.vue";
import HandlingPage from "./HandlingPage.vue";
import AnniversaryPage from "./AnniversaryPage.vue";
import ExteriorPage from "./ExteriorPage.vue";
import InteriorPage from "./InteriorPage.vue";
import TechnologyPage from "./TechnologyPage.vue";
// import SafetyPage from "./SafetyPage.vue";

export default {
  data() {
    return {
      activeTab: 0, // Default to Performance tab
      components: [
        PerformancePage,
        HandlingPage,
        AnniversaryPage,
        ExteriorPage,
        InteriorPage,
        TechnologyPage,
        // SafetyPage,
      ],
    };
  },
};
</script>

<style scoped></style>
