import { createContext, useContext, useEffect, useState } from "react"
import api from "../../API/Axios"

const AdminAuthContext = createContext(null)

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null)
    const [loading, setLoading] = useState(true)

    // check admin login on refresh
    useEffect(() => {
        const storedAdmin = localStorage.getItem("admin")

        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin))
        }

        setLoading(false)
    }, [])

    const adminLogin = async (email, password) => {
        try {
            const res = await api.post("/admin", { email, password })

            setAdmin(res.data)
            localStorage.setItem("admin", JSON.stringify(res.data))

            return true
        } catch (err) {
            console.error("Admin login failed", err)
            return false
        }
    }

    const adminLogout = () => {
        setAdmin(null)
        localStorage.removeItem("admin")
    }

    return (
        <AdminAuthContext.Provider
            value={{ admin, adminLogin, adminLogout, loading }}
        >
            {children}
        </AdminAuthContext.Provider>
    )
}

export const useAdminAuth = () => useContext(AdminAuthContext)
