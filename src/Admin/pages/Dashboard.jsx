import {
    FaUsers,
    FaShoppingCart,
    FaBook,
    FaRupeeSign,
} from "react-icons/fa"
import StatCard from "../components/StatCard"
import { useEffect, useState } from "react"
import api from "../../API/Axios"
import RevenueChart from "../chart/RevenueChart"
import AOVChart from "../chart/AOVChart"

const Dashboard = () => {
    const [users, setusers] = useState([])
    const [orders, setOrders] = useState([])
    const [books, setBooks] = useState([])
    useEffect(() => {
        api.get('/users')
            .then(res => setusers(res.data))
        api.get('/orders')
            .then(res => setOrders(res.data))
        api.get('/allbooks')
            .then(res => setBooks(res.data))

    }, [])
    const totalRevenue = orders.reduce(
        (sum, order) => sum + order.totalAmount,
        0

    );

    const revenueData = orders.reduce((acc, order) => {
        const date = new Date(order.orderDate).toLocaleDateString()

        const existing = acc.find(item => item.date === date)

        if (existing) {
            existing.revenue += order.totalAmount
        } else {
            acc.push({
                date,
                revenue: order.totalAmount
            })
        }

        return acc
    }, [])
    const aovData = orders.reduce((acc, order) => {
        const date = new Date(order.orderDate).toLocaleDateString();

        const existing = acc.find(item => item.date === date);

        if (existing) {
            existing.total += order.totalAmount;
            existing.count += 1;
            existing.aov = Math.round(existing.total / existing.count);
        } else {
            acc.push({
                date,
                total: order.totalAmount,
                count: 1,
                aov: order.totalAmount
            });
        }

        return acc;
    }, []);


    return (
        <div className="space-y-6 text-black">
            {/* Page title */}
            <div className="flex ">
                <h1 className="text-2xl font-bold text-gray-800">
                    Admin Dashboard
                </h1>

            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Users"
                    value={users.length}
                    icon={<FaUsers />}
                    to="/admin/users"

                />
                <StatCard
                    title="Orders"
                    value={orders.length}
                    icon={<FaShoppingCart />}
                    to="/admin/adminorders"
                />
                <StatCard
                    title="Books"
                    value={books.length}
                    icon={<FaBook />}
                    to="/admin/adminbooks"
                />
                <StatCard
                    title="Revenue"
                    value={`₹ ${totalRevenue}`}
                    icon={<FaRupeeSign />}
                    to="/admin/revenue"
                />

            </div>

            Recent section
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueChart data={revenueData} />
                <AOVChart data={aovData} />

            </div>
        </div>
    )
}

export default Dashboard

