import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import { FaArrowLeft, FaHeart, FaStar } from 'react-icons/fa6';
import { useNavigate, useParams } from 'react-router-dom';
import { useWishList } from '../Context/WishListContext';
import { useCart } from '../Context/Cartcontext';
import { useAuth } from '../Context/AuthContext';
import api from '../../API/Axios';

function BookDetailes() {
    const [currentbook, setCurrentbook] = useState([]);
    const { id } = useParams();
    const { addToWishList } = useWishList();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        api.get(`/allbooks/${id}`)
            .then((res) => setCurrentbook(res.data))
            .catch((error) => console.error(error));
    }, [id]);
    console.log(currentbook);
    return (
        <div className="container mx-auto px-4 py-10">

            {/* Back button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-primary mb-6 hover:underline"
            >
                <FaArrowLeft /> Back
            </button>

            {/* Main card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">

                {/* Book Image */}
                <div className="flex justify-center">
                    <img
                        src={currentbook.img}
                        alt={currentbook.title}
                        className="w-[260px] h-[360px] object-cover rounded-xl shadow-md"
                    />
                </div>

                {/* Book Info */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{currentbook.title}</h1>
                    <p className="text-gray-500">by {currentbook.author}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <FaStar className="text-yellow-400" />
                        <span className="font-semibold">{currentbook.rating}</span>
                        <span className="text-gray-400 text-sm">(Reviews)</span>
                    </div>

                    {/* Category */}
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                        {currentbook.category}
                    </span>

                    {/* Price */}
                    <h2 className="text-2xl font-bold text-green-600">
                        ₹ {currentbook.price}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                        {currentbook.description}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-4 pt-4">
                        <button onClick={() => navigate("/chekout")}
                            className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-full hover:scale-105 duration-300">
                            Buy Now
                        </button>

                        <button onClick={() => addToCart(currentbook)}
                            className="flex items-center gap-2 border border-primary text-primary px-5 py-2 rounded-full hover:bg-primary hover:text-white duration-300">
                            <FaShoppingCart /> Add to Cart
                        </button>

                        <button onClick={() => addToWishList(currentbook)}
                            className="p-3 rounded-full text-primary border hover:bg-red-500 hover:text-white duration-300">
                            <FaHeart />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetailes
