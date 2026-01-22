import React from 'react'
import { GrSecure } from "react-icons/gr";
import { FaThLarge } from "react-icons/fa";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { IoPricetags } from "react-icons/io5";
import { FaShippingFast } from "react-icons/fa";
function Banner() {

    return (
        <div className='min-h-screen flex justify-center items-center py-12 sm:py-0'>
            <div className='container'>

                <div className="flex -reverse sm:flex-row items-center gap-10 sm:gap-20">
                    {/* image section */}
                    <div>
                        <img
                            src="/banner/banner.png"
                            alt=""
                            className="max-w-[400px] h-[400px] w-full mx-auto object-cover"
                        /><br /><br />

                        <h1 data-aos="fade-up" className='text-3xl sm:text-4xl font-bold'>
                            🔥 Up to 50% Off on Bestselling Books

                        </h1><br />
                        <p data-aos="fade-up" className='text-sm text-gray-500 tracking-wide leading-5'>
                            Upgrade your library today!
                        </p>
                    </div>
                    {/* details section */}
                    < div className='flex flex-col justify-center gap-6 sm:pt-0 ' >
                        <div className='flex flex-col gap-4 '>
                            <div data-aos="fade-up" className='flex items-center gap-4'>
                                <FaThLarge className='text-5xl h-12w-12 
                                    shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400'/>
                                <p>Millions of books</p>
                            </div> <div data-aos="fade-up" className='flex items-center gap-4'>
                                <VscWorkspaceTrusted className='text-5xl h-12w-12
                                    shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400'/>
                                <p>Genuine books</p>
                            </div> <div data-aos="fade-up" className='flex items-center gap-4'>
                                <IoPricetags className='text-5xl h-12w-12
                                    shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400'/>
                                <p>Great pricing</p>
                            </div>
                            <div data-aos="fade-up" className='flex items-center gap-4'>
                                <FaShippingFast className='text-5xl h-12w-12
                                    shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400'/>
                                <p>Faster delivery</p>
                            </div>
                            <div data-aos="fade-up" className='flex items-center gap-4'>
                                <GrSecure className='text-5xl h-12w-12
                                    shadow-sm p-4 rounded-full bg-violet-100 dark:bg-violet-400'/>
                                <p>Secure Payment</p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div >
    )
}

export default Banner
