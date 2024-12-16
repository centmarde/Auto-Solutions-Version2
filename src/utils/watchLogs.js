import { supabase } from "../lib/supaBase";

/**
 * Sets up a real-time listener for the 'activity_logs' table.
 * @param {Function} onNewLog - A callback function to handle new log entries.
 * @returns {object} - The subscription object, which can be used to remove the subscription later.
 */
export const watchLogs = (onNewLog) => {
  const subscription = supabase
    .from("activity_logs")
    .on("INSERT", (payload) => {
      if (typeof onNewLog === "function") {
        onNewLog(payload.new); // Pass the new log entry to the provided callback
      }
    })
    .subscribe();

  return subscription; // Return the subscription object
};
