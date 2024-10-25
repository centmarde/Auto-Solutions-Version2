<template>
    <div class="tab-content">
      <img class="content-img" src="../../assets/supra_imgs/connect.jpg" alt="content1">
    </div>
  
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="10" md="12" sm="12">
          <div class="ms-5">
            <h5>Supra Connect</h5>
  
            <p>
                This available advanced technology suite is designed to help you get more from your GR Supra, * with features like Automatic Emergency Call, * Real-Time Traffic Information * and Roadside Assistance. * And the available Supra Connect iPhone® * app lets you lock/unlock the doors and activate Ventilation Now and Ventilation Timer features. * *
            </p>
          </div>
          <v-tab
            class="view-specs-tab"
            :class="{ active: isActive }"
            @click="toggleUnderline"
          >
            View specs
          </v-tab>
        </v-col>
      </v-row>
  
      <!-- New section with 3 columns -->
      <v-row>
        <!-- First image in the first column -->
        <v-col cols="6">
          <div class="car-info">
            <img class="extra-img" src="../../assets/supra_imgs/apple.jpg" alt="content2">
            <!-- Car title -->
            <h5 class="car-title mt-2 ms-5">Apple CarPlay® Compatibility</h5>
            <!-- Car description -->
            <p class="car-description mt-3 ms-5"> Stay connected. Ditch the wires. GR Supra 3.0 Premium comes standard with wireless Apple CarPlay® * compatibility. Simply pair your compatible iPhone® * to access your favorite iOS apps * directly from GR Supra’s 8.8-in. high-resolution display. You can get directions, make calls, send and receive messages, and listen to music, all in a way that allows you to stay focused on your drive. *</p>
          </div>
          <v-tab
            class="view-specs-tab"
            :class="{ active: isActive }"
            @click="toggleUnderline"
          >
            View specs
          </v-tab>
        </v-col>
  
        <!-- Second image in the last column -->
        <v-col cols="6">
          <div class="car-info">
            <img class="extra-img" src="../../assets/supra_imgs/integrated.jpg" alt="content3">
            <!-- Car title -->
            <h5 class="car-title mt-2 ms-5">Integrated Navigation</h5>
            <!-- Car description -->
            <p class="car-description mt-3 ms-5">Whether you’re headed to the racetrack or office, GR Supra’s available integrated navigation * will help you get there quickly. Just punch in your destination and get turn-by-turn directions on the available 8.8-in. high-resolution touchscreen, * in the digital gauge cluster, on the available color Head-Up Display (HUD)—or in all three locations at once.

</p>
          </div>
          <v-tab
            class="view-specs-tab"
            :class="{ active: isActive }"
            @click="toggleUnderline"
          >
            View specs
          </v-tab>
        </v-col>
      </v-row>
  
  <!-- New section with 3 columns -->
  <v-row>
        <!-- First image in the first column -->
        <v-col cols="6">
          <div class="car-info mt-5">
            <img class="extra-img" src="../../assets/supra_imgs/wireless.jpg" alt="content2">
            <!-- Car title -->
            <h5 class="car-title mt-2 ms-5">Qi-Compatible Wireless Charging</h5>
            <!-- Car description -->
            <p class="car-description mt-3 ms-5">No charging cable? No problem. GR Supra’s cabin can be equipped with available Qi-compatible wireless smartphone charging. * Just place your Qi-compatible smartphone onto the nonslip surface and charge up wirelessly.</p>
          </div>
          <v-tab
            class="view-specs-tab"
            :class="{ active: isActive }"
            @click="toggleUnderline"
          >
            View specs
          </v-tab>
        </v-col>
  
        <!-- Second image in the last column -->
        <v-col cols="6">
          <div class="car-info mt-5">
            <img class="extra-img" src="../../assets/supra_imgs/head.jpg" alt="content3">
            <!-- Car title -->
            <h5 class="car-title mt-2 ms-5">Head-Up Display</h5>
            <!-- Car description -->
            <p class="car-description mt-3 ms-5">GR Supra’s available full-color Head-Up Display (HUD) puts crucial information front and center so you can stay focused on the road. With just a glance, you can see your current speed and navigation info, * check automatic transmission models’ available Full-Speed Dynamic Radar Cruise Control (DRCC) settings, * and more.</p>
          </div>
          <v-tab
            class="view-specs-tab"
            :class="{ active: isActive }"
            @click="toggleUnderline"
          >
            View specs
          </v-tab>
        </v-col>
      </v-row>
  
      <div class="table-content mt-4 position-relative">
    <!-- Background image of the car -->
    <img class="content-img" src="../../assets/supra_imgs/safety.jpg" alt="content1">
  
    <!-- Overlay container for text and link -->
    <div class="overlay-content">
      <p class="next-up-text">Next Up</p>
      <h1 class="main-title">Safety & Convenience</h1>
      <router-link to="/SafetyPage" class="explore-feature">
        Explore Next Feature
      </router-link>
    </div>
  </div>
  
  
    </v-container>
  </template>
  
  <script>
  export default {
    name: "TechnologyPage",
    data() {
      return {
        isActive: false, // Tracks whether "View specs" is clicked
      };
    },
    methods: {
      toggleUnderline() {
        this.isActive = !this.isActive;
      },
    },
  };
  </script>
  
  
  <style scoped>
  .tab-content {
    display: flex;
    flex-direction: column; /* Added to stack title and description vertically */
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    font-size: 24px;
  }
  
  .content-img {
    width: 100%;
    height: auto; /* Adjusted to ensure image maintains aspect ratio */
  }
  
  .view-specs-tab {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
    margin-top: 10px; /* Added margin for spacing */
  }
  
  .extra-img {
    width: 100%;
    height: auto;
  }
  
  .car-title {
    font-weight: bold;
    margin-top: 10px;
  }
  
  .car-description {
    color: #666;
    font-size: 14px;
  }
  .position-relative {
  position: relative; /* Allow positioning of child elements */
  }
  
  .explore-feature {
    display: inline-block;
    padding: 10px 20px;
    background-color: white;
    color: black;
    text-decoration: none;
    border-radius: 5px;
    font-weight: bold;
  }
  .overlay-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
  }
  .next-up-text {
    font-size: 16px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 2px;
  }
  
  .main-title {
    font-size: 48px;
    font-weight: bold;
    margin: 10px 0;
  }
  
  
  </style>
  