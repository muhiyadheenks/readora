import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaGlobe, FaStar, FaUsers, FaTruck, FaShieldAlt } from "react-icons/fa";

function AboutUs() {
    const navigate = useNavigate();
    return (
        <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">

            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-primary to-secondary py-24 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[url('/images/logo1.png')] bg-center bg-no-repeat bg-contain"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl font-bold mb-6">About Readora</h1>
                    <p className="max-w-2xl mx-auto text-lg opacity-90">
                        Your digital destination for discovering, exploring, and enjoying books
                        that inspire imagination, knowledge, and growth.
                    </p>
                    <button
                        onClick={() => navigate('/books')}
                        className="mt-8 bg-white text-primary px-8 py-3 rounded-full font-semibold hover:scale-105 transition duration-200"
                    >
                        Explore Books
                    </button>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div className="p-6">
                            <h3 className="text-4xl font-bold text-primary">500+</h3>
                            <p className="text-gray-500 mt-1">Books Available</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-4xl font-bold text-primary">1000+</h3>
                            <p className="text-gray-500 mt-1">Happy Readers</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-4xl font-bold text-primary">20+</h3>
                            <p className="text-gray-500 mt-1">Categories</p>
                        </div>
                        <div className="p-6">
                            <h3 className="text-4xl font-bold text-primary">4.8★</h3>
                            <p className="text-gray-500 mt-1">Average Rating</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="absolute -top-4 -left-4 w-full h-full bg-primary/10 rounded-3xl"></div>
                        <img
                            src="/images/logo1.png"
                            alt="Readora"
                            className="relative rounded-3xl shadow-2xl w-full max-w-md mx-auto"
                        />
                    </div>
                    <div>
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Mission</span>
                        <h2 className="text-4xl font-bold mt-2 mb-6">
                            Making Reading Accessible for Everyone
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                            We believe books have the power to educate, inspire, and connect
                            people across cultures and ideas. Our mission is to make reading
                            accessible, enjoyable, and meaningful for everyone.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            Whether you love fiction, non-fiction, devotional books, or
                            academic reads, Readora brings them all together in one place.
                        </p>
                        <div className="mt-8 flex gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-primary"></div>
                                <span className="text-sm">Free Delivery</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-secondary"></div>
                                <span className="text-sm">Secure Payment</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-sm">Genuine Books</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-gray-50 dark:bg-gray-800 py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Our Values</span>
                        <h2 className="text-4xl font-bold mt-2">What We Believe In</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {[
                            { icon: <FaBookOpen className="text-3xl text-primary" />, title: "Love for Reading", desc: "We promote the joy of reading and lifelong learning for everyone." },
                            { icon: <FaGlobe className="text-3xl text-primary" />, title: "Accessibility", desc: "Making books easy to discover for readers everywhere." },
                            { icon: <FaStar className="text-3xl text-primary" />, title: "Quality Content", desc: "Carefully curated books across multiple categories." },
                            { icon: <FaUsers className="text-3xl text-primary" />, title: "Community", desc: "Building a community of passionate readers worldwide." },
                            { icon: <FaTruck className="text-3xl text-primary" />, title: "Fast Delivery", desc: "Quick and reliable delivery right to your doorstep." },
                            { icon: <FaShieldAlt className="text-3xl text-primary" />, title: "Secure Shopping", desc: "100% secure payments and buyer protection guaranteed." },
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-200">
                                <div className="mb-4">{item.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-4">Join the Readora Community</h2>
                    <p className="mb-8 opacity-90 max-w-xl mx-auto">
                        Discover books that shape minds, spark creativity, and enrich lives.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <button
                            onClick={() => navigate('/books')}
                            className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:scale-105 transition duration-200"
                        >
                            Explore Books
                        </button>
                        <button
                            onClick={() => navigate('/signup')}
                            className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-primary transition duration-200"
                        >
                            Join Now
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;