import React, { useEffect, useState } from 'react'
import { FaHeart, FaStar } from 'react-icons/fa6';
import { useCart } from '../Context/Cartcontext';
import { FaShoppingCart } from 'react-icons/fa';
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useWishList } from '../Context/WishListContext';
import api from '../../API/Axios';

function TopBooks() {
    const { addToWishList } = useWishList();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [topproducts, setTopproducts] = useState([]);


    const [currentpage, setCurrentpage] = useState(1)
    const itemsperpage = 3;
    useEffect(() => {
        api.get("/bestbooks")
            .then((res) => setTopproducts(res.data))
            .catch((err) => console.error(err))
    }, []);
    if (!topproducts) {
        return <div>Loading...</div>;
    }
    const lastindex = currentpage * itemsperpage;
    const firstindex = lastindex - itemsperpage;
    const currentitems = topproducts.slice(firstindex, lastindex);
    const totalpages = Math.ceil(topproducts.length / itemsperpage)


    return (
        <div className='min-h-screen'>
            <div className='container '>
                {/* headear */}
                <div className='text-center mb-10 max-w-[600px] max-auto w-fit m-auto'>
                    <p data-aos="fade-up" className='text-sm text-primary '>Top Rated Books for you</p>
                    <h1 data-aos="fade-up" className='text-3xl font-bold'>Best Books</h1>
                    <p className='text-xs text-gray-400'>"Discover books that inspire, educate, and transport you to new worlds.Readora is your modern home for stories, knowledge, and imagination.</p>
                </div>
                {/* body */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-5 place-items-center gap-10'>
                    {currentitems.map((item) => (
                        <div key={item.id} data-aos="zoom-in" className='rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:bg-primary hover:text-white relative shadow-xl duration-300 group max-w-[400px] w-[200px] h-[350px]'>
                            <button onClick={() => addToWishList(item)} className='absolute top-3 right-1 bg-white p-2 rounded-full shadow text-red-500 hover:scale-110 transition text-2xl'>
                                <FaHeart /></button>
                            {/* image section */}
                            <div className='w-full flex items-center justify-center  h-[160px]'>
                                <img src={item.img} alt=''
                                    className='w-[140px] h-[160px] object-contain transform group-hover:scale-105 duration-300'
                                />
                            </div>
                            {/* details section */}
                            <div className='p-4 text-center '>
                                <h1 className='text-xl font-bold'>{item.title}</h1>
                                <p className='text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2 '>
                                    {item.description}
                                </p>
                                <h2 className='text-xl font-bold'>₹ {item.price}</h2>
                                {/* star rating */}
                                <div className='flex justify-start gap-1 '>
                                    <FaStar className="text-yellow-400" />
                                    <span>{item.rating}</span>
                                </div>
                                <div className='flex justify-between'>
                                    {user &&
                                        <button onClick={() => navigate("/chekout")}
                                            className='bg-primary hover:scale-105 duration-300 text-white py-1 px-3 rounded-full mt-2 group-hover:bg-white group-hover:text-primary'>
                                            Buy
                                        </button>
                                    }
                                    {user && (
                                        <button
                                            onClick={() => addToCart(item)} className='bg-primary hover:scale-105 duration-300 text-white py-1 px-3 rounded-full mt-2 group-hover:bg-white group-hover:text-primary'
                                        >
                                            <FaShoppingCart />
                                        </button>)
                                    }
                                </div>
                            </div>

                        </div>
                    ))
                    }
                </div>
                <div className="flex justify-center gap-3 mt-10">
                    {[...Array(totalpages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentpage(index + 1)}
                            className={`px-3 py-1 rounded ${currentpage === index + 1
                                ? 'bg-primary text-white'
                                : 'bg-gray-300'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TopBooks
