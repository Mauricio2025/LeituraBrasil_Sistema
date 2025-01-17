import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://ihryaeaalvxtimxrjdlo.supabase.co"; // Substitua pelo seu URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlocnlhZWFhbHZ4dGlteHJqZGxvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NzExMDIsImV4cCI6MjA1MjU0NzEwMn0.3P_9Fe-etsf4QEk7GfkexUtImDVs-TJ9AeBo7SPN8UY"; // Substitua pela sua chave pública

export const supabase = createClient(supabaseUrl, supabaseKey);

