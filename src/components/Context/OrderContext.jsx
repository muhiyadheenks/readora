import { createContext, useContext, useEffect, useState } from "react";
import api from "../../API/Axios";
import { useAuth } from "./AuthContext";
import { useCart } from "./Cartcontext";

const OrderContext = createContext(null);

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used within OrderProvider");
    }
    return context;
};

export const OrderProvider = ({ children }) => {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user) {
            setOrders([]);
            return;
        }

        api.get(`/api/orders`)
            .then(res => setOrders(res.data || []))
            .catch(err => console.error(err));
    }, [user?._id]);

    const placeOrder = async ({ paymentMethod = 'COD', address = '' }) => {
        if (!user || !cart.items?.length) return { success: false };
        console.log("cart.items:", cart.items); // 👈 add this to see the structure

        const items = cart.items.map((item) => ({
            bookId: item.book?._id,
            title: item.book?.title,
            price: item.book?.price,
            qty: item.qty,
            img: item.book?.img
        }));

        const totalAmount = items.reduce(
            (sum, item) => sum + item.price * item.qty, 0
        );

        try {
            const res = await api.post('/api/orders', {
                userId: user._id,
                items,
                totalAmount,
                paymentMethod,
                address
            });
            setOrders((prev) => [res.data.order, ...prev]);
            await clearCart();
            return { success: true, order: res.data.order };
        } catch (err) {
            console.error("Order failed:", err);
            return { success: false };
        }
    };


    return (
        <OrderContext.Provider value={{ orders, setOrders, placeOrder }}>
            {children}
        </OrderContext.Provider>
    );
};

