import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://stfncsgsbcfkcofwxkri.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0Zm5jc2dzYmNma2NvZnd4a3JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4Mjg0MTEsImV4cCI6MjA1NTQwNDQxMX0.xhQ4t3m2k2dUgn-VmFWXzYF9X_YaXCAANy-zEcXaEvQ";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
