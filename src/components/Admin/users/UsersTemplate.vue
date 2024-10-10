<template>
    <v-container >
    <h1 class="text-center fw-bolder">{{title}}</h1>
    <v-table height="300px" fixed-header>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Address</th>
          <th class="text-left">Birthday</th>
          <th class="text-left">Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstname }} {{ user.middlename }} {{ user.lastname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.birthdate }}</td>
          <td>{{ user.gender }}</td>
        </tr>
      </tbody>
    </v-table>
</v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { supabase } from '../../../lib/supaBase';
  
  const users = ref([]);

  
  const props = defineProps({
  title: {
    type: String,
    default: 'Title',
  },
  isadmin: {
    type: Boolean,
    default: false,
  }
});

const fetchUsers = async (isadmin) => {
  const query = supabase
    .from('User')
    .select('id, firstname, middlename, lastname, email, address, birthdate, gender')
    .eq('isadmin', isadmin); 

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching users:', error);
  } else {
    users.value = data;
  }
};

onMounted(() => {
  fetchUsers(props.isadmin); 
});

  </script>
  
  <style>
  .mts {
    margin-top: 40px;
  }
  </style>
  