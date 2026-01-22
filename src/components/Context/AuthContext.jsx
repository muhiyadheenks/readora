import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../../API/Axios';


const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);




    useEffect(() => {
        const storedUser = localStorage.getItem('user');

        if (storedUser) {
            try {
                api.get(`/users/${JSON.parse(storedUser).id}`).then(res => setUser(res.data))
            } catch (error) {
                localStorage.removeItem('user');
            }
        }
        setLoadingAuth(false);
    }, []);

    // registration

    const register = async (userData) => {
        try {
            const response = await api.get(`/users?email=${userData.email}`);

            if (response.data.length > 0) {
                return {
                    success: false,
                    error: 'Email already registered'
                };
            }


            const newUser = {
                id: userData.id,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                password: userData.password,
                role: "User",
                isBlock: false,
                cart: [],
                orders: [],
                wishlist: []
            };



            await api.post('/users', newUser);
            return { success: true };
        }

        catch (error) {
            if (error.code === 'ERR_NETWORK') {
                return registerWithLocalStorage(userData);
            }
            return {
                success: false,
                error: 'Registration failed'
            };
        }
    };


    const registerWithLocalStorage = (userData) => {
        try {
            const existingUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');

            if (existingUsers.some(u => u.email === userData.email)) {
                return {
                    success: false,
                    error: 'Email already registered'
                };
            }

            const newUser = {
                ...userData,
                id: Date.now().toString()
            };

            existingUsers.push(newUser);
            localStorage.setItem('registeredUsers', JSON.stringify(existingUsers));
            return { success: true };
        }

        catch (error) {
            return {
                success: false,
                error: 'Registration failed'
            };
        }
    };



    //  logination

    const login = async (email, password) => {
        try {
            const response = await api.get(`/users?email=${email}&password=${password}`);

            if (response.data.length > 0) {
                const user = response.data[0];

                if (user.status === "blocked") {
                    return {
                        success: false,
                        error: "Your account has been blocked by admin"
                    };
                }

                localStorage.setItem('user', JSON.stringify(user));
                setUser(user);
                return { success: true, user };
            }
            return loginWithLocalStorage(email, password);
        }

        catch (error) {
            if (error.code === 'ERR_NETWORK') {
                return loginWithLocalStorage(email, password);
            }
            return {
                success: false,
                error: 'Login failed'
            };
        }
    };

    const loginWithLocalStorage = (email, password) => {
        try {
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const foundUser = users.find(u => u.email === email && u.password === password);

            if (!foundUser) {
                return {
                    success: false,
                    error: 'Invalid email or password'
                };
            }

            if (foundUser.status === "blocked") {
                return {
                    success: false,
                    error: "Your account has been blocked by admin"
                };
            }

            localStorage.setItem('user', JSON.stringify(foundUser));
            setUser(foundUser);
            return { success: true, user: foundUser };
        }
        catch (error) {
            return {
                success: false,
                error: 'Login failed'
            };
        }
    };


    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        // cart and wishlist auto-clear via their own useEffect on user change
    };


    const checkServerStatus = async () => {
        try {
            await api.get('/users');
            return true;
        }
        catch (error) {
            return false;
        }
    };
    const addAddress = (address) => {
        if (!user) return;

        const updatedUser = {
            ...user,
            address: [...(user.address || []), address],
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // optional: sync to backend
        api.patch(`/users/${user.id}`, { address: updatedUser.address })
            .catch(() => { });
    };
    const updateProfile = (updatedData) => {
        if (!user) return;

        const updatedUser = {
            ...user,
            ...updatedData,
        };

        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        api.patch(`/users/${user.id}`, updatedData).catch(() => { });

    };



    const value = {
        user,
        setUser,
        register,
        login,
        checkServerStatus,
        logout,
        addAddress,
        updateProfile,
        isAuthenticated: !!user,
        loadingAuth
    };


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};