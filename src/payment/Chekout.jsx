import React, { useEffect } from "react";
import { useCart } from "../components/Context/Cartcontext";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../components/Context/AuthContext";

function Checkout() {
    const navigate = useNavigate();

    const { user } = useAuth();
    const { cart = [] } = useCart();

    if (!user) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        if (user && !user.address) {
            alert("Please add your address in profile before placing order");
            navigate("/profile");
        }
    }, [user, navigate]);

    const totalAmount = cart.reduce(
        (total, item) => total + Number(item.price) * (item.quantity || 1),
        0
    );



    const handlePlaceOrder = () => {
        navigate("/payment");
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">

            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            {/* Address */}
            <div className="mb-4">
                <h2 className="font-semibold">Delivery Address</h2>
                <p>{user.address || "No address added"}</p>
            </div>


            {/* Items */}
            <div className="mb-4">
                <h2 className="font-semibold">Order Items</h2>
                {cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                        <p>{item.title}</p>
                        <p>₹{item.price}</p>
                    </div>
                ))}
            </div>

            {/* Total */}
            <h2 className="text-xl font-bold mb-4">
                Total: ₹{totalAmount}
            </h2>

            <button
                onClick={handlePlaceOrder}
                className="w-full bg-primary text-white py-2 rounded"
            >
                Place Order
            </button>
        </div>
    );
}

export default Checkout;
