import React, { useEffect } from 'react'
import { FaStar } from "react-icons/fa6";
import { useState } from 'react';
import axios from 'axios';

function Books() {
    const [book, setBook] = useState([]);
    useEffect(() => {
        axios("http://localhost:3000/fiction")
            .then((res) => setBook(res.data))
            .catch((err) => console.erorr(err))
    }, [])

    return (
        <div className='mt-14 mb-12'>
            <div className='container'>
                {/* header section */}
                <div className='text-center mb-10 max-w-[600px] max-auto'>
                    <p className='text-sm text-primary '>Top Selling Products for you</p>
                    <h1 className='text-3xl font-bold'>Products</h1>
                    <p className='text-xs text-gray-400'>"Discover books that inspire, educate, and transport you to new worlds.Readora is your modern home for stories, knowledge, and imagination.</p>

                </div>
                {/* body section */}

                <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5 '>
                    {/* card section */}
                    {book.map((data) => (
                        <div key={data.id} className='space-y'>

                            <img src={data.img}
                                className='h-[220px] w-[150px] object-cover rounded-md'
                                alt="" />
                            <div>
                                <h3 className='font-semibold'>{data.title}-{data.author}</h3>
                                <p className='text-sm text-gray-600'>{data.description}</p>
                                <div className='flex justify-center gap-1 '>
                                    <FaStar className="text-yellow-400" />
                                    <span>{data.rating}</span>
                                </div>
                            </div>
                        </div>
                    ))
                    }

                </div>

            </div>
        </div>
    )
}

export default Books

