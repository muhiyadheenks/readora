


// import { useOrder } from '../Context/OrderContext';

// function OrderList() {
//     const { orders } = useOrder();


//     if (!orders || orders.length === 0) {
//         return <p>No orders found</p>;
//     }

//     return (
//         <div className="">
//             {orders.map((order, orderIndex) => (
//                 <div
//                     key={`order-${orderIndex}`}
//                     className="border p-4 rounded shadow"
//                 >
//                     <div>

//                         <h2 className="font-bold text-lg mb-2">
//                             Order #{orderIndex + 1}
//                         </h2>

//                         <p>Status: {order.status}</p>
//                         <p>Payment: {order.paymentMethod}</p>
//                         <p>Total: ₹{order.totalAmount}</p>
//                         <p>{order.items?.price}</p>

//                         <h3 className="font-semibold mt-3">Items</h3>
//                     </div>

//                     {order.items.map((item, itemIndex) => (
//                         <div
//                             key={`${item.id}-${itemIndex}`}
//                             className="ml-4 "
//                         >

//                             <div>
//                                 <p>Title :{item.title}</p>
//                                 <p>
//                                     Price: ₹{item.price}
//                                 </p>
//                                 <p>Quantity :{item.qty}</p>
//                                 <p>Totel Amount:{order.totalAmount}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default OrderList;
import { useOrder } from '../Context/OrderContext';

function OrderList() {

    const { orders } = useOrder();

    if (!orders || orders.length === 0) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-gray-500 text-lg font-medium">
                    No orders found
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

            {orders.map((order, orderIndex) => (

                <div
                    key={`order-${orderIndex}`}
                    className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden"
                >

                    {/* HEADER */}
                    <div className="bg-gray-100 px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Order #{orderIndex + 1}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Payment: {order.paymentMethod}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">

                            <span className="px-4 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700 capitalize">
                                {order.status}
                            </span>

                            <div className="text-right">
                                <p className="text-sm text-gray-500">
                                    Total
                                </p>

                                <h3 className="text-2xl font-bold text-green-600">
                                    ₹{order.totalAmount}
                                </h3>
                            </div>
                        </div>
                    </div>


                    {/* ITEMS */}
                    <div className="p-6 space-y-4">

                        {order.items.map((item, itemIndex) => (

                            <div
                                key={`${item._id}-${itemIndex}`}
                                className="border rounded-xl p-4 hover:shadow-md transition duration-300"
                            >

                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                    {/* LEFT */}
                                    <div className="flex items-center gap-4">

                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-20 h-24 object-cover rounded-lg border"
                                        />

                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {item.title}
                                            </h3>

                                            <p className="text-gray-500 text-sm mt-1">
                                                Quantity: {item.qty}
                                            </p>
                                        </div>
                                    </div>

                                    {/* RIGHT */}
                                    <div className="text-right">

                                        <p className="text-sm text-gray-500">
                                            Price
                                        </p>

                                        <h3 className="text-xl font-bold text-gray-800">
                                            ₹{item.price}
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-2">
                                            Subtotal: ₹{item.price * item.qty}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OrderList;