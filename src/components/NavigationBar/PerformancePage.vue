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
  
     <!-- New picture below the last content -->
<div class="table-content mt-4">
  <img class="content-img" src="../../assets/supra_imgs/toyotagazooracing.jpg" alt="content1">
  <!-- Car title -->
  <h5 class="car-title mt-2 ms-5">Toyota Gazoo Racing</h5>
  <!-- Car description -->
  <p class="car-description mt-3 ms-5">Gazoo Racing is Toyota’s global racing division,
    in which we indulge our passion for motorsport. Every vehicle with the Gazoo Racing (GR) 
    badge has been thoroughly tested, honed, and perfected through extensive testing at racetracks across the globe.</p>
  <v-tab
    class="view-specs-tab"
    :class="{ active: isActive }"
    @click="toggleUnderline"
  >
    Learn more
  </v-tab>
</div>

 <!-- New section with 3 columns -->
 <v-row>
        <!-- First image in the first column -->
        <v-col cols="6">
          <div class="car-info mt-5">
            <img class="extra-img" src="../../assets/supra_imgs/turbochange4.jpg" alt="content2">
            <!-- Car title -->
            <h5 class="car-title mt-2 ms-5">2.0-Liter Turbocharged Inline-Four</h5>
            <!-- Car description -->
            <p class="car-description mt-3 ms-5">GR Supra 2.0 features a powerful, turbocharged inline-four, rated at 255 horsepower * and 295 lb.-ft. of torque. Compact and lightweight, the dimensions of this powerplant allow it to sit far back in the engine bay, helping GR Supra 2.0 achieve a near-perfect weight balance.</p>
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
            <img class="extra-img" src="../../assets/supra_imgs/normalandsport.jpg" alt="content3">
            <!-- Car title -->
            <h5 class="car-title mt-2 ms-5">Normal and Sport Driving Modes</h5>
            <!-- Car description -->
            <p class="car-description mt-3 ms-5">Because daily driving isn’t an exercise in maximum attack, GR Supra offers Normal and Sport driving modes. Normal Mode is perfect for your commute, offering a smooth ride, easy handling and effortless shifting. Pressing the button to activate Sport Mode transforms GR Supra into a true track-dominating beast, punctuated with a deeper, meaner exhaust rumble. All of GR Supra's senses heighten, giving you instant response and a whole lot more adrenaline.</p>
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
  <img class="content-img" src="../../assets/supra_imgs/handling.jpg" alt="content1">

  <!-- Overlay container for text and link -->
  <div class="overlay-content">
    <p class="next-up-text">Next Up</p>
    <h1 class="main-title">Handling</h1>
    <router-link to="/HandlingPage" class="explore-feature">
      Explore Next Feature
    </router-link>
  </div>
</div>

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
.content-img {
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  object-fit: cover; 
}

@media (max-width: 600px) {
  .content-img {
    height: 50vh; 
    max-height: 50vh;
  }
}

</style>