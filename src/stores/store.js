// stores/userStore.js
import { defineStore } from 'pinia';
import { supabase, doLogout as supabaseLogout } from '../lib/supaBase';
import { useRouter } from 'vue-router';
import { useTheme } from 'vuetify';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const router = useRouter();
  const theme = useTheme();
  
  const username = ref('Guest');
  const userImage = ref('');
  const isMenuVisible = ref(false);
  const isDark = ref(theme.global.current.value.dark);

  const fetchUserData = async () => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return; 

    const { data, error } = await supabase
      .from('User')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user data:', error);
      return;
    }

    username.value = data.username || 'Guest';
    userImage.value = data.img || '';
  };

  const handleLogout = async () => {
    try {
      await supabaseLogout();
      localStorage.removeItem('user_id');
      localStorage.removeItem('axios_id');
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const toggleMenu = () => {
    isMenuVisible.value = !isMenuVisible.value;
  };

  const closeMenu = () => {
    isMenuVisible.value = false;
  };

  const toggleTheme = () => {
    const newTheme = isDark.value ? 'light' : 'dark';
    theme.global.name.value = newTheme;
    isDark.value = newTheme === 'dark';
    localStorage.setItem('theme', newTheme);
  };

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    theme.global.name.value = savedTheme;
    isDark.value = savedTheme === 'dark';
  };

  return {
    username,
    userImage,
    isMenuVisible,
    isDark,
    fetchUserData,
    handleLogout,
    toggleMenu,
    closeMenu,
    toggleTheme,
    initTheme
  };
});
