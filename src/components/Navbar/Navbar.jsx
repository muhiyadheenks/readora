import React, { useEffect, useRef, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/Cartcontext';
import { FaCartShopping, FaHeart } from 'react-icons/fa6';
import { useWishList } from '../Context/WishListContext';
import { HiMenu, HiX } from 'react-icons/hi';

const navbar = [
    { id: "6817", name: "Home", path: "/" },
    { id: "dbf4", name: "All Category", path: "/Allcategory" },
    { id: "ca21", name: "About", path: "/aboutus" },
    { id: "76ae", name: "Contact Us", path: "/contactus" }
];

function Navbar() {
    const { wishList } = useWishList();
    const { cart } = useCart();
    const { user, logout } = useAuth();
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleLogout = () => {
        logout();
        setOpen(false);
        navigate('/login');
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            navigate(`/books?title=${searchTerm}`);
        }
    };

    return (
        <div className="bg-glass sticky top-0 z-40 transition-all duration-300">

            {/* upper navbar */}
            <div className="py-3">
                <div className="container mx-auto flex justify-between items-center px-4">

                    {/* logo */}
                    <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2 items-center text-gradient drop-shadow-[0_0_10px_rgba(108,99,255,0.5)]">
                        <img
                            onClick={() => navigate('/')}
                            className="w-10 cursor-pointer rounded-full shadow-[0_0_15px_rgba(108,99,255,0.6)]"
                            src="/images/logo1.png"
                            alt="logo"
                        />
                        Readora
                    </a>

                    {/* right section */}
                    <div className="flex items-center gap-4">

                        {/* search - hidden on mobile */}
                        <div className="relative group hidden sm:block">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Search books..."
                                className='rounded-full p-2 pl-4 pr-10 bg-dark-card border border-dark-border text-textPrimary placeholder:text-textSecondary focus:outline-none focus:border-secondary focus:shadow-[0_0_10px_#00d4ff] transition-all duration-300 w-48 group-hover:w-64'
                            />
                            <IoIosSearch className="absolute top-1/2 right-3 -translate-y-1/2 text-textSecondary text-2xl group-hover:text-secondary transition-colors duration-300" />
                        </div>

                        {/* wishlist */}
                        {user &&
                            <button onClick={() => navigate("/wishlist")}
                                className='relative bg-dark-card border border-dark-border hover:border-primary hover:shadow-[0_0_15px_rgba(108,99,255,0.4)] text-primary hover:text-white py-2 px-3 rounded-full flex items-center gap-2 transition-all duration-300 group'>
                                <FaHeart className="group-hover:drop-shadow-[0_0_5px_#ffffff]" />
                                {wishList.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_#6c63ff]">
                                        {wishList.length}
                                    </span>
                                )}
                            </button>
                        }

                        {/* cart */}
                        {user &&
                            <button onClick={() => navigate("/cartlist")}
                                className='relative bg-dark-card border border-dark-border hover:border-primary hover:shadow-[0_0_15px_rgba(108,99,255,0.4)] text-primary hover:text-white py-2 px-3 rounded-full flex items-center gap-2 transition-all duration-300 group'>
                                <FaCartShopping className="text-xl group-hover:drop-shadow-[0_0_5px_#ffffff]" />
                                {cart.items?.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-[0_0_10px_#6c63ff]">
                                        {cart.items?.length}
                                    </span>
                                )}
                            </button>
                        }

                        {/* USER / LOGIN */}
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <IoPersonCircle
                                    className="text-4xl cursor-pointer text-primary hover:text-secondary hover:drop-shadow-[0_0_10px_#00d4ff] transition-all duration-300"
                                    onClick={() => setOpen(!open)}
                                />
                                {open && (
                                    <div className="absolute right-0 mt-3 w-48 bg-dark-card rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-dark-border overflow-hidden">
                                        <button
                                            onClick={() => { navigate('/profile'); setOpen(false); }}
                                            className="w-full text-left px-4 py-3 text-sm text-textPrimary hover:bg-primary/20 hover:text-secondary transition-colors duration-200"
                                        >
                                            Profile
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 hover:text-red-400 transition-colors duration-200"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-gradient-to-r from-primary to-secondary hover:shadow-[0_0_20px_rgba(108,99,255,0.6)] text-white font-medium py-2 px-6 rounded-full hover:scale-105 transition-all duration-300"
                            >
                                Sign In
                            </button>
                        )}

                        {/* Hamburger - mobile only */}
                        <button
                            className="sm:hidden text-2xl text-textPrimary hover:text-secondary transition-colors duration-200"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <HiX /> : <HiMenu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="sm:hidden px-4 pt-4 pb-2">
                    <div className="relative group">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Search books..."
                            className='w-full rounded-full p-2 pl-4 pr-10 bg-dark-card border border-dark-border text-textPrimary placeholder:text-textSecondary focus:outline-none focus:border-secondary focus:shadow-[0_0_10px_#00d4ff] transition-all duration-300'
                        />
                        <IoIosSearch className="absolute top-1/2 right-3 -translate-y-1/2 text-textSecondary text-2xl group-focus-within:text-secondary transition-colors duration-300" />
                    </div>
                </div>
            </div>

            {/* Desktop lower navbar */}
            <div className="hidden sm:flex justify-center pb-3">
                <ul className="flex gap-8">
                    {navbar.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => navigate(item.path)}
                                className="relative text-sm text-textSecondary hover:text-white font-medium transition-colors duration-300 group py-1"
                            >
                                {item.name}
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_8px_#00d4ff]"></span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="sm:hidden bg-dark-card/95 backdrop-blur-md px-4 pb-4 border-t border-dark-border absolute w-full shadow-2xl">
                    <ul className="flex flex-col gap-2 pt-4">
                        {navbar.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => { navigate(item.path); setMenuOpen(false); }}
                                    className="w-full text-left px-4 py-3 text-sm text-textSecondary hover:text-secondary hover:bg-primary/10 rounded-lg font-medium transition-all duration-300"
                                >
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Navbar;