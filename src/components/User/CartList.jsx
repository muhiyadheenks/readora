
import { useCart } from "../Context/Cartcontext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { usePayment } from "../Context/PaymentContext";

function CartList() {



    const { user } = useAuth();
    const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();
    const { payment } = usePayment();


    if (cart.length === 0) {
        return (
            <div className="container mt-20 text-center">
                <h2 className="text-2xl font-bold">Your cart is empty 🛒</h2>
            </div>
        );
    }


    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const navigate = useNavigate()


    return (

        <div className="container mt-20">
            <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

            {cart.map((item) => (
                <div
                    key={item.id}
                    className="flex items-center justify-between bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 mb-4"
                >
                    {/* Image */}
                    <img
                        src={item.img}
                        alt={item.title}
                        className="w-20 h-28 object-cover rounded"
                    />

                    {/* Info */}
                    <div className="flex-1 ml-4">
                        <h2 className="text-lg font-semibold">{item.title}</h2>
                        <p className="text-sm text-gray-500">{item.author}</p>
                        <p className="font-bold mt-1">₹{item.price}</p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => decreaseQty(item.id)}
                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
                        >
                            <FaMinus />
                        </button>

                        <span className="font-bold">{item.qty}</span>

                        <button
                            onClick={() => increaseQty(item.id)}
                            className="p-2 bg-gray-200 dark:bg-gray-700 rounded"
                        >
                            <FaPlus />
                        </button>
                    </div>

                    {/* Remove */}
                    <button
                        onClick={() => removeFromCart(item.id)}
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
                <button onClick={() => navigate('/chekout')}
                    className="mt-4 bg-primary text-white px-6 py-2 rounded-full">
                    Checkout
                </button>
            </div>
        </div>
    );
}

export default CartList;
