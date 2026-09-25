import axios from "axios";
import { supabase } from "../services/supabase.js";

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL, withCredentials: false, timeout: 15000 });

// Attach the current access token
API.interceptors.request.use(async (config) => {
    const { data, error } = await supabase.auth.getSession();

    if (error) 
    {
        return Promise.reject(error);
    }

    if (data.session?.access_token) 
    {
        config.headers.Authorization = `Bearer ${data.session.access_token}`;
    }

    return config;
});

export default API;