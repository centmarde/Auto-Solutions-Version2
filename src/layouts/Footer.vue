<template>
  <v-container fluid :class="{ 'dark-theme': !isDarkMode, 'light-theme': isDarkMode }">
    
     <!-- Social Links Row -->
     <v-row>
  <v-col cols="12" md="4" class="text-center">
    <!-- Team Image for Column 1 -->
    <v-img 
      src="https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.30808-6/404955786_1494882281303982_3346562587604464766_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeFx1tsJ6BAUhwCrUc77sJJ85SnoRYhXLpnlKehFiFcumfDP1NoAJJCdM8NelbRoQu_N6qApbxGmEkXTsJQyz8-F&_nc_ohc=0Mv_CkOf6OYQ7kNvgENFzD4&_nc_zt=23&_nc_ht=scontent.fcgy1-1.fna&_nc_gid=APAdgFuvw7mYqaUb5butM0F&oh=00_AYA8K5vp5c_oIFoPRobzp3jSxYEKzdNOdiAP_omODIvOAA&oe=6711E1D0" 
      aspect-ratio="1" 
      class="rounded-circle mx-auto mb-2" 
      width="100"
    ></v-img>
    <!-- Team Name for Column 1 -->
    <div class="team-name">CAMPADO, CENTMARDE - Future Full Stack Developer</div>
<blockquote style="margin-top: -3px; padding: 0; font-style: italic;">"Creativity is a must, <br>but the way to solve new problems is ❤️."</blockquote>


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
      src="https://scontent.fcgy1-1.fna.fbcdn.net/v/t39.30808-6/438305379_3828339190825649_1012384794768267985_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFe1DC2xmOCeIlLxQGFO1hGE_T0HIdzcdoT9PQch3Nx2nejLl2eDZDvgPI1zwvQgVZ9hNYYX6xClLhaPmRWOC6a&_nc_ohc=5_6qzeCHdLoQ7kNvgHk_lFl&_nc_zt=23&_nc_ht=scontent.fcgy1-1.fna&_nc_gid=AnMgXtCLK80wvCQPWrzN0vg&oh=00_AYAZzPlDyEjGbPashJnGPtv-Ro-m_v9daOfVvYLXjnfguA&oe=6711D484" 
      aspect-ratio="1" 
      class="rounded-circle mx-auto mb-2" 
      width="100"
    ></v-img>
    <!-- Team Name for Column 2 -->
     
    <div class="team-name">DELIGERO, ADRIAN- Backend Engineer</div>
    <blockquote style="margin-top: -3px; padding: 0; font-style: italic;">"Empowering ideas through code and creativity."</blockquote>


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
      src="https://avatars.githubusercontent.com/u/166703060?v=4" 
      aspect-ratio="1" 
      class="rounded-circle mx-auto mb-2" 
      width="100"
    ></v-img>
    <!-- Team Name for Column 3 -->
    <div class="team-name" >LAGURA, CHRISTINE MAE- System Analyst</div>
    <blockquote style="margin-top: -3px; padding: 0; font-style: italic;">"Empowering ideas through code and creativity."</blockquote>


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
