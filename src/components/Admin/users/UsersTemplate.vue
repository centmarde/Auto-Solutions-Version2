<template>
  <v-container>
    <h1 class="text-center fw-bolder">{{ title }}</h1>
    <v-table height="300px" fixed-header>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Address</th>
          <th class="text-left">Birthday</th>
          <th class="text-left">Gender</th>
          <th class="text-left">Actions</th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}</td>
         
          <td>{{ user.address }}</td>
          <td>{{ user.birth_date }}</td>
          <td>{{ user.gender }}</td>
          <td>
            <v-btn color="error" @click="confirmDelete(user.id)">Delete</v-btn> 
          </td>
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
  },
});

// Fetch the users from the database
const fetchUsers = async (isadmin) => {
  const query = supabase
    .from('users')
    .select('id, first_name, middle_name, last_name, address, birth_date, gender')
    .eq('is_admin', isadmin);

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching users:', error);
  } else {
    users.value = data;
  }
};

// Function to confirm before deleting the user
const confirmDelete = (userId) => {
  const confirmed = confirm("Are you sure you want to delete this user?");
  if (confirmed) {
    deleteUser(userId);
  }
};

// Function to delete the user from the database
const deleteUser = async (userId) => {
  const { error } = await supabase.from('users').delete().eq('id', userId);
  if (error) {
    console.error('Error deleting user:', error);
  } else {
    // Remove the deleted user from the local array
    users.value = users.value.filter(user => user.id !== userId);
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
  