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
        api.get(`/api/allcategory`)
            .then((res) => setBook(res.data))
            .catch((err) => console.error(err))
    }, []);

    const lastindex = currentpage * itemsperpage;
    const firstindex = lastindex - itemsperpage;
    const currentitems = book.slice(firstindex, lastindex);
    const totalpages = Math.ceil(book.length / itemsperpage)
    return (
        <div className='mt-14 mb-12'>
            <div className='container'>
                {/* header section */}
                <div className='text-center mb-14 max-w-[600px] mx-auto'>
                    <h1 data-aos="fade-up" className='text-4xl font-extrabold text-gradient mb-4 drop-shadow-[0_0_10px_rgba(108,99,255,0.3)]'>
                        All Categories
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="100" className='text-sm text-textSecondary'>
                        Discover books that inspire, educate, and transport you to new worlds. Readora is your modern home for stories, knowledge, and imagination.
                    </p>
                </div>

                {/* body section */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center'>
                    {/* card section */}
                    {currentitems.map((data) => (
                        <div key={data._id}
                            data-aos="fade-up"
                            data-aos-delay={data.aosDelay}
                            className='group bg-dark-card border border-dark-border p-6 rounded-2xl w-full max-w-[320px] hover:-translate-y-2 hover:border-primary hover:shadow-[0_10px_30px_rgba(108,99,255,0.2)] transition-all duration-300 flex flex-col items-center text-center'
                        >
                            <div className="relative mb-5 overflow-visible">
                                <img src={data.img}
                                    className='h-[240px] w-[160px] object-cover rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(108,99,255,0.5)] transition-all duration-500'
                                    alt={data.type} 
                                />
                            </div>
                            
                            <div className="flex flex-col flex-grow w-full">
                                <h3 className='font-bold text-xl text-textPrimary mb-2 group-hover:text-secondary transition-colors duration-300'>{data.type}</h3>
                                <p className='text-sm text-textSecondary font-medium mb-3'>by {data.author}</p>
                                <p className='text-xs text-textSecondary mb-6 line-clamp-2'>{data.description}</p>

                                <button onClick={() => navigate(`/books/${encodeURIComponent(data.category)}`)}
                                    className="mt-auto border border-primary text-primary hover:bg-primary hover:text-white hover:shadow-[0_0_15px_#6c63ff] py-2 px-6 rounded-full font-medium transition-all duration-300 w-full"
                                >
                                    View Category
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* pagination */}
                <div className="flex justify-center gap-3 mt-14">
                    {[...Array(totalpages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentpage(index + 1)}
                            className={`w-10 h-10 rounded-full font-medium transition-all duration-300 ${
                                currentpage === index + 1
                                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-[0_0_15px_rgba(108,99,255,0.5)]'
                                    : 'bg-dark-card border border-dark-border text-textSecondary hover:border-primary hover:text-primary'
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

export default Allcategory;

