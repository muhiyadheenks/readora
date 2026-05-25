import { useEffect, useState } from "react"
import { FaEye, FaTrash } from "react-icons/fa"
import api from "../../API/Axios"

const AdminOrders = () => {
    const [orders, setOrders] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null);
    console.log('selected orseer', selectedOrder);

    useEffect(() => {
        api.get("/api/admin-orders")
            .then(res => setOrders(res.data))
            .catch(err => console.error(err))
    }, [])

    const deleteOrder = async (id) => {
        if (window.confirm("Delete this order?"))
            try {
                await api.delete(`/orders/${id}`)
                setOrders(prev => prev.filter((o) => o._id !== id))  // ✅ fixed: o.id → o._id
            } catch (error) {
                console.error("Delete failed", error)
            }
    }

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, { status: newStatus })
            setOrders(prev =>
                prev.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            )
        } catch (error) {
            console.error("Status update failed", error)
        }
    }

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
                            <tr key={order._id} className="border-t hover:bg-gray-50">
                                <td className="p-3 font-mono text-xs">{order._id}</td>
                                <td className="p-3">{order.user?.name}</td>
                                <td className="p-3">{order.user?.email}</td>
                                <td className="p-3 font-medium">₹ {order.totalAmount}</td>

                                <td className="p-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                        ${order.paymentMethod === "Paid"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {order.paymentMethod}
                                    </span>
                                </td>

                                <td className="p-3">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        className={`px-3 py-1 rounded-full text-xs font-semibold outline-none cursor-pointer
                                            ${order.status === "Delivered"
                                                ? "bg-green-100 text-green-700"
                                                : order.status === "Processing"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-red-100 text-red-700"
                                            }`}
                                    >
                                        <option value="Processing">Processing</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>

                                <td className="p-3">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>

                                <td className="p-3 text-center space-x-3">
                                    {/* 👁 View button */}
                                    <button
                                        onClick={() => setSelectedOrder(order)}
                                        className="text-blue-500 hover:text-blue-700"
                                        title="View order"
                                    >
                                        <FaEye />
                                    </button>

                                    <button
                                        onClick={() => deleteOrder(order._id)}
                                        className="text-red-600 hover:text-red-800"
                                        title="Delete order"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            {selectedOrder && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-[480px] max-h-[90vh] overflow-y-auto shadow-xl">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-lg font-bold">Order Details</h2>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-400 hover:text-gray-700 text-2xl leading-none"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Order ID & Date */}
                        <div className="bg-gray-50 rounded-lg p-3 mb-4 text-xs space-y-1">
                            <p><span className="text-gray-500">Order ID: </span>
                                <span className="font-mono font-medium">{selectedOrder._id}</span></p>
                            <p><span className="text-gray-500">Date: </span>
                                {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                        </div>

                        {/* Customer Info */}
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold text-gray-600 mb-2">Customer</h3>
                            <div className="space-y-1 text-sm divide-y divide-gray-100">
                                <div className="flex justify-between py-1.5">
                                    <span className="text-gray-500">Name</span>
                                    <span className="font-medium">{selectedOrder.user?.name}</span>
                                </div>
                                <div className="flex justify-between py-1.5">
                                    <span className="text-gray-500">Email</span>
                                    <span>{selectedOrder.user?.email}</span>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        {selectedOrder.items?.length > 0 && (
                            <div className="mb-4">
                                <h3 className="text-sm font-semibold text-gray-600 mb-2">Items</h3>
                                <div className="space-y-2">
                                    {selectedOrder.items.map((item, i) => (
                                        <div key={i} className="flex justify-between items-center text-sm bg-gray-50 rounded px-3 py-2">
                                            <div>
                                                <p className="font-medium">{item.title}</p>
                                                <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                                            </div>
                                            <span className="font-medium">₹ {item.price}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Payment & Status */}
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold text-gray-600 mb-2">Payment & Status</h3>
                            <div className="space-y-1 text-sm divide-y divide-gray-100">
                                <div className="flex justify-between py-1.5">
                                    <span className="text-gray-500">Method</span>
                                    <span className="font-medium">{selectedOrder.paymentMethod}</span>
                                </div>
                                <div className="flex justify-between py-1.5">
                                    <span className="text-gray-500">Total</span>
                                    <span className="font-bold text-base">₹ {selectedOrder.totalAmount}</span>
                                </div>
                                <div className="flex justify-between py-1.5">
                                    <span className="text-gray-500">Status</span>
                                    <span className={`font-semibold
                                        ${selectedOrder.status === "Delivered" ? "text-green-600"
                                            : selectedOrder.status === "Processing" ? "text-blue-600"
                                                : "text-red-600"}`}>
                                        {selectedOrder.status}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        {selectedOrder.shippingAddress && (
                            <div className="mb-5">
                                <h3 className="text-sm font-semibold text-gray-600 mb-2">Shipping Address</h3>
                                <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3 leading-relaxed">
                                    {selectedOrder.shippingAddress.street}, {selectedOrder.shippingAddress.city},{" "}
                                    {selectedOrder.shippingAddress.state} - {selectedOrder.shippingAddress.pincode}
                                </p>
                            </div>
                        )}

                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="w-full py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdminOrders