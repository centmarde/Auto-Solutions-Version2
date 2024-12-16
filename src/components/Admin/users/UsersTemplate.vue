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

    <!-- User Table -->
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
            <v-btn class="mx-2 delete-button" @click="confirmDelete(user.id)">
              Delete
            </v-btn>
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

// Props
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

// State
const users = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;
const dialog = ref(false);
const selectedImage = ref("");

// Fetch users
const fetchUsers = async (isAdmin) => {
  const { data, error } = await supabase.rpc("fetch_users_by_admin_status", {
    is_admin_input: isAdmin,
  });

  if (error) {
    console.error("Error fetching users via function:", error);
  } else {
    users.value = data;
  }
};

// Paginated users
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return users.value.slice(start, start + itemsPerPage);
});

// Total pages
const pageCount = computed(() => {
  return Math.ceil(users.value.length / itemsPerPage);
});

// Confirm delete
const confirmDelete = (userId) => {
  const confirmed = confirm("Are you sure you want to delete this user?");
  if (confirmed) {
    deleteUser(userId);
  }
};

// Delete user and related records
const deleteUser = async (userId) => {
  try {
    // Step 1: Fetch all car_ids linked to the user from approved_loans
    const { data: loans, error: fetchLoansError } = await supabase
      .from("approved_loans")
      .select("car_id")
      .eq("user_id", userId);

    if (fetchLoansError) {
      console.error("Error fetching approved loans:", fetchLoansError);
      alert("Failed to fetch associated loans. Deletion aborted.");
      return;
    }

    // Extract car IDs
    const carIds = loans.map((loan) => loan.car_id);

    // Step 2: Delete conversations where the user is a buyer or supplier
    const { error: deleteConversationsError } = await supabase
      .from("conversations")
      .delete()
      .or(`buyer_id.eq.${userId},supplier_id.eq.${userId}`);

    if (deleteConversationsError) {
      console.error("Error deleting conversations:", deleteConversationsError);
      alert("Failed to delete conversations associated with the user.");
      return;
    }

    // Step 3: Delete records in approved_loans referencing the user
    const { error: deleteLoansError } = await supabase
      .from("approved_loans")
      .delete()
      .eq("user_id", userId);

    if (deleteLoansError) {
      console.error("Error deleting approved loans:", deleteLoansError);
      alert("Failed to delete approved loans.");
      return;
    }

    // Step 4: Delete cars associated with the user
    if (carIds.length > 0) {
      const { error: deleteCarsError } = await supabase
        .from("cars")
        .delete()
        .in("id", carIds);

      if (deleteCarsError) {
        console.error("Error deleting cars:", deleteCarsError);
        alert("Failed to delete cars associated with the user.");
        return;
      }
    }

    // Step 5: Delete the user itself
    const { error: deleteUserError } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    if (deleteUserError) {
      console.error("Error deleting user:", deleteUserError);
      alert("Failed to delete the user.");
      return;
    }

    // Update local UI state
    users.value = users.value.filter((user) => user.id !== userId);
    console.log(`User with ID ${userId} and their data deleted successfully.`);
    alert("User and associated data deleted successfully!");
  } catch (err) {
    console.error("Unexpected error during deletion:", err);
    alert("An unexpected error occurred while deleting the user.");
  }
};

// Delete car function
const deleteCar = async (carId) => {
  try {
    // Step 1: Delete records in approved_loans table referencing this car_id
    const { error: loansError } = await supabase
      .from("approved_loans")
      .delete()
      .eq("car_id", carId);

    if (loansError) {
      console.error("Error deleting approved loans for car:", loansError);
      alert("Failed to delete related loan records. Deletion aborted.");
      return; // Exit early if deletion fails
    }

    // Step 2: Delete the car itself from the cars table
    const { error: carError } = await supabase
      .from("cars")
      .delete()
      .eq("id", carId);

    if (carError) {
      console.error("Error deleting car:", carError);
      alert("Failed to delete the car.");
      return; // Exit early if deletion fails
    }

    console.log(`Car with ID ${carId} deleted successfully.`);
  } catch (err) {
    console.error("Unexpected error during car deletion:", err);
    alert("An unexpected error occurred while deleting the car.");
  }
};

// Open image dialog
const openImage = (img) => {
  selectedImage.value = img;
  dialog.value = true;
};

// Fetch users on component mount
onMounted(() => {
  fetchUsers(props.isadmin);
});
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

.high-z-index .v-overlay__content {
  z-index: 2000 !important;
}

.delete-button {
  background-color: #ff6962 !important;
  color: white !important;
}
</style>
