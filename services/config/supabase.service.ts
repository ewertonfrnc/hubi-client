import { createClient } from "@supabase/supabase-js";

const {
  public: { SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY },
} = useRuntimeConfig();

const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_ANON_KEY);

export default supabase;
