<template>
    <header
      class="navbar navbar-expand-lg fixed-top"
      :class="{'navbar-dark': isDark, 'navbar-light': !isDark}"
      :style="{ backgroundColor: isDark ? 'rgba(52, 52, 52, 0.8)' : 'rgba(200, 200, 200, 0.8)', color: isDark ? '#fff' : '#333' }"
>
      <div class="container-fluid">
        <!-- Logo and Title Section -->
        <a class="navbar-brand d-flex align-items-center" href="#">
          <img src="@/assets/images/logo.jpeg" alt="logo" class="logopic" height="50" />
          <h3 id="gidor" class="ms-2 mb-0">Admin Section</h3>
        </a>
  
        <!-- Hamburger Menu Button -->
        <button class="navbar-toggler" type="button" @click="toggleMenu" aria-controls="navbarNav" aria-expanded="false"
          aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
  
        <!-- Navbar Links -->
        <div class="collapse navbar-collapse" :class="{ show: isMenuVisible }" id="navbarNav">
          <div class="ms-auto d-flex align-items-center justify-content-end w-100">
            <ul class="navbar-nav text-center w-100">
              <li class="nav-item border-top">
                <router-link to="/Admin" class="nav-link btn fs-6 p-2  d-md-none d-block" >Dashboard</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/Home" class="nav-link btn p-2 fs-6 d-md-none d-block">View As Client</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/AdminMembers" class="nav-link btn fs-6 p-2 d-md-none d-block">Admin members</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/Clients" class="nav-link btn fs-6 p-2 d-md-none d-block">Client members</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/" class="nav-link btn wes fs-6 p-2 d-md-none d-block" @click="handleLogout">LOGOUT</router-link>
              </li>
            </ul>
            <router-link to="/UserInfo" @click="closeMenu">
              <img :src="userImage" class="rounded-circle"
                style="width: 3rem; height: 3rem; object-fit: cover; border: 2px solid white;" />
            </router-link>
  
            <!-- Theme Toggle -->
            <div class="d-flex align-items-center ms-3">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id="themeSwitch" :checked="theme === 'light'"
                  @change="toggleTheme">
                <label class="form-check-label" for="themeSwitch">
                  <i :class="theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon'"></i>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useTheme } from 'vuetify';
  import { useRouter } from 'vue-router';
  import { supabase, doLogout as supabaseLogout } from '../../lib/supaBase';
  
  const router = useRouter();
  const username = ref('Guest');
  const userImage = ref('');
  const isMenuVisible = ref(false);
  const theme = useTheme();
  const isDark = ref(theme.global.current.value.dark);
  
  // Fetch user data on component mount
  const fetchUserData = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return; // Exit if no user ID
  
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
  
    if (error) {
      console.error('Error fetching user data:', error);
      return; // Exit on error
    }
  
    username.value = data.username || 'Guest';
    userImage.value = data.img || ''; // Set user image URL
  };
  
  // Logout handler
  const handleLogout = async () => {
    try {
      await supabaseLogout(); // Use the imported logout function
      localStorage.removeItem('user_id');
      localStorage.removeItem('axios_id');
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  // Menu toggle functions
  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
  };
  
  const closeMenu = () => {
    isMenuVisible.value = false;
  };
  
  // Theme toggle
  const toggleTheme = () => {
    const newTheme = isDark.value ? 'light' : 'dark';
    theme.global.name.value = newTheme;
    isDark.value = newTheme === 'dark';
    localStorage.setItem('theme', newTheme); // Save theme in local storage
  };
  
  // On component mount, set the initial theme and fetch user data
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    theme.global.name.value = savedTheme;
    isDark.value = savedTheme === 'dark';
    fetchUserData();
  });
  </script>
  
  <style scoped>
  .logopic {
    border-radius: 30px;
    max-width: 100px; /* Ensures logo doesn't grow too large */
  }
  
  #gidor {
    font-size: 1.2rem;
    font-family: "Merriweather", serif; 
  }
  
  /* Media queries for responsive design */
  @media (max-width: 992px) { /* Large tablets and small desktops */
    #gidor {
      font-size: 1.25rem;
    }
  }
  
  @media (max-width: 768px) { /* Tablets */
    .logopic {
      height: 40px; /* Smaller logo for smaller screens */
    }
  
    #gidor {
      font-size: 1rem; /* Smaller title for smaller screens */
    }
  }
  
  @media (max-width: 280px) { /* Mobile devices */
    .logopic {
      height: 30px; /* Even smaller logo for mobile */
    }
  
    #gidor {
      font-size: 0.6rem; /* Adjust title size for mobile */
    }
  }
  
  /* Button styles */
  .btn {
    text-decoration: none;
    font-size: 10px;
    border: none;
    background: none;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
  }
  
  
  .btn::before {
    margin-left: auto;
  }
  
  .btn::after,
  .btn::before {
    content: '';
    width: 0%;
    height: 2px;
    background: rgb(97, 40, 255);
    display: block;
    transition: 0.5s;
  }
  
  .btn:hover::after,
  .btn:hover::before {
    width: 100%;
  }
  
  .drp_btn {
    margin-top: 2px;
  }
  </style>
  