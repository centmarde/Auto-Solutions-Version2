<template>
  <br /><br /><br />
  <v-container fluid>
    <Nav />
    <v-card>
      <div class="text-center mt-5"><h1>Features</h1></div>
      <p class="text-center">2024 GR SUPRA</p>
      <v-tabs v-model="activeTab">
        <v-row>
          <v-col class="d-flex justify-content-center">
            <v-tab>Performance</v-tab>
            <v-tab>Handling</v-tab>
          </v-col>
        </v-row>
      </v-tabs>
      <v-tabs-items v-model="activeTab">
        <v-tab-item v-for="(component, index) in components" :key="index">
          <component :is="component" v-if="activeTab === index"></component>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
  <v-container cols="12" md="4" class="d-flex justify-center">
    <a
      href="https://www.toyota.com/southeasttoyota/deals-incentives/financial-estimates-supra/?vehicles=supra"
      target="_blank"
      rel="noopener noreferrer"
      class="tr"
    >
      <v-btn color="border" class="border">
        Interested
        <v-icon right>mdi-arrow-right</v-icon>
      </v-btn>
    </a>
  </v-container>
</template>

<script>
import PerformancePage from "./PerformancePage.vue";
import HandlingPage from "./HandlingPage.vue";
import AnniversaryPage from "./AnniversaryPage.vue";
import Nav from "../../layouts/InsideNavbar.vue";

export default {
  components: {
    Nav,
    PerformancePage,
    HandlingPage,
    AnniversaryPage,
  },
  data() {
    return {
      activeTab: 0, // Default to Performance tab
      components: [PerformancePage, HandlingPage, AnniversaryPage],
    };
  },
};
</script>

<style scoped></style>
