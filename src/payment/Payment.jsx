import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/Context/Cartcontext";
import { useAuth } from "../components/Context/AuthContext";
import api from "../API/Axios";
import { useOrder } from "../components/Context/OrderContext";

function Payment() {
    const [method, setMethod] = useState("COD");
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const { orders, setOrders } = useOrder();

    const handlePayment = async () => {
        if (!user || cart.items?.length === 0) return;

        try {
            const orderData = {
                userId: user.id,
                name: user.name,
                email: user.email,
                items: cart.items,
                paymentMethod: method,
                totalAmount: cart.items?.reduce(
                    (total, item) => total + item.price * item.qty,
                    0
                ),
                orderDate: new Date().toISOString(),
                status: "PLACED",
            };

            await api.post("/orders", orderData);

            setOrders([...orders, orderData]);

            await clearCart();

            alert("Payment Successful");
            navigate("/ordersuccess");
        } catch (err) {
            console.error("Payment failed", err);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Payment</h1>

            <label className="flex gap-2 mb-3">
                <input
                    type="radio"
                    checked={method === "COD"}
                    onChange={() => setMethod("COD")}
                />
                Cash on Delivery
            </label>

            <label className="flex gap-2 mb-3">
                <input
                    type="radio"
                    checked={method === "ONLINE"}
                    onChange={() => setMethod("ONLINE")}
                />
                Online Payment
            </label>

            <button
                onClick={handlePayment}
                className="w-full bg-green-600 text-white py-2 rounded mt-4"
            >
                Pay & Confirm Order
            </button>
        </div>
    );
}

export default Payment;
