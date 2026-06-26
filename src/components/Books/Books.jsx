
import { useEffect } from 'react'
import { FaStar } from "react-icons/fa6";
import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import api from '../../API/Axios';
function Books() {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("title") || "";


    const [books, setBooks] = useState([])
    const [currentpage, setCurrentpage] = useState(1)
    const itemsperpage = 5;
    useEffect(() => {

        const params = new URLSearchParams();
        if (search) params.append("title", search);
        if (category) params.append("category", category);

        const query = `/api/books?${params.toString()}`;
        const token = localStorage.getItem("token");


        api.get(query, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setBooks(res.data);
                setCurrentpage(1)
            })
            .catch(err => console.error(err));


    }, [search, category]);

    const lastindex = currentpage * itemsperpage;
    const firstindex = lastindex - itemsperpage;
    const currentitems = books.slice(firstindex, lastindex);
    const totalpages = Math.ceil(books.length / itemsperpage)

    return (
        <div className='mt-14 mb-12'>
            <div className='container'>
                {/* header section */}
                <div className='text-center mb-14 max-w-[600px] mx-auto'>
                    <h1 data-aos="fade-up" className='text-4xl font-extrabold text-gradient mb-4 drop-shadow-[0_0_10px_rgba(108,99,255,0.3)]'>
                        Books
                    </h1>
                    <p data-aos="fade-up" data-aos-delay="100" className='text-sm text-textSecondary'>
                        Discover books that inspire, educate, and transport you to new worlds. Readora is your modern home for stories, knowledge, and imagination.
                    </p>
                </div>

                {/* body section */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 place-items-center'>
                    {/* card section */}
                    {currentitems.map((book) => (
                        <Link key={book._id} to={`/bookdetailes/${book._id}`} className='w-full flex justify-center'>
                            <div
                                data-aos="fade-up"
                                data-aos-delay={book.aosDelay}
                                className='group bg-dark-card border border-dark-border p-5 rounded-2xl w-full max-w-[260px] h-full hover:-translate-y-2 hover:border-primary hover:shadow-[0_10px_30px_rgba(108,99,255,0.2)] transition-all duration-300 flex flex-col items-center text-center cursor-pointer'
                            >
                                <div className="relative mb-5 overflow-visible">
                                    {book.img ? (
                                        <img src={book.img}
                                            className='h-[200px] w-[140px] object-cover rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(108,99,255,0.5)] transition-all duration-500'
                                            alt={book.type} 
                                        />
                                    ) : (
                                        <div className="h-[200px] w-[140px] bg-dark-border text-textSecondary flex items-center justify-center rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-all duration-500">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex flex-col flex-grow w-full">
                                    <h1 className='font-bold text-lg text-textPrimary mb-1 line-clamp-1 group-hover:text-secondary transition-colors duration-300'>
                                        {book.title}
                                    </h1>
                                    <span className="text-sm text-textSecondary font-medium mb-2 line-clamp-1">by {book.author}</span>
                                    <h3 className='text-lg text-primary font-bold mb-2'>₹ {book.price}</h3>
                                    <p className='text-xs text-textSecondary mb-4 line-clamp-2'>{book.description}</p>
                                    
                                    <div className='flex justify-center items-center gap-2 mt-auto bg-dark-bg py-1.5 px-3 rounded-full border border-dark-border mx-auto w-fit'>
                                        <FaStar className="text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]" />
                                        <span className="text-sm font-semibold text-textPrimary">{book.rating}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
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

export default Books;
