

import { useCart } from "../Context/Cartcontext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function CartList() {
    const { user } = useAuth();
    const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    if (!cart.items || cart.items.length === 0) {
        return (
            <div className="container mt-20 text-center">
                <h2 className="text-2xl font-bold">Your cart is empty 🛒</h2>
            </div>
        );
    }

    const totalPrice = cart.items?.reduce(
        (sum, item) => sum + (item.book?.price || 0) * item.qty,
        0
    );

    return (
        <div className="container mt-20">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            {cart.items?.map((item) => (
                <div
                    key={item._id}
                    className="flex items-center justify-between bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 mb-4"
                >
                    {/* Image */}
                    <img
                        src={item.book?.img}
                        alt={item.book?.title}
                        className="w-20 h-28 object-cover rounded"
                    />

                    {/* Info */}
                    <div className="flex-1 ml-4">
                        <h2 className="text-lg font-semibold">{item.book?.title}</h2>
                        <p className="text-sm text-gray-500">{item.book?.author}</p>
                        <p className="font-bold mt-1">₹{item.book?.price}</p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => decreaseQty(item.book?._id)}
                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
                        >
                            <FaMinus />
                        </button>

                        <span className="font-bold">{item.qty}</span>

                        <button
                            onClick={() => increaseQty(item.book?._id)}
                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
                        >
                            <FaPlus />
                        </button>
                    </div>

                    {/* Remove */}
                    <button
                        onClick={() => removeFromCart(item.book?._id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                    >
                        <FaTrash />
                    </button>
                </div>
            ))}

            {/* Total */}
            <div className="text-right mt-6">
                <h2 className="text-xl font-bold">
                    Total: ₹{totalPrice}
                </h2>
                <button
                    onClick={() => clearCart()}
                    className="mt-4 mr-4 bg-red-500 text-white px-6 py-2 rounded-full">
                    Clear Cart
                </button>
                <button
                    onClick={() => navigate('/checkout')}
                    className="mt-4 bg-primary text-white px-6 py-2 rounded-full">
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default CartList;