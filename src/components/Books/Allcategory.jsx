import React, { useEffect } from 'react'
import { FaStar } from "react-icons/fa6";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../API/Axios';

function Allcategory() {
    const navigate = useNavigate();
    const [book, setBook] = useState([]);
    const [currentpage, setCurrentpage] = useState(1)
    const itemsperpage = 3;
    useEffect(() => {
        api.get(`/allcategary`)
            .then((res) => setBook(res.data))
            .catch((err) => console.error(err))
    }, []);

    const lastindex = currentpage * itemsperpage;
    const firstindex = lastindex - itemsperpage;
    const currentitems = book.slice(firstindex, lastindex);
    const totalpages = Math.ceil(book.length / itemsperpage)
    return (
        <div className='mt-14 mb-12 '>
            <div className='container'>
                {/* header section */}
                <div className='text-center mb-10 max-w-[600px] max-auto w-fit m-auto'>
                    <h1 data-aos="fade-up" className='text-3xl font-bold text-primary'>All Category</h1>
                    <p className='text-xs text-gray-400'>"Discover books that inspire, educate, and transport you to new worlds.Readora is your modern home for stories, knowledge, and imagination.</p>

                </div>
                {/* body section */}

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:gap-5 place-items-center gap-20 '>
                    {/* card section */}
                    {currentitems.map((data) => (
                        <div key={data.id}
                            data-aos="fade-up"
                            data-aos-delay={data.aosDelay}
                            className='space-y-3'>

                            <img src={data.img}
                                className='h-[220px] w-[150px] object-cover rounded-md'
                                alt="" />
                            <div>
                                <h3 className='font-semibold'>{data.type}-{data.author}</h3>
                                <p className='text-sm text-gray-600'>{data.description}</p>

                                <button onClick={() => navigate(`/books/${data.category}`)}
                                    className=" bg-gradient-to-r
                            from-primary
                            to-secondary
                            text-white
                            py-1
                            px-4
                            rounded-full
                            flex
                            items-center
                            gap-2
                            group
                            transition-all
                            duration-200">
                                    View Category</button>
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

export default Allcategory

