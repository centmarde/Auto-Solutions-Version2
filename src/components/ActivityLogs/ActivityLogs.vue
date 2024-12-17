<template>
  <AdminSlots>
    <template #admin>
      <v-container class="p-5 mts">
        <div class="main-content">
          <div class="content">
            <h1 class="text-center fw-bolder mb-16">Activity Logs</h1>

            <ul v-if="logs && logs.length">
              <li v-for="log in logs" :key="log.id">
                {{ log.timestamp }} - {{ log.action }} by User ID:
                {{ log.user_id }}
              </li>
            </ul>

            <p v-else class="text-center">No activity logs available.</p>
          </div>
        </div>
      </v-container>
    </template>
  </AdminSlots>
</template>

<script setup>
import { ref, onMounted, provide } from "vue";
import { supabase } from "../../lib/supaBase";

// Reactive logs state
const logs = ref([]);

// Function to fetch activity logs
// Function to fetch activity logs
const fetchActivityLogs = async () => {
  try {
    const { data, error } = await supabase
      .from("activity_logs")
      .select("id, timestamp, action, user_id") // Include user_id in the query
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("Error fetching activity logs:", error.message);
      return;
    }
    logs.value = data; // Update logs with the fetched data
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

// Fetch logs when the component is mounted
onMounted(fetchActivityLogs);

// Provide logs to child components
provide("logs", logs);
</script>
