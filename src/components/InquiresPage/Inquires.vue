<template>
  <div>
    <InquiresNavbar />
    <br /><br /><br /><br />
    <v-container fluid>
      <v-card class="p-3 vh-80 d-flex flex-column">
        <v-row class="fill-height">
          <v-col cols="12" md="4">
            <v-row>
              <v-col cols="6" sm="6" md="12">
                <router-link to="/RentedCars" class="d-block">
                  <v-btn block color="primary">
                    <v-icon left>mdi-car</v-icon>
                    Rented Car
                  </v-btn>
                </router-link>
              </v-col>
              <v-col cols="6" sm="6" md="12">
                <router-link to="/Inquires" class="d-block">
                  <v-btn block color="primary">
                    <v-icon left>mdi-car-search</v-icon>
                    Buy Car
                  </v-btn>
                </router-link>
              </v-col>
              <v-col cols="6" sm="6" md="12">
                <router-link to="/Garage" class="d-block">
                  <v-btn block color="primary">
                    <v-icon left>mdi-garage</v-icon>
                    Garage
                  </v-btn>
                </router-link>
              </v-col>
              <v-col cols="6" sm="6" md="12">
                <router-link to="/CarListing" class="d-block">
                  <v-btn block color="primary">
                    <v-icon left>mdi-format-list-bulleted</v-icon>
                    Uploaded Car
                  </v-btn>
                </router-link>
              </v-col>
              <v-col cols="6" sm="6" md="12">
                <router-link to="/PurchasedCars" class="d-block">
                  <v-btn block color="primary">
                    <v-icon left>mdi mdi-currency-usd</v-icon>
                    My Purchased
                  </v-btn>
                </router-link>
              </v-col>
              <v-col cols="6" sm="6" md="12">
                <router-link to="/Home" class="d-block">
                  <v-btn block color="primary">
                    <v-icon left>mdi-home</v-icon>
                    Home
                  </v-btn>
                </router-link>
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="8" class="scrollable-col">
            <InsideInquires />
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script setup>
import InquiresNavbar from "../../layouts/InquiresNavbar.vue";
import InsideInquires from "@/layouts/InsideInquires/InsideInquires.vue";
</script>

<style>
.vh-80 {
  height: 80vh;
}

.scrollable-col {
  overflow-y: auto;
  max-height: 100%;
}
.d-block {
  text-decoration: none;
}
</style>
