<template>
    <div class="tab-content">
      <img class="content-img" src="../../assets/supra_imgs/sensuous.jpg" alt="content1">
    </div>
  
    <v-container fluid>
      <v-row>
        <v-col cols="12" lg="10" md="12" sm="12">
          <div class="ms-5">
            <h5>A Sensuous Silhouette</h5>
  
            <p>
                A sports car should be captivating, with a design that feels as alluring as it does powerful. We made no compromises with GR Supra’s design: Each and every aspect is defined by its contribution to overall driving performance. Its silhouette stirs all the right emotions, with generous curves and daring shapes that excite the senses. That it all comes together in a package that provides an optimum coefficient of drag and excellent downforce means that GR Supra is no mere sports car—it’s a work of art.
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
            <img class="extra-img" src="../../assets/supra_imgs/frozen.jpg" alt="content2">
            <!-- Car title -->
            <h5 class="car-title mt-2 ms-5">19-In. Frozen Gunmetal Gray Forged-Aluminum Wheels</h5>
            <!-- Car description -->
            <p class="car-description mt-3 ms-5">Show off from every angle. 19-in. forged-aluminum wheels accentuate the stunning build of GR Supra, while giving it an even sportier look. In addition, these strong and lightweight wheels are wrapped in Michelin® Pilot® Super Sport tires to help further optimize acceleration, cornering and braking capabilities. *</p>
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
            <img class="extra-img" src="../../assets/supra_imgs/cast.jpg" alt="content3">
            <!-- Car title -->
            <h5 class="car-title mt-2 ms-5">18-In. Cast-Aluminum Alloy Wheels</h5>
            <!-- Car description -->
            <p class="car-description mt-3 ms-5">GR Supra 2.0 comes standard with aggressive 18-in. split-spoke wheels wrapped in specially developed Michelin® Pilot® Super Sport summer tires. *</p>
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
            <img class="extra-img" src="../../assets/supra_imgs/dynamic.jpg" alt="content2">
            <!-- Car title -->
            <h5 class="car-title mt-2 ms-5">Dynamic Rear LED Taillights</h5>
            <!-- Car description -->
            <p class="car-description mt-3 ms-5">Chiseled into GR Supra’s rear, LED taillights are designed to clearly illuminate turn, tail and stop functions.</p>
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
            <img class="extra-img" src="../../assets/supra_imgs/led.jpg" alt="content3">
            <!-- Car title -->
            <h5 class="car-title mt-2 ms-5">LED Headlights</h5>
            <!-- Car description -->
            <p class="car-description mt-3 ms-5">GR Supra’s sculpted front end is punctuated by its signature headlights. Each housing features a two-level, 6-lens LED light cluster for optimum brightness and clarity. On each headlight, LED Daytime Running Lights (DRL) also run across the bottom to make sure you can be seen.</p>
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
    <img class="content-img" src="../../assets/supra_imgs/interior.jpg" alt="content1">
  
    <!-- Overlay container for text and link -->
    <div class="overlay-content">
      <p class="next-up-text">Next Up</p>
      <h1 class="main-title">Interior</h1>
      <router-link to="/InteriorPage" class="explore-feature">
        Explore Next Feature
      </router-link>
    </div>
  </div>
  
  
    </v-container>
  </template>
  
  <script>
  export default {
    name: "ExteriorPage",
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
  