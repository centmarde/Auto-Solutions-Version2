<template>
  <v-container fluid :class="{ 'dark-theme': !isDarkMode, 'light-theme': isDarkMode }">
    <v-row>
      <v-col cols="12" md="6">
        <!-- Quick Links example -->
        <h3 :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">Terms & Conditions</h3>
        <div class="d-flex" >
          <v-icon  :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">mdi-phone</v-icon> <h5 class="ms-5">09565545</h5>
        </div>
        <div class="d-flex" >
          <v-icon :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">mdi-email</v-icon>
        </div>
        
       
      </v-col>


      <v-col cols="12" md="6">
        <!-- Social Links example -->
        <h3 :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">Connect With Us</h3>
        <div class="social-links">
          <v-btn icon :href="'https://github.com/Centmarde'" target="_blank">
            <v-icon :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">mdi-github</v-icon>
          </v-btn>
          <v-btn icon :href="'https://web.facebook.com/centmarde.campado'" target="_blank" class="ms-3">
            <v-icon :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">mdi-facebook</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-row>
      <v-col class="text-center">
        <!-- Copyright notice example -->
        <p :class="{ 'white--text': !isDarkMode, 'black--text': isDarkMode }">&copy; 2024 Auto Solutions. All rights reserved.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isDarkMode: false 
    };
  },
  mounted() {
    
    this.isDarkMode = this.$vuetify.theme.dark;
  },
}
</script>

<style>
.dark-theme {
  background-color: #151515; 
  color: #EEEEEE; 
}

</style>
