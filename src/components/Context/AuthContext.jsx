import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../API/Axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    /* ---------------- RESTORE AUTH ON REFRESH ---------------- */
    useEffect(() => {
        const restoreAuth = async () => {
            const storedUser = localStorage.getItem("user");

            if (!storedUser) {
                setLoadingAuth(false);
                return;
            }

            try {
                const parsedUser = JSON.parse(storedUser);
                const res = await api.get(`/users/${parsedUser.id}`);
                setUser(res.data);
            } catch (err) {
                localStorage.removeItem("user");
                setUser(null);
            } finally {
                setLoadingAuth(false);
            }
        };

        restoreAuth();
    }, []);

    /* ---------------- LOGIN ---------------- */
    const login = async (email, password) => {
        try {
            const res = await api.get(
                `/users?email=${email}&password=${password}`
            );

            if (res.data.length === 0) {
                return { success: false, error: "Invalid credentials" };
            }

            const loggedUser = res.data[0];

            if (loggedUser.isBlock) {
                return {
                    success: false,
                    error: "Your account has been blocked by admin",
                };
            }

            localStorage.setItem("user", JSON.stringify(loggedUser));
            setUser(loggedUser);

            if (loggedUser.role === "admin") {
                navigate("/admin/dashboard");
            }

            return { success: true, user: loggedUser };
        } catch (error) {
            return { success: false, error: "Login failed" };
        }
    };

    /* ---------------- LOGOUT ---------------- */
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    };

    const value = {
        user,
        setUser,
        login,
        logout,
        loadingAuth,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
