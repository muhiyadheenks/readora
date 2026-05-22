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


    //preveent rerender rozerpay script
    useEffect(() => {
        const existingScript = document.getElementById('razorpay-script')
        if (existingScript) return

        const script = document.createElement('script')
        script.src = 'https://checkout.razorpay.com/v2/checkout.js'
        script.id = 'razorpay-script'
        document.body.appendChild(script)
    }, [])


    //handleRazorpay
    const saveOrder = async (items, totalAmount, paymentMethod, paymentId = null) => {
        try {
            const res = await api.post("/api/orders", {
                userId: user._id,
                items,
                totalAmount,
                paymentMethod,
                ...(paymentId && { paymentId }),
            });
            setOrders((prev) => [res.data.order, ...prev]);
            await clearCart();
            alert("Payment Successful");
            navigate("/ordersuccess");
        } catch (err) {
            console.error("Save order failed:", err);
            alert("Payment done but order saving failed. Contact support.");
        }
    };

    // ROZERPAY
    const handleRazorpay = async (items, totalAmount) => {
        const { data } = await api.post("/api/payment/online", { totalAmount });

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: "INR",
            name: "Readora",
            description: "Book Purchase",
            order_id: data.id,
            handler: async (response) => {
                await saveOrder(items, totalAmount, "ONLINE", response.razorpay_payment_id);
            },
            prefill: {
                name: user.name,
                email: user.email,
            },
            theme: { color: "#16a34a" },
        };

        const rzp = new window.Razorpay(options);

        rzp.on("payment.failed", (response) => {
            console.error("Razorpay error:", response.error);
            alert("Payment failed. Please try again.");
        });

        rzp.open();
    };

    //handle payment
    const handlePayment = async () => {
        if (!user || cart.items?.length === 0) return;

        try {
            const items = cart.items.map((item) => ({
                bookId: item.book?._id,
                title: item.book?.title,
                price: item.book?.price,
                qty: item.qty,
                img: item.book?.img
            }));

            const totalAmount = items.reduce(
                (total, item) => total + item.price * item.qty, 0
            );
            if (method === "ONLINE") {
                await handleRazorpay(items, totalAmount);
                return;
            }
            const orderData = {
                userId: user._id,
                items,
                paymentMethod: method,
                totalAmount,
            };

            const res = await api.post("/api/orders", orderData);

            setOrders((prev) => [res.data.order, ...prev]);
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


