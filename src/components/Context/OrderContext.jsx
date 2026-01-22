import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import api from "../../API/Axios";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const { user, setUser } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user?.id) return;

        const fetchOrderlist = async () => {
            try {
                const res = await api.get(`/users/${user.id}`);
                setOrders(res.data.orders || []);
            } catch (err) {
                console.error("Failed to fetch Ordrlist", err);
            }
        };

        fetchOrderlist();
    }, [user?.id]);



    // add order
    const placeOrder = async (cartItems) => {
        if (!user) return;

        console.log('placed!');

        console.log(cartItems);

        const newOrder = {
            items: cartItems,
            createdAt: new Date().toISOString(),
        };

        const updatedOrders = { ...orders, newOrder };
        console.log(updatedOrders);


        // update
        await api.put(`/users/${user.id}`, {
            orders: updatedOrders,
            cart: [],
        });

        // update state
        setOrders(updatedOrders);
        setUser({ ...user, orders: updatedOrders, cart: [] });
    };

    return (
        <OrderContext.Provider value={{ orders, placeOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrder = () => useContext(OrderContext);
