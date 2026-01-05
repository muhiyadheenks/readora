import React from 'react'
import Image1 from "../../assets/images/image1.webp";
import Image2 from "../../assets/images/image2.webp"
import Image3 from "../../assets/images/image3.webp"
import Image4 from "../../assets/images/image4.jpg"

const ImageList = [
    {
        id: 1,
        img: Image1,
        title: "upto 50% off on all books",
        description: "Discover books that inspire, educate, and transport you to new worlds.Readora is your modern home for stories, knowledge, and imagination."
    }, {
        id: 2,
        img: Image2,
        title: "upto 50% off on all books",
        description: "Discover books that inspire, educate, and transport you to new worlds.Readora is your modern home for stories, knowledge, and imagination."
    },
    {
        id: 3,
        img: Image3,
        title: "upto 50% off on all books",
        description: "Discover books that inspire, educate, and transport you to new worlds.Readora is your modern home for stories, knowledge, and imagination."
    }
]

function Hero() {
    return (
        <div className='relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200'>
            {/* background pattern */}
            <div className='h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 -z-9'></div>
            {/* hero section */}
            <div className='container pb-8 sm:pb-0'>
                <div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 '>
                        {/* content section */}
                        <div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2sm:order1 relative z-10'>
                            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold'>A New Chapter Begins with Readora</h1>
                            <p className='text-sm'>From timeless classics to trending titles — explore, read, and grow with Readora.</p>
                        </div>
                        <div>
                            <button className='bg-gradient-to-r from-primary to-secondary hover:scale-105 rounded-full'>
                                Order Now
                            </button>
                        </div>

                    </div>
                    {/* image section */}
                    <div className='order-1 sm:order-2'>
                        <div className='relative z-10'>
                            <img src={Image1} alt=""
                                className='w-[300px] h-[300px] sm:h-[450px] sm:w-[450px] sm:scale-125 object-contain mx-auto' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
