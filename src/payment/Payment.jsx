


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
    const { user, setUser } = useAuth();
    const { orders } = useOrder();


    console.log(user);


    const handlePayment = async () => {
        if (!user || cart.length === 0) return;

        try {
            const orderData = {
                items: cart,
                paymentMethod: method,
                totalAmount: cart.reduce(
                    (total, item) => total + item.price * item.qty,
                    0
                ),
                orderDate: new Date().toISOString(),
                status: "PLACED",
            };

            // console.log(orderData);


            const updatedOrders = [...(orders), orderData];

            await api.patch(`/users/${user.id}`, {
                ...user,
                orders: updatedOrders
            });

            setUser(prev => ({
                ...prev,
                orders: updatedOrders,
                cart: [],
            }));

            clearCart();
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

