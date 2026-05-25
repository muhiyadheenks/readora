import React, { useEffect } from "react";
import { useCart } from "../components/Context/Cartcontext";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../components/Context/AuthContext";

function Checkout() {
    const navigate = useNavigate();

    const { user } = useAuth();
    const { cart } = useCart();

    console.log("user", user);
    console.log("cart", cart);

    // Redirect if not logged in
    if (!user) {
        return <Navigate to="/login" />;
    }

    // Check address
    useEffect(() => {
        if (user && !user?.address?.address) {
            alert("Please add your address before placing order");
            navigate("/profile");
        }
    }, [user, navigate]);

    // Calculate total amount
    const totalAmount = cart?.items?.reduce(
        (total, item) =>
            total + Number(item.book?.price || 0) * (item.qty || 1),
        0
    );

    // Place order
    const handlePlaceOrder = () => {
        navigate("/payment");
    };

    return (
        <div className="max-w-4xl mx-auto p-6">

            {/* Heading */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-800">
                    Checkout
                </h1>
            </div>

            {/* Address Section */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-3">
                    Delivery Address
                </h2>

                <div className="text-gray-700 space-y-1">
                    <p>
                        <span className="font-medium">Name:</span>{" "}
                        {user?.name}
                    </p>

                    <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {user?.phone}
                    </p>
                    <div>
                        <p>
                            <span className="font-medium">Address:</span>{" "}
                            {user?.address?.address || "No address added"}
                        </p>
                        <p>{user?.address?.hometown} , {user?.address?.post} (po)</p>
                        <p>pincode: {user?.address?.pincode}</p>
                    </div>
                </div>
            </div>

            {/* Order Items */}
            <div className="bg-white shadow rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                    Order Items
                </h2>

                <div className="space-y-4">

                    {cart?.items?.length > 0 ? (
                        cart.items.map((item) => (

                            <div
                                key={item._id}
                                className="flex items-center justify-between border-b pb-4"
                            >

                                {/* Left Side */}
                                <div className="flex items-center gap-4">

                                    <img
                                        src={item.book?.img}
                                        alt={item.book?.title}
                                        className="w-20 h-28 object-cover rounded"
                                    />

                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            {item.book?.title}
                                        </h3>

                                        <p className="text-gray-500 text-sm">
                                            Qty: {item.qty}
                                        </p>

                                        <p className="text-gray-500 text-sm">
                                            Category: {item.book?.category}
                                        </p>
                                    </div>
                                </div>

                                {/* Right Side */}
                                <div className="text-right">
                                    <p className="text-lg font-bold text-primary">
                                        ₹{item.book?.price}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Subtotal: ₹
                                        {(item.book?.price || 0) * (item.qty || 1)}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">
                            Your cart is empty
                        </p>
                    )}

                </div>
            </div>

            {/* Total */}
            <div className="bg-white shadow rounded-lg p-6">

                <div className="flex justify-between items-center mb-4">

                    <h2 className="text-2xl font-bold">
                        Total Amount
                    </h2>

                    <p className="text-2xl font-bold text-primary">
                        ₹{totalAmount}
                    </p>
                </div>

                <button
                    onClick={handlePlaceOrder}
                    className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition"
                >
                    Place Order
                </button>
            </div>
        </div>
    );
}

export default Checkout;