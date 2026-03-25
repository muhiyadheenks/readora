import React, { useEffect, useState } from "react";
import api from "../../API/Axios";

const Revenue = () => {
    const [orders, setOrders] = useState([])
    useEffect(() => {
        api.get('/orders')
            .then(res => setOrders(res.data))
    }, [])
    const today = new Date().toISOString().split("T")[0];
    const now = new Date();

    const toNumber = (value) => Number(value) || 0;

    const totalRevenue = orders.reduce(
        (sum, order) => sum + toNumber(order.totalAmount),
        0
    );

    const todayRevenue = orders
        .filter(order => order.date?.startsWith(today))
        .reduce(
            (sum, order) => sum + toNumber(order.totalAmount),
            0
        );

    const monthlyRevenue = orders
        .filter(order => {
            const d = new Date(order.date);
            return !isNaN(d) &&
                d.getMonth() === now.getMonth() &&
                d.getFullYear() === now.getFullYear();
        })
        .reduce(
            (sum, order) => sum + toNumber(order.totalAmount),
            0
        );

    const totalOrders = orders.length;

    const stats = [
        { title: "Total Revenue", value: `₹${totalRevenue}` },
        { title: "Today Revenue", value: `₹${todayRevenue}` },
        { title: "Monthly Revenue", value: `₹${monthlyRevenue}` },
        { title: "Total Orders", value: totalOrders },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((item, index) => (
                <div
                    key={index}
                    className="bg-white rounded-2xl shadow-md p-6"
                >
                    <p className="text-sm text-gray-500">{item.title}</p>
                    <h2 className="text-black text-2xl font-bold mt-2">
                        {item.value}
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default Revenue;
