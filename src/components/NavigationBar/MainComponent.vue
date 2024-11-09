<template>
    <v-card>
        <div class="text-center mt-5"><h1>Features</h1></div>
        <p class="text-center">2024 GR SUPRA</p>
      <v-tabs
        v-model="activeTab"
      
      
      >
      <v-row>
        <v-col class="d-flex justify-content-center"> <v-tab>Performance</v-tab>
        <v-tab>Handling</v-tab>
        <v-tab>45th Anniversary Edition</v-tab>
        <v-tab>Exterior</v-tab>
        <v-tab>Interior</v-tab>
        <v-tab>Technology</v-tab>
        <v-tab>Safety & Convenience</v-tab></v-col>
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
                  <a href="https://www.toyota.com/southeasttoyota/deals-incentives/financial-estimates-supra/?vehicles=supra" target="_blank" rel="noopener noreferrer" class="tr">
                    <v-btn color="border" class="border">
                      Interested
                      <v-icon right>mdi-arrow-right</v-icon>
                    </v-btn>
                  </a>
                </v-container>
</template>


</style>