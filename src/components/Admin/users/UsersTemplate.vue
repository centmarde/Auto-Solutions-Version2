<template>
  <v-container>
    <h1 class="text-center fw-bolder">{{ title }}</h1>
    <v-table height="300px" fixed-header>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Email</th>
          <th class="text-left">Address</th>
          <th class="text-left">Birthday</th>
          <th class="text-left">Gender</th>
          <th class="text-left">Actions</th> <!-- New Actions column -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.firstname }} {{ user.middlename }} {{ user.lastname }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.birthdate }}</td>
          <td>{{ user.gender }}</td>
          <td>
            <v-btn color="error" @click="deleteUser(user.id)">Delete</v-btn> <!-- Delete Button -->
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

const deleteUser = async (userId) => {
  const { error } = await supabase.from('User').delete().eq('id', userId);
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
  