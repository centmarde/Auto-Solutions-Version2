<template>
  <div class="tab-content">
    <img class="content-img" src="../../assets/supra_imgs/adaptivevariable.jpg" alt="content1">
  </div>

  <v-container fluid>
    <v-row>
      <v-col cols="12" lg="10" md="12" sm="12">
        <div class="ms-5">
          <h5>Adaptive Variable Suspension</h5>

          <p>
            GR Supra’s available Adaptive Variable Suspension (AVS) allows this sports car to transform from comfortable cruiser to track bruiser and back again—almost instantaneously.
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
          <img class="extra-img" src="../../assets/supra_imgs/brembo.jpg" alt="content2">
          <!-- Car title -->
          <h5 class="car-title mt-2 ms-5">Brembo® Brakes</h5>
          <!-- Car description -->
          <p class="car-description mt-3 ms-5">Ready to take the heat, GR Supra’s available Brembo® * brakes are designed to give you firm, consistent braking force, on or off the track.</p>
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
          <img class="extra-img" src="../../assets/supra_imgs/builttohandle.jpg" alt="content3">
          <!-- Car title -->
          <h5 class="car-title mt-2 ms-5">Built to Handle</h5>
          <!-- Car description -->
          <p class="car-description mt-3 ms-5">GR Supra's wide stance helps it provide high-speed comfort and confidence-inspiring agility.</p>
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

   <!-- New picture below the last content -->
<div class="table-content mt-4">
<img class="content-img" src="../../assets/supra_imgs/electronic.jpg" alt="content1">
<!-- Car title -->
<h5 class="car-title mt-2 ms-5">Electronically Controlled Rear Differential</h5>
<!-- Car description -->
<p class="car-description mt-3 ms-5">GR Supra features an electronically controlled rear differential for 
  maximum stability and performance. Sensors detect wheel speed, engine rpm, yaw rate, brake pressure, throttle opening
   angle and steering angle information and send this data to a main processor. In an instant, this processor can take this data
    and activate a multi-plate clutch, which can control the locking ratio between both wheels from 0 to 100 percent. For you, 
    this means you can control your driving line with precision.</p>
<v-tab
  class="view-specs-tab"
  :class="{ active: isActive }"
  @click="toggleUnderline"
>
  View specs
</v-tab>
</div>

<!-- New section with 3 columns -->
<v-row>
      <!-- First image in the first column -->
      <v-col cols="6">
        <div class="car-info mt-5">
          <img class="extra-img" src="../../assets/supra_imgs/underbody.jpg" alt="content2">
          <!-- Car title -->
          <h5 class="car-title mt-2 ms-5">Underbody Aerodynamics</h5>
          <!-- Car description -->
          <p class="car-description mt-3 ms-5">A flat surface designed to help with flat-out performance. 
            All GR Supras feature a specially crafted flat undercover that has been engineered to help reduce aerodynamic lift.
             Air that finds its way underneath GR Supra is redirected via carefully crafted channels and spats, helping this sports car 
             feel stable and planted at speed.</p>
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
          <img class="extra-img" src="../../assets/supra_imgs/balancedesign.jpg" alt="content3">
          <!-- Car title -->
          <h5 class="car-title mt-2 ms-5">A Balanced Design</h5>
          <!-- Car description -->
          <p class="car-description mt-3 ms-5">We took extraordinary measures to ensure that GR Supra 2.0 not 
            only has a near-perfect weight balance, but also that its weight is placed in the right areas.
             Its powerplant was strategically placed to sit as low and as far back as possible, helping keep the car’s center 
             of mass, well, in the center of the car, for optimum handling performance.</p>
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
  <img class="content-img" src="../../assets/supra_imgs/45anniversarry.jpg" alt="content1">

  <!-- Overlay container for text and link -->
  <div class="overlay-content">
    <p class="next-up-text">Next Up</p>
    <h1 class="main-title">45th Anniversary Edition</h1>
    <router-link to="/AnniversaryPage" class="explore-feature">
      Explore Next Feature
    </router-link>
  </div>
</div>


  </v-container>
</template>

<script>
export default {
  name: "AnniiversaryPage",
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
