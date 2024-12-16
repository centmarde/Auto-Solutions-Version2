<template>
  <AdminSlots>
    <template #admin>
      <v-container class="p-5 mts">
        <div class="main-content">
          <div class="content">
            <h1 class="text-center fw-bolder">Activity Logs</h1>

            <ul v-if="logs && logs.length">
              <li v-for="log in logs" :key="log.id">
                {{ log.timestamp }} - {{ log.action }}
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
const fetchActivityLogs = async () => {
  try {
    const { data, error } = await supabase
      .from("activity_logs")
      .select("*")
      .order("timestamp", { ascending: false });

    if (error) {
      console.error("Error fetching activity logs:", error.message);
      return;
    }
    logs.value = data;
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

// Fetch logs when the component is mounted
onMounted(fetchActivityLogs);

// Provide logs to child components
provide("logs", logs);
</script>
