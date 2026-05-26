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

    (error) => {
        if (error.response?.data?.isBlock) {

            alert("Your Account is Blocked");

            localStorage.removeItem("user");
            localStorage.removeItem("token");

            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);
export default api;

