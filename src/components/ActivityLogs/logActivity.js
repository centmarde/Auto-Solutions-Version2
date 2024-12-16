import { supabase } from "../../lib/supaBase";

export const logActivity = async (adminId, action) => {
  try {
    const { error } = await supabase.from("activity_logs").insert({
      admin_id: adminId,
      action,
    });

    if (error) {
      console.error("Error logging activity:", error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Unexpected error:", err);
    return false;
  }
};
