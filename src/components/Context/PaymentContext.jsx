import React, { createContext, useContext, useState } from "react";
import api from "../../API/Axios";
import { useAuth } from "./AuthContext";
import { useCart } from "./Cartcontext";


const PaymentContext = createContext(null);

export const usePayment = () => {
    const context = useContext(PaymentContext);

    if (!context) {
        throw new Error("usePayment must be used inside PaymentProvider");
    }
    return context;
};

export const PaymentProvider = ({ children }) => {
    const [payments, setPayments] = useState([]);
    const { user } = useAuth();
    const { cart, clearCart, setCart } = useCart();

    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.qty, 0);

    // 🔹 Add payment → JSON
    const addPayment = async (payment) => {
        const newPayment = {
            ...payment,
            id: Date.now().toString(),
            date: new Date().toISOString()
        };

        await api.post("/orders", newPayment);
        setPayments(prev => [...prev, newPayment]);
    };

    // 🔹 Remove payment → JSON
    const removePayment = async (id) => {
        await api.delete(`/orders/${id}`);
        setPayments(prev => prev.filter(p => p.id !== id));
    };

    return (
        <PaymentContext.Provider value={{ payments, addPayment, removePayment }}>
            {children}
        </PaymentContext.Provider>
    );
};


