<template>
  <v-container
    fluid
    :class="{ 'dark-theme': !isDarkMode, 'light-theme': isDarkMode }"
  >
    <!-- New Row for "Connect with us" -->
    <v-row class="mb-4">
      <v-col cols="12">
        <h2 style="margin: 0">Connect with us</h2>
        <!-- Main heading -->
        <hr style="border: 2px solid #007bff; width: 8%; margin: 10px" />
        <!-- Horizontal line -->
      </v-col>
    </v-row>

    <!-- Social Links Row -->
    <v-row>
      <v-col cols="12" md="4" class="text-center">
        <!-- Team Image for Column 1 -->
        <v-avatar
          size="100"
          class="mx-auto mb-2"
          style="border: 3px solid #b71c1c; border-radius: 50%"
        >
          <v-img src="..//assets/profile/campado-prof.jpg"></v-img>
        </v-avatar>

        <!-- Team Name for Column 1 -->
        <div class="team-name" style="margin-bottom: 5px; font-size: 1.5rem">
          CAMPADO, CENTMARDE
        </div>

        <!-- Position below Team Name -->
        <div class="team-position" style="margin-bottom: 5px; font-size: 1rem">
          Full Stack Developer
        </div>

        <!-- Short Caption below Position -->
        <div
          class="short-caption"
          style="margin-bottom: 10px; font-size: 0.875rem"
        >
          "Passionate about building web applications and enhancing user
          experiences."
        </div>

        <!-- Social Icons -->
        <div class="social-icons">
          <!-- GitHub Icon -->
          <v-btn
            icon
            :class="{ 'hover-primary': true }"
            :href="'https://github.com/Centmarde'"
            target="_blank"
            @click="setActiveLink('github1')"
          >
            <v-icon
              :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }"
              >mdi-github</v-icon
            >
          </v-btn>

          <!-- Facebook Icon -->
          <v-btn
            icon
            :class="{ 'hover-primary': true }"
            :href="'https://web.facebook.com/centmarde.campado'"
            target="_blank"
            @click="setActiveLink('facebook1')"
          >
            <v-icon
              :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }"
              >mdi-facebook</v-icon
            >
          </v-btn>

          <!-- LinkedIn Icon -->
          <v-btn
            icon
            :class="{ 'hover-primary': true }"
            :href="'https://www.linkedin.com/in/centmarde-campado-627a73283/'"
            target="_blank"
            @click="setActiveLink('linkedin1')"
          >
            <v-icon
              :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }"
              >mdi-linkedin</v-icon
            >
          </v-btn>
        </div>
      </v-col>

      <v-col cols="12" md="4" class="text-center">
        <!-- Team Image for Column 2 -->
        <v-avatar
          size="100"
          class="mx-auto mb-2"
          style="border: 3px solid #007bff; border-radius: 50%"
        >
          <v-img src="..//assets/profile/deligero-prof.jpg"></v-img>
        </v-avatar>

        <!-- Team Name for Column 2 -->
        <div class="team-name" style="margin-bottom: 5px; font-size: 1.5rem">
          DELIGERO, ADRIAN
        </div>

        <!-- Position below Team Name -->
        <div class="team-position" style="margin-bottom: 5px; font-size: 1rem">
          Front-End Developer
        </div>

        <!-- Short Caption below Position -->
        <div
          class="short-caption"
          style="margin-bottom: 10px; font-size: 0.875rem"
        >
          "Passionate about crafting seamless, high-performance front-end
          experiences, I focus on delivering intuitive, scalable user interfaces
          that enhance efficiency and drive engagement."
        </div>

        <!-- Social Icons -->
        <div class="social-icons">
          <!-- GitHub Icon -->
          <v-btn
            icon
            :class="{ 'hover-primary': true }"
            :href="'https://github.com/addeligero'"
            target="_blank"
            @click="setActiveLink('github2')"
          >
            <v-icon
              :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }"
              >mdi-github</v-icon
            >
          </v-btn>

          <!-- Facebook Icon -->
          <v-btn
            icon
            :class="{ 'hover-primary': true }"
            :href="'https://web.facebook.com/profile.php?id=100009488170986'"
            target="_blank"
            @click="setActiveLink('facebook2')"
          >
            <v-icon
              :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }"
              >mdi-facebook</v-icon
            >
          </v-btn>

          <!-- LinkedIn Icon -->
          <v-btn
            icon
            :class="{ 'hover-primary': true }"
            :href="'https://www.linkedin.com/in/adrian-deligero-a494a8317/'"
            target="_blank"
            @click="setActiveLink('linkedin2')"
          >
            <v-icon
              :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }"
              >mdi-linkedin</v-icon
            >
          </v-btn>
        </div>
      </v-col>

      <v-col cols="12" md="4" class="text-center">
        <!-- Team Image for Column 3 -->
        <v-avatar
          size="100"
          class="mx-auto mb-2"
          style="border: 3px solid #007bff; border-radius: 50%"
        >
          <v-img src="..//assets/profile/lagura-prof.jpg"></v-img>
        </v-avatar>

        <!-- Team Name for Column 3 -->
        <div class="team-name" style="margin-bottom: 5px; font-size: 1.5rem">
          LAGURA, CHRISTINE MAE
        </div>

        <!-- Position below Team Name -->
        <div class="team-position" style="margin-bottom: 5px; font-size: 1rem">
          System Analyst
        </div>

        <!-- Short Caption below Position -->
        <div
          class="short-caption"
          style="margin-bottom: 10px; font-size: 0.875rem"
        >
          "Focused on optimizing systems and enhancing user experience through
          analysis."
        </div>

        <!-- Social Icons -->
        <div class="social-icons">
          <!-- GitHub Icon -->
          <v-btn
            icon
            :class="{ 'hover-primary': true }"
            :href="'https://github.com/tinaylagura'"
            target="_blank"
            @click="setActiveLink('github3')"
          >
            <v-icon
              :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }"
              >mdi-github</v-icon
            >
          </v-btn>

          <!-- Facebook Icon -->
          <v-btn
            icon
            :class="{ 'hover-primary': true }"
            :href="'https://www.facebook.com/christinemae.limbanganon'"
            target="_blank"
            @click="setActiveLink('facebook3')"
          >
            <v-icon
              :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }"
              >mdi-facebook</v-icon
            >
          </v-btn>

          <!-- LinkedIn Icon -->
          <v-btn
            icon
            :class="{ 'hover-primary': true }"
            :href="'https://www.linkedin.com/in/christine-limbanganon-5561ab325/'"
            target="_blank"
            @click="setActiveLink('linkedin3')"
          >
            <v-icon
              :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }"
              >mdi-linkedin</v-icon
            >
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Divider with top margin -->
    <v-divider class="mt-5"></v-divider>

    <!-- Third Row: Footer -->
    <v-row>
      <v-col class="text-center">
        <!-- Copyright notice -->
        <p :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">
          &copy; 2024 Auto Solutions. All rights reserved.
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false,
      activeLink: null, // Track the active link
    };
  },
  mounted() {
    this.isDarkMode = this.$vuetify.theme.dark;
  },
  methods: {
    setActiveLink(link) {
      this.activeLink = link; // Set the active link
    },
  },
};
</script>

<style>
.dark-theme {
  background-color: #151515;
  color: #eeeeee;
}
</style>
