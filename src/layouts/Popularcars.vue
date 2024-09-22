<template>
    <v-container  class=" mb-5" fluid>
      <v-card id="ppli">
        <v-card-title id="ttrs" class="text-h3">POPULAR CATEGORIES</v-card-title>
        
        <v-row>
          <v-col cols="12" md="6" sm="12">
            <v-card class="car-card" elevation="8">
              <v-row>
                <v-col>
                  <v-img
                    src="../assets/images/black-audi-car-png-17.png"
                    alt="Audi"
                   width="224px"
                  />
                </v-col>
                <v-col>
                  <v-card-title class="text-h4">Audi</v-card-title>
                  <v-card-text>
                    <ul>
                      <li><strong>Engine:</strong> 2.0L Turbocharged</li>
                      <li><strong>Speed:</strong> 155 mph</li>
                      <li><strong>Power:</strong> 228 hp</li>
                      <li><strong>Fuel Efficiency:</strong> 24/34 mpg</li>
                    </ul>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
  
          <v-col cols="12" md="6" sm="12">
            <v-card class="car-card"  elevation="8">
              <v-row>
                <v-col>
                  <v-img
                    src="../assets/images/Aqua g sports.png"
                    alt="Aqua G Sports"
                    width="224px"
                  />
                </v-col>
                <v-col>
                  <v-card-title class="text-h4">Aqua G Sports</v-card-title>
                  <v-card-text>
                    <ul>
                      <li><strong>Engine:</strong> 1.5L Hybrid</li>
                      <li><strong>Speed:</strong> 120 mph</li>
                      <li><strong>Power:</strong> 134 hp</li>
                      <li><strong>Fuel Efficiency:</strong> 50/45 mpg</li>
                    </ul>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
  
        
  
          <v-col cols="12" md="6" sm="12">
            <v-card class="car-card" elevation="8">
              <v-row>
                <v-col>
                  <v-img
                    src="../assets/images/car1.png"
                    alt="Car Model 1"
                    width="240px"
                  />
                </v-col>
                <v-col>
                  <v-card-title class="text-h4">Car Model 1</v-card-title>
                  <v-card-text>
                    <ul>
                      <li><strong>Engine:</strong> 3.0L V6</li>
                      <li><strong>Speed:</strong> 180 mph</li>
                      <li><strong>Power:</strong> 300 hp</li>
                      <li><strong>Fuel Efficiency:</strong> 20/30 mpg</li>
                    </ul>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
  
          <v-col cols="12" md="6" sm="12">
            <v-card class="car-card" elevation="8">
              <v-row>
                <v-col>
                  <v-img
                    src="../assets/images/hq toyota.png"
                    alt="Toyota"
                   width="224px"
                  />
                </v-col>
                <v-col>
                  <v-card-title class="text-h4">Toyota</v-card-title>
                  <v-card-text>
                    <ul>
                      <li><strong>Engine:</strong> 2.5L Inline-4</li>
                      <li><strong>Speed:</strong> 140 mph</li>
                      <li><strong>Power:</strong> 203 hp</li>
                      <li><strong>Fuel Efficiency:</strong> 28/39 mpg</li>
                    </ul>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </template>
  
  <style scoped>
  #ppli {
    overflow: hidden;
    padding: 2rem;
  }
  #ttrs {
    font-family: "Merriweather", serif;
  }
  #ttrs {
  font-family: "Merriweather", serif;
  font-size: 1.5rem; /* Default font size for medium devices */
}

@media (max-width: 1200px) {
  #ttrs {
    font-size: 1.4rem; /* Slightly smaller on large tablets */
  }
}

@media (max-width: 768px) {
  #ttrs {
    font-size: 1.2rem; /* Adjust font size for tablets and small desktops */
  }
}

@media (max-width: 576px) {
  #ttrs {
    font-size: 1rem; /* Further reduce for mobile devices */
  }
}

  </style>
  