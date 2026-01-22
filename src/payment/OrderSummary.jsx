import React, { useState } from "react";

function OrderSummary({ cartItems }) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        payment: "cod"
    });

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.qty,
        0
    );

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Order Placed:", formData, cartItems);
        alert("Order placed successfully!");
    };
    console.log(cart);
    return (
        <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">

            {/* LEFT – SHIPPING FORM */}
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow space-y-4"
            >
                <h2 className="text-2xl font-bold">Shipping Details</h2>

                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <textarea
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                    required
                />

                <div className="flex gap-4">
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    />
                </div>

                {/* PAYMENT */}
                <div>
                    <label className="font-semibold block mb-1">Payment Method</label>
                    <select
                        name="payment"
                        value={formData.payment}
                        onChange={handleChange}
                        className="w-full border p-2 rounded"
                    >
                        <option value="cod">Cash on Delivery</option>
                        <option value="upi">UPI</option>
                        <option value="card">Card</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded hover:opacity-90"
                >
                    Place Order
                </button>
            </form>

            {/* RIGHT – ORDER SUMMARY */}
            <div className="bg-gray-50 p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

                {cartItems.map(item => (
                    <div
                        key={item.id}
                        className="flex justify-between mb-2"
                    >
                        <span>{item.title} × {item.qty}</span>
                        <span>₹ {item.price * item.qty}</span>
                    </div>
                ))}

                <hr className="my-4" />

                <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹ {totalPrice}</span>
                </div>
            </div>
        </div>
    );
}

export default OrderSummary;
