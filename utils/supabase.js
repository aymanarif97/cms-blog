import { createClient } from "@supabase/supabase-js";

export default createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, // Remember `NEXT_PUBLIC` provides this info in Deployed bundle
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY // Remember `NEXT_PUBLIC` provides this info in Deployed bundle
);
