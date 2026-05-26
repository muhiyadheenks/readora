import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 60000
})
api.interceptors.request.use((config) => {
    const adminData = localStorage.getItem("admin")
    const userData = localStorage.getItem("token");
    if (adminData) {
        const token = JSON.parse(adminData).token
        config.headers.Authorization = `Bearer ${token}`
    } else if (userData) {
        config.headers.Authorization = `Bearer ${userData}`

    }
    return config
})

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Token expired
        if (error.response?.data?.tokenExpired && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            if (!refreshToken) {
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            try {
                const res = await api.post('/api/users/refresh-token', { refreshToken });
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("refreshToken", res.data.refreshToken);
                originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
                return api(originalRequest);
            } catch (err) {
                localStorage.clear();
                window.location.href = "/login";
                return Promise.reject(err);
            }
        }

        if (error.response?.data?.isBlock) {
            alert("Your Account is Blocked");
            localStorage.clear();
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);
export default api;

