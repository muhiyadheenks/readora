


import { useOrder } from '../Context/OrderContext';

function OrderList() {
    const { orders } = useOrder();

    if (!orders || orders.length === 0) {
        return <p>No orders found</p>;
    }

    return (
        <div className="">
            {orders.map((order, orderIndex) => (
                <div
                    key={`order-${orderIndex}`}
                    className="border p-4 rounded shadow"
                >
                    <div>

                        <h2 className="font-bold text-lg mb-2">
                            Order #{orderIndex + 1}
                        </h2>

                        <p>Status: {order.status}</p>
                        <p>Payment: {order.paymentMethod}</p>
                        <p>Total: ₹{order.totalAmount}</p>
                        <p>{order.items?.price}</p>

                        <h3 className="font-semibold mt-3">Items</h3>
                    </div>

                    {order.items.map((item, itemIndex) => (
                        <div
                            key={`${item.id}-${itemIndex}`}
                            className="ml-4 "
                        >

                            <div>
                                <p>Title :{item.title}</p>
                                <p>
                                    Price: ₹{item.price}
                                </p>
                                <p>Quantity :{item.qty}</p>
                                <p>Totel Amount:{order.totalAmount}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default OrderList;
