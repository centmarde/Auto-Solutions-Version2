<template>
  <AdminSlots>
    <template #admin>
      <v-container class="p-5 mts">
        <div class="main-content">
          <div class="content">
            <h1 class="text-center fw-bolder mb-16 mt-10">Activity Logs</h1>

            <div v-if="logs && logs.length" class="activity-logs">
              <ul class="log-list">
                <li v-for="log in logs" :key="log.id" class="log-item">
                  <div class="log-timestamp">{{ log.timestamp }}</div>
                  <div class="log-details">
                    {{ log.action }} by
                    {{
                      log.user_id
                        ? `User ID: ${log.user_id}`
                        : `Register ID: ${log.register_id}`
                    }}
                  </div>
                </li>
              </ul>
            </div>

            <p v-else class="text-center text-muted">
              No activity logs available.
            </p>
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
      .select("id, timestamp, action, user_id, register_id") // Include register_id in the query
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

<style scoped>
.activity-logs {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1.5rem;
  background-color: #f9f9f9;
}

.log-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.log-item {
  border-bottom: 1px solid #e0e0e0;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.log-item:last-child {
  border-bottom: none;
}

.log-timestamp {
  font-size: 0.875rem;
  color: #666;
}

.log-details {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

.text-primary {
  color: #1976d2;
}

.text-muted {
  color: #999;
}
</style>
