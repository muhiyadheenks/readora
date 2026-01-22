import { useEffect, useState } from "react";
import axios from "axios";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaLocationArrow,
    FaMobileAlt,
} from "react-icons/fa";

const BannerImg = {
    backgroundImage: "url(/banner/footer.png)",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%"
};



const Footer = () => {


    return (
        <div style={BannerImg} className="text-white h-fit ">
            <div className="container">
                <div data-aos="zoom-in" className="flex justify-between pb-44 pt-5">
                    {/* company details */}
                    <div className="py-8 px-4">
                        <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
                            <img src="/images/logo1.png" alt="" className="max-w-[50px]" />
                            Readora
                        </h1>
                        <p>
                            Readora is your trusted destination for discovering, reading,</p>
                        <p>and owning books that inspire minds and shape ideas.
                        </p>
                    </div>


                    {/* social links */}

                    <div>
                        <div className="flex items-center gap-3 mt-6">
                            <a href="#">
                                <FaInstagram className="text-3xl" />
                            </a>
                            <a href="#">
                                <FaFacebook className="text-3xl" />
                            </a>
                            <a href="#">
                                <FaLinkedin className="text-3xl" />
                            </a>
                        </div>
                        <div className="mt-6">
                            <div className="flex items-center gap-3">
                                <FaLocationArrow />
                                <p>Thrissur,Kerala</p>
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <FaMobileAlt />
                                <p>+91 9809146613</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>



    );
};

export default Footer;