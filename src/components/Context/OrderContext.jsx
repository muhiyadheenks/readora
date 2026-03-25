import { createContext, useContext, useEffect, useState } from "react";
import api from "../../API/Axios";
import { useAuth } from "./AuthContext";

const OrderContext = createContext(null);

export const useOrder = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error("useOrder must be used within OrderProvider");
    }
    return context;
};

export const OrderProvider = ({ children }) => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user) {
            setOrders([]);
            return;
        }

        api.get(`/orders?userId=${user.id}`)
            .then(res => setOrders(res.data))
            .catch(err => console.error(err));
    }, [user]);

    return (
        <OrderContext.Provider value={{ orders, setOrders }}>
            {children}
        </OrderContext.Provider>
    );
};
