import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'
import api from '../../API/Axios';

function Hero() {
    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
    };
    const [hero, setHero] = useState([]);
    const { user } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        api.get("/api/hero")
            .then((res) => setHero(res.data))
            .catch((err) => console.error(err));
    }, [])

    return (
        <div className='relative overflow-hidden min-h-[500px] sm:min-h-[650px] bg-gradient-to-br from-[#0a0a0f] to-[#12121a] flex justify-center items-center duration-200'>
            {/* Glowing background orbs for subtle premium feel */}
            <div className='absolute top-[-20%] left-[-10%] w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[120px] z-0'></div>
            <div className='absolute bottom-[-20%] right-[-10%] w-[30vw] h-[30vw] bg-secondary/20 rounded-full blur-[100px] z-0'></div>
            
            {/* hero section */}
            <div className='container px-4 pb-8 sm:pb-0 z-10'>
                <Slider {...settings}>
                    {hero?.map((item) => (
                        <div key={item.id}>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 items-center'>
                                {/* content section */}
                                <div className='flex flex-col justify-center gap-6 text-center sm:text-left order-2 sm:order-1 relative z-10'>
                                    <h1
                                        data-aos="zoom-out"
                                        data-aos-once="true"
                                        data-aos-duration="500"
                                        className='text-4xl sm:text-6xl lg:text-7xl font-extrabold text-gradient drop-shadow-[0_0_10px_rgba(108,99,255,0.4)] leading-tight'
                                    >
                                        {item.title}
                                    </h1>
                                    <p
                                        data-aos="fade-up"
                                        data-aos-once="true"
                                        data-aos-delay="100"
                                        className='text-base sm:text-lg text-textSecondary max-w-lg mx-auto sm:mx-0'
                                    >
                                        {item.description}
                                    </p>
                                    <div data-aos="fade-up" data-aos-once="true" data-aos-delay="300" className='mt-2'>
                                        {user ? (
                                            <h1 className='inline-block bg-gradient-to-r from-primary to-secondary text-white py-3 px-8 rounded-full font-bold text-xl sm:text-2xl shadow-[0_0_20px_rgba(108,99,255,0.6)]'>
                                                Welcome {user.name}
                                            </h1>
                                        ) : (
                                            <button
                                                onClick={() => navigate('/signup')}
                                                className='bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_25px_rgba(108,99,255,0.8)] text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-all duration-300'
                                            >
                                                Explore Now
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* image section */}
                                <div className='order-1 sm:order-2 flex justify-center'>
                                    <div data-aos="zoom-in" data-aos-once="true" className='relative z-10 p-6 animate-[float_6s_ease-in-out_infinite]'>
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            onError={(e) => (e.target.src = "/hero/image1.webp")}
                                            className='w-[200px] h-[300px] sm:h-[450px] sm:w-[300px] object-cover rounded-xl mx-auto shadow-[0_20px_50px_rgba(108,99,255,0.5)] border border-dark-border group-hover:shadow-[0_20px_60px_rgba(0,212,255,0.6)] transition-all duration-500'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
            
            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
            `}</style>
        </div>
    );
};

export default Hero;