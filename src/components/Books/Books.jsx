import { useEffect } from 'react'
import { FaStar } from "react-icons/fa6";
import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import api from '../../API/Axios';
function Books() {
    const { category } = useParams();
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";



    const [books, setBooks] = useState([])
    const [currentpage, setCurrentpage] = useState(1)
    const itemsperpage = 5;
    useEffect(() => {
        let query = "/allbooks?";

        if (search) query += `title=${search}&`;
        if (category) query += `category=${category}`;

        api.get(query)
            .then(res => setBooks(res.data))
            .catch(err => console.error(err));


    }, [search, category]);

    const lastindex = currentpage * itemsperpage;
    const firstindex = lastindex - itemsperpage;
    const currentitems = books.slice(firstindex, lastindex);
    const totalpages = Math.ceil(books.length / itemsperpage)

    return (
        <div className='mt-14 mb-12 '>
            <div className='container'>
                {/* header section */}
                <div className='text-center mb-10 max-w-[600px] max-auto w-fit m-auto'>
                    <h1 data-aos="fade-up" className='text-3xl font-bold text-primary '>Books</h1>
                    <p className='text-xs text-gray-400'>"Discover books that inspire, educate, and transport you to new worlds.Readora is your modern home for stories, knowledge, and imagination.</p>

                </div>
                {/* body section */}

                <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5  '>
                    {/* card section */}
                    {currentitems.map((book) => (

                        < Link key={book.id} to={`/bookdetailes/${book.id}`}   >
                            <div
                                data-aos="fade-up"
                                data-aos-delay={book.aosDelay}
                                className='space-y-3 p-10 cursor-pointer'>
                                {book.img ? (
                                    <img src={book.img}
                                        className='h-[220px] w-[150px] object-cover rounded-md'
                                        alt={book.type} />) : (<div className="h-[220px] w-[150px] bg-gray-200 flex items-center justify-center rounded-md">

                                            No Image
                                        </div>)
                                }
                                <div>
                                    <h1 className='font-bold'>{book.title}-<span className="text-sm text-gray-500 font-light">{book.author}</span></h1>
                                    <h3 className='text-sm text-gray-800 font-bold'>₹ {book.price}</h3>
                                    <p className='text-sm text-gray-600'>{book.description}</p>
                                    <div className='flex justify-center gap-1 '>
                                        <FaStar className="text-yellow-400" />
                                        <span>{book.rating}</span>

                                    </div>
                                </div>

                            </div>
                        </Link>
                    ))}
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
        </div >
    )
}

export default Books





