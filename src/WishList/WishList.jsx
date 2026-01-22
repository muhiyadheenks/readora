import { Link } from "react-router-dom";
import { useWishList } from "../components/Context/WishListContext";

function WishList() {
    const { wishList, removeFromWishList } = useWishList();
    console.log(wishList);


    return (
        <>
            <div className="max-w-5xl mx-auto p-20">
                <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
                {wishList.length === 0 ? (
                    <p>
                        Wishlist is empty.{" "}
                        <Link to="/products" className="text-amber-600 underline">
                            Shop now
                        </Link>
                    </p>
                ) : (
                    <ul className="space-y-4">
                        {wishList.map(item => (
                            <li
                                key={item.id}
                                className="flex items-center justify-between bg-white p-4 rounded shadow"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={item.img}
                                        alt={item.title}
                                        className="w-20 h-20 object-contain"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>

                                        <p className="text-amber-600 font-bold">₹ {item.price}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => removeFromWishList(item.id)}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
}

export default WishList