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
    // Step 1: Delete related data (conversations, loans, cars)
    await deleteRelatedData(userId);

    // Step 2: Delete the user itself
    const { error: deleteUserError } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    if (deleteUserError) {
      console.error("Error deleting user:", deleteUserError);
      alert("Failed to delete the user.");
      return;
    }

    // Step 3: Log the deletion activity
    // Use `currentUser.id` in the logging statement
    const { error: logError } = await supabase.from("activity_logs").insert({
      user_id: users.id,
      action: `Deleted user with ID ${userId}`,
      timestamp: new Date().toISOString(),
    });

    if (logError) {
      console.error("Error logging activity:", logError);
    } else {
      console.log(
        `Activity log for user ${userId} deletion recorded successfully.`
      );
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

// Delete related data
const deleteRelatedData = async (userId) => {
  // Delete conversations
  const { error: deleteConversationsError } = await supabase
    .from("conversations")
    .delete()
    .or(`buyer_id.eq.${userId},supplier_id.eq.${userId}`);
  if (deleteConversationsError) {
    throw new Error("Failed to delete conversations.");
  }

  // Delete loans
  const { data: loans, error: fetchLoansError } = await supabase
    .from("approved_loans")
    .select("car_id")
    .eq("user_id", userId);
  if (fetchLoansError) {
    throw new Error("Failed to fetch loans.");
  }

  const carIds = loans.map((loan) => loan.car_id);
  const { error: deleteLoansError } = await supabase
    .from("approved_loans")
    .delete()
    .eq("user_id", userId);
  if (deleteLoansError) {
    throw new Error("Failed to delete loans.");
  }

  // Delete cars
  if (carIds.length > 0) {
    const { error: deleteCarsError } = await supabase
      .from("cars")
      .delete()
      .in("id", carIds);
    if (deleteCarsError) {
      throw new Error("Failed to delete cars.");
    }
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

<template>
  <v-container class="p-5 mts">
    <h1 class="text-center fw-bolder">{{ title }}</h1>
    <v-table height="500px">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Image</th>
          <th>Address</th>
          <th>Birthday</th>
          <th>Gender</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in paginatedUsers" :key="user.id">
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
            <v-btn class="delete-button" @click="confirmDelete(user.id)">
              Delete
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
      v-model="currentPage"
      :length="pageCount"
      @input="fetchUsers"
      class="mt-4"
    />
  </v-container>
</template>

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
.delete-button {
  background-color: #ff6962;
  color: white;
}
</style>
