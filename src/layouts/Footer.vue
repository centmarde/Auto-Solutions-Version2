<template>
  <v-container fluid :class="{ 'dark-theme': !isDarkMode, 'light-theme': isDarkMode }">
    <!-- First Row: App Name (Auto-Solutions) -->
    <v-row>
      <v-col cols="12">
  <!-- App name with larger size, aligned to the left -->
  <h1 class="display-3 mb-5">
    <span style="color: #6200ea;">Auto</span>-Solutions
  </h1>
</v-col>

    </v-row>

    <!-- Second Row: Useful Links and Connect With Us -->
    <v-row>
      <v-col cols="12">
        <!-- Contact Us -->
        <h5 :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">Connect With Us</h5>
      </v-col>

    </v-row>

     <!-- Social Links Row -->
     <v-row>
  <v-col cols="12" md="4" class="text-center">
    <!-- Team Image for Column 1 -->
    <v-img 
      src="https://via.placeholder.com/100" 
      aspect-ratio="1" 
      class="rounded-circle mx-auto mb-2" 
      width="100"
    ></v-img>
    <!-- Team Name for Column 1 -->
    <div class="team-name" style="margin-bottom: 10px;">CAMPADO, CENTMARDE- Full Stack Developer</div>

    <!-- GitHub Icon -->
    <v-btn 
      icon 
      :class="{'hover-primary': true}" 
      :href="'https://github.com/Centmarde'" 
      target="_blank"
      @click="setActiveLink('github1')"
    >
      <v-icon :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">mdi-github</v-icon>
    </v-btn>

    <!-- Facebook Icon -->
    <v-btn 
      icon 
      :class="{'hover-primary': true}" 
      :href="'https://web.facebook.com/centmarde.campado'" 
      target="_blank"
      @click="setActiveLink('facebook1')"
    >
      <v-icon :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">mdi-facebook</v-icon>
    </v-btn>

     <!-- LinkedIn Icon -->
     <v-btn 
      icon 
      :class="{'hover-primary': true}" 
      :href="'https://www.linkedin.com/in/centmarde-campado-627a73283/'" 
      target="_blank"
      @click="setActiveLink('linkedin1')"
    >
      <v-icon :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">mdi-linkedin</v-icon>
    </v-btn>
  </v-col>

  <v-col cols="12" md="4" class="text-center">
     <!-- Team Image for Column 2 -->
     <v-img 
      src="https://via.placeholder.com/100" 
      aspect-ratio="1" 
      class="rounded-circle mx-auto mb-2" 
      width="100"
    ></v-img>
    <!-- Team Name for Column 2 -->
     
    <div class="team-name" style="margin-bottom: 10px;">DELIGERO, ADRIAN- Backend Engineer</div>

    <!-- GitHub Icon -->
    <v-btn 
      icon 
      :class="{'hover-primary': true}" 
      :href="'https://github.com/Centmarde'" 
      target="_blank"
      @click="setActiveLink('github2')"
    >
      <v-icon :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">mdi-github</v-icon>
    </v-btn>

    <!-- Facebook Icon -->
    <v-btn 
      icon 
      :color="activeLink === 'facebook2' ? 'primary' : undefined" 
      :class="{'hover-primary': true}" 
      :href="'https://facebook.com'" 
      target="_blank"
      @click="setActiveLink('facebook2')"
    >
      <v-icon :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">mdi-facebook</v-icon>
    </v-btn>

    <!-- LinkedIn Icon -->
    <v-btn 
      icon 
      :class="{'hover-primary': true}" 
      :href="'https://linkedin.com'" 
      target="_blank"
      @click="setActiveLink('linkedin1')"
    >
      <v-icon :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">mdi-linkedin</v-icon>
    </v-btn>
  </v-col>

  <v-col cols="12" md="4" class="text-center">
     <!-- Team Image for Column 3 -->
     <v-img 
      src="https://via.placeholder.com/100" 
      aspect-ratio="1" 
      class="rounded-circle mx-auto mb-2" 
      width="100"
    ></v-img>
    <!-- Team Name for Column 3 -->
    <div class="team-name" style="margin-bottom: 10px;">LAGURA, CHRISTINE MAE- System Analyst</div>

    <!-- GitHub Icon -->
    <v-btn 
      icon 
      :color="activeLink === 'github3' ? 'primary' : undefined" 
      :class="{'hover-primary': true}" 
      :href="'https://github.com/tinaylagura'" 
      target="_blank"
      @click="setActiveLink('github3')"
    >
      <v-icon :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">mdi-github</v-icon>
    </v-btn>

    <!-- Facebook Icon -->
    <v-btn 
      icon 
      :class="{'hover-primary': true}" 
      :href="'https://www.facebook.com/christinemae.limbanganon'" 
      target="_blank"
      @click="setActiveLink('facebook3')"
    >
      <v-icon :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">mdi-facebook</v-icon>
    </v-btn>

     <!-- LinkedIn Icon -->
     <v-btn 
      icon 
      :class="{'hover-primary': true}" 
      :href="'https://www.linkedin.com/in/christine-limbanganon-5561ab325/'" 
      target="_blank"
      @click="setActiveLink('linkedin1')"
    >
      <v-icon :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">mdi-linkedin</v-icon>
    </v-btn>
  </v-col>
</v-row>



    <!-- Divider with top margin -->
    <v-divider class="mt-5"></v-divider>

    <!-- Third Row: Footer -->
    <v-row>
      <v-col class="text-center">
        <!-- Copyright notice -->
        <p :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">&copy; 2024 Auto Solutions. All rights reserved.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false,
      activeLink: null // Track the active link
    };
  },
  mounted() {
    this.isDarkMode = this.$vuetify.theme.dark;
  },
  methods: {
    setActiveLink(link) {
      this.activeLink = link; // Set the active link
    }
  }
}
</script>

<style>
.dark-theme {
  background-color: #151515; 
  color: #EEEEEE; 
}

/* Style for hover effect on buttons */
.hover-primary:hover {
  color: #6200ea; /* Primary color for hover */
}
</style>
