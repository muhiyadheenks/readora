import { useEffect, useState } from "react"
import { FaEye, FaTrash } from "react-icons/fa"
import api from "../../API/Axios"

const AdminOrders = () => {
    const [user, setUser] = useState([])
    const [orders, setOrders] = useState([])

    useEffect(() => {
        api.get("/orders")
            .then(res => setOrders(res.data))
            .catch(err => console.error(err))
    }, [])
    console.log(orders, 'admin')

    const deleteOrder = async (id) => {
        if (window.confirm("Delete this order?"))
            try {
                api.delete(`/orders/${id}`);
                setOrders(prev => prev.filter((o) => o.id !== id))
            } catch (error) {
                console.error("Delete failed", error);

            }
    }
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, {
                status: newStatus,
            });

            setOrders(prev =>
                prev.map(order =>
                    order._id === orderId
                        ? { ...order, status: newStatus }
                        : order
                )
            );
        } catch (error) {
            console.error("Status update failed", error);
        }
    };


    return (
        <div className="p-6 space-y-6 bg-gray-100 min-h-screen text-black">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Orders Management</h1>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="w-full text-sm">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="p-3 text-left">Order ID</th>
                            <th className="p-3 text-left">Customer</th>
                            <th className="p-3 text-left">Email</th>
                            <th className="p-3 text-left">Total</th>
                            <th className="p-3 text-left">Payment</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-left">Date</th>
                            <th className="p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.length === 0 && (
                            <tr>
                                <td colSpan="8" className="text-center p-4 text-gray-500">
                                    No orders found
                                </td>
                            </tr>
                        )}

                        {orders.map((order) => (
                            <tr
                                key={order.id}
                                className="border-t hover:bg-gray-50"
                            >
                                <td className="p-3 font-medium">{order.id}</td>
                                <td className="p-3">{order.name}</td>
                                <td className="p-3">{order.email}</td>
                                <td className="p-3">₹ {order.totalAmount}</td>

                                <td className="p-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${order.payment === "Paid"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {order.paymentMethod}
                                    </span>
                                </td>


                                <td className="p-3">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className={`px-3 py-1 rounded-full text-xs font-semibold outline-none
                                            ${order.status === "Delivered"
                                                ? "bg-green-100 text-green-700"
                                                : order.status === "Processing"
                                                    ? " text-blue-700"
                                                    : " text-red-700"
                                            }`}
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>



                                <td className="p-3">{new Date(order.orderDate).toLocaleDateString()}
                                </td>

                                <td className="p-3 text-center space-x-3">

                                    <button
                                        onClick={() => deleteOrder(order.id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminOrders
