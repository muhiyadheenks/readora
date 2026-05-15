// import React, { createContext, useContext, useEffect, useState } from "react";
// import api from "../../API/Axios";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext(null);

// export const useAuth = () => {
//     const ctx = useContext(AuthContext);
//     if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//     return ctx;
// };

// export const AuthProvider = ({ children }) => {
//     const navigate = useNavigate();

//     const [user, setUser] = useState(null);
//     const [loadingAuth, setLoadingAuth] = useState(true);

//     /* ---------------- RESTORE AUTH ON REFRESH ---------------- */
//     useEffect(() => {
//         const restoreAuth = async () => {
//             const storedUser = localStorage.getItem("user");

//             if (!storedUser) {
//                 setLoadingAuth(false);
//                 return;
//             }

//             try {
//                 const parsedUser = JSON.parse(storedUser);
//                 const res = await api.get(`/users/${parsedUser.id}`);
//                 setUser(res.data);
//             } catch (err) {
//                 localStorage.removeItem("user");
//                 setUser(null);
//             } finally {
//                 setLoadingAuth(false);
//             }
//         };

//         restoreAuth();
//     }, []);

//     /* ---------------- LOGIN ---------------- */
//     const login = async (email, password) => {
//         try {
//             const res = await api.get(
//                 `/users?email=${email}&password=${password}`
//             );

//             if (res.data.length === 0) {
//                 return { success: false, error: "Invalid credentials" };
//             }

//             const loggedUser = res.data[0];

//             if (loggedUser.isBlock) {
//                 return {
//                     success: false,
//                     error: "Your account has been blocked by admin",
//                 };
//             }

//             localStorage.setItem("user", JSON.stringify(loggedUser));
//             setUser(loggedUser);

//             if (loggedUser.role === "admin") {
//                 navigate("/admin/dashboard");
//             }

//             return { success: true, user: loggedUser };
//         } catch (error) {
//             return { success: false, error: "Login failed" };
//         }
//     };


//     /* ---------------- LOGOUT ---------------- */
//     const logout = () => {
//         localStorage.removeItem("user");
//         setUser(null);
//         navigate("/");
//     };

//     const value = {
//         user,
//         setUser,
//         login,
//         logout,
//         loadingAuth,
//         isAuthenticated: !!user,
//     };

//     return (
//         <AuthContext.Provider value={value}>
//             {children}
//         </AuthContext.Provider>
//     );
// };


import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../API/Axios";
import { useNavigate } from "react-router-dom";
import Signup from "../Auth/Signup";

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

    //resistration
    const register = async (userData) => {

        try {

            const res = await api.post('/api/users/register', userData);
            localStorage.setItem("token", res.data.token)

            setUser(res.data.user)
            localStorage.setItem("user", JSON.stringify(res.data.user))


            return {
                success: true,
                data: res.data
            };

        } catch (error) {

            return {
                success: false,
                error:
                    error.response?.data?.message ||
                    error.response?.data ||
                    "Registration failed"
            };

        }

    }

    /* ---------------- RESTORE AUTH ON REFRESH ---------------- */
    useEffect(() => {
        const restoreAuth = async () => {
            const storedUser = localStorage.getItem("user");
            const token = localStorage.getItem("token");


            if (!storedUser || !token) {
                setLoadingAuth(false);
                return;
            }

            try {
                const parsedUser = JSON.parse(storedUser);
                const res = await api.get(`/api/users/${parsedUser._id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(res.data);
            } catch (err) {
                console.log(err.response, "refresh");

                localStorage.removeItem("user");
                localStorage.removeItem("token");
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

            const res = await api.post('/api/users/login', {
                email,
                password
            })

            // TOKEN
            localStorage.setItem("token", res.data.token)

            // USER
            setUser(res.data.user)
            console.log(res.data.user, "check");


            localStorage.setItem("user", JSON.stringify(res.data.user))
            console.log(user, "user");

            return {
                success: true,
                token: res.data.token,
                user: res.data.user
            }

        } catch (error) {

            return {
                success: false,
                error: error.response?.data || "Login failed"
            }

        }
    }

    /* ---------------- LOGOUT ---------------- */
    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    };

    const value = {
        user,
        setUser,
        login,
        register,
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
