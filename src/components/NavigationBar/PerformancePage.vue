<template>
    <div class="tab-content">
      <img class="content-img" src="../../assets/supra_imgs/supra1.png" alt="content1">
    </div>
  
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="10" md="12" sm="12">
          <div class="ms-5">
            <h5>6-Speed Manual Transmission</h5>
  
            <p>
              Intensify the connection between you and your GR Supra. Available with a 6-speed intelligent Manual Transmission (iMT) that optimizes your revs as you shift, the 3.0L 6-cylinder engine puts 382 horsepower * and 368 lb.-ft. of torque at your fingertips. Take the reins as you go through every corner while the g-forces make you feel like you're sinking into your seat. It’s time to personalize the power delivered to the rear wheels and find the sweet spot where your revs match up to your heartbeat.
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
      <img class="extra-img" src="../../assets/supra_imgs/Turbochanged.jpg" alt="content2">
      <!-- Car title -->
      <h5 class="car-title mt-2 ms-5">3.0-Liter Turbocharged Inline-Six</h5>
      <!-- Car description -->
      <p class="car-description mt-3 ms-5">The fire-breathing heart of GR Supra is its signature, turbocharged 3.0-liter inline 6-cylinder engine. Producing 382 horsepower * with an impressive 368 lb.-ft. of torque, this engine 
        uses smart technologies like a twin-scroll turbocharger, Variable Valve Timing and an electric wastegate, giving you plenty of power and instant response.</p>
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
      <img class="extra-img" src="../../assets/supra_imgs/cat-back.jpg" alt="content3">
      <!-- Car title -->
      <h5 class="car-title mt-2 ms-5">Cat-Back Exhaust</h5>
      <!-- Car description -->
      <p class="car-description mt-3 ms-5">GR Supra's 2.0-liter and 3.0-liter engines feature unique cat-back exhausts that are tuned to match their specific performance characteristics. 
        Not only does this help unleash each engine's potential, but it also gives them both a unique and glorious exhaust note.</p>
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

    </v-container>
  </template>
  
  <script>
  export default {
    name: "PerformancePage",
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
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    font-size: 24px;
  }
  
  .content-img {
    width: 100%;
    height: 100vh;
    max-height: 100vh;
  }
  
  .view-specs-tab {
    cursor: pointer;
    color: blue;
    text-decoration: underline;
  }
  
  .extra-img {
    width: 100%;
    height: auto;
  }
  </style>
  