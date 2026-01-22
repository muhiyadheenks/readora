import React from "react";
import { useNavigate } from "react-router-dom";

function AboutUs() {
    const navigate = useNavigate();
    return (
        <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            {/* Hero Section */}
            <section className="bg-primary/10 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-primary">
                        About Readora
                    </h1>
                    <p className="max-w-3xl mx-auto text-lg">
                        Readora is your digital destination for discovering, exploring, and
                        enjoying books that inspire imagination, knowledge, and growth.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-14">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
                    <img
                        src="/images/logo1.png"
                        alt="Books"
                        className="rounded-2xl shadow-lg"
                    />

                    <div>
                        <h2 className="text-3xl font-semibold mb-4">
                            Our Mission
                        </h2>
                        <p className="mb-4 text-gray-600 dark:text-gray-400">
                            Our mission is to make reading accessible, enjoyable, and
                            meaningful for everyone. We believe books have the power to
                            educate, inspire, and connect people across cultures and ideas.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                            Whether you love fiction, non-fiction, devotional books, or
                            academic reads, Readora brings them all together in one place.
                        </p>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-gray-50 dark:bg-gray-800 py-14">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center mb-10">
                        What We Believe In
                    </h2>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
                            <h3 className="text-xl font-semibold mb-2">📚 Love for Reading</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                We promote the joy of reading and lifelong learning.
                            </p>
                        </div>

                        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
                            <h3 className="text-xl font-semibold mb-2">🌍 Accessibility</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Making books easy to discover for readers everywhere.
                            </p>
                        </div>

                        <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow">
                            <h3 className="text-xl font-semibold mb-2">✨ Quality Content</h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Carefully curated books across multiple categories.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 text-center">
                <h2 className="text-3xl font-bold mb-4">
                    Join the Readora Community
                </h2>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                    Discover books that shape minds, spark creativity, and enrich lives.
                </p>
                <button
                    onClick={() => navigate('/books')}
                    className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition">
                    Explore Books
                </button>
            </section>
        </div>
    );
}

export default AboutUs;
