import axios from "axios";
import { getToken, logout } from "./auth.service";
const api = axios.create({
    baseURL: "http://localhost:8090/",
    headers: {
        "Content-Type": "application/json",
    },
});


// Attach token automatically
api.interceptors.request.use((config) => {
    if(config.url === '/auth/login')
        return config

    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle expired token
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            logout();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
