<template>
  <!-- Dialog for enlarged image -->
  <v-dialog v-model="dialog" max-width="600px" class="high-z-index">
    <v-card>
      <v-img
        :src="selectedImage"
        class="enlarged-image"
        aspect-ratio="16/9"
      ></v-img>
    </v-card>
  </v-dialog>
  <v-container class="p-5 mts">
    <h1 class="text-center fw-bolder">{{ title }}</h1>

    <v-table height="500px">
      <thead>
        <tr>
          <th class="text-left">ID</th>
          <th class="text-left">Name</th>
          <th class="text-left">Image</th>
          <th class="text-left">Address</th>
          <th class="text-left">Birthday</th>
          <th class="text-left">Gender</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in paginatedUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td>
            {{ user.first_name }} {{ user.middle_name }} {{ user.last_name }}
          </td>
          <td>
            <img
              :src="user.img"
              alt="User Image"
              class="user-image"
              @click="openImage(user.img)"
            />
          </td>
          <td>{{ user.address }}</td>
          <td>{{ user.birth_date }}</td>
          <td>{{ user.gender }}</td>
          <td class="text-center">
            <v-btn class="mx-2 delete-button" @click="confirmDelete(user.id)"
              >Delete</v-btn
            >
          </td>
        </tr>
      </tbody>
    </v-table>

    <!-- Pagination -->
    <v-pagination
      v-model="currentPage"
      :length="pageCount"
      :total-visible="4"
      @input="fetchUsers"
      class="mt-4"
    ></v-pagination>
  </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "../../../lib/supaBase";

const props = defineProps({
  title: {
    type: String,
    default: "User List",
  },
  isadmin: {
    type: Boolean,
    default: false,
  },
});

const users = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;

// State for dialog and selected image
const dialog = ref(false);
const selectedImage = ref("");

// Fetch users from the database
const fetchUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select(
      "id, first_name, middle_name, last_name, img, address, birth_date, gender"
    )
    .eq("is_admin", props.isadmin);

  if (error) {
    console.error("Error fetching users:", error);
  } else {
    users.value = data;
  }
};

// Paginated users based on current page
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return users.value.slice(start, start + itemsPerPage);
});

// Calculate total number of pages
const pageCount = computed(() => {
  return Math.ceil(users.value.length / itemsPerPage);
});

// Confirm deletion
const confirmDelete = (userId) => {
  const confirmed = confirm("Are you sure you want to delete this user?");
  if (confirmed) {
    deleteUser(userId);
  }
};

// Delete the user from the database
const deleteUser = async (userId) => {
  const { error } = await supabase.from("users").delete().eq("id", userId);
  if (error) {
    console.error("Error deleting user:", error);
  } else {
    users.value = users.value.filter((user) => user.id !== userId);
  }
};

// Open image in dialog
const openImage = (img) => {
  selectedImage.value = img;
  dialog.value = true;
};

onMounted(fetchUsers);
</script>

<style>
.mts {
  margin-top: 40px;
}

.user-image {
  cursor: pointer;
  width: 100px;
  height: auto;
  transition: transform 0.3s;
}

.user-image:hover {
  transform: scale(1.05);
}

/* Ensure the dialog appears in front */
.high-z-index .v-overlay__content {
  z-index: 2000 !important;
}

.delete-button {
  background-color: #ff6962 !important;
  color: white !important;
}
</style>
