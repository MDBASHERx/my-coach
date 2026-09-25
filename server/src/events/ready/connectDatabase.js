import "colors";
import { createClient } from "@supabase/supabase-js";

const initSupabase = async (app) => {
    const supabaseURL = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseURL || !supabaseKey)
    {
        throw new Error("SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY are required in .env",);
    }

    const supabase = createClient(supabaseURL, supabaseKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false,
        },
    });

    app.locals.supabase = supabase;

    console.log("[INFO]".blue + " Supabase client initialized".green);
};

export default initSupabase;