import API from "../api/axios.js";

export const getServerHealth = async (signal) => {
    const { data } = await API.get("/health", {
        signal,
    });

    return data;
};