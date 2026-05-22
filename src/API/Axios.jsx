import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 10000
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
export default api;

