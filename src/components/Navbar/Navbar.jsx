import React, { useEffect, useRef, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { IoPersonCircle } from "react-icons/io5";
import Darkmode from './Darkmode';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/Cartcontext';
import { FaCartShopping, FaHeart } from 'react-icons/fa6';
import { useWishList } from '../Context/WishListContext';
import { useSearch } from '../Context/SearchContext';


const navbar = [
    { id: "6817", name: "Home", path: "/" },
    { id: "dbf4", name: "All Category", path: "/Allcategory" },
    { id: "ca21", name: "About", path: "/aboutus" },
    { id: "76ae", name: "Contact Us", path: "/contactus" }
];


function Navbar() {
    const { wishList } = useWishList();
    const { cart } = useCart();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { searchTerm, setSearchTerm } = useSearch();
    // close dropdown on outside click
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

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };


    return (
        <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white sticky top-0 z-40">

            {/* upper navbar */}
            <div className="bg-primary/40 py-2">
                <div className="container mx-auto flex justify-between items-center px-4">

                    {/* logo */}
                    <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2 ">
                        <img
                            onClick={() => navigate('/')}
                            className="w-10 cursor-pointer rounded-full"
                            src="/images/logo1.png"
                            alt="logo"
                        />
                        Readora
                    </a>

                    {/* right section */}
                    <div className="flex items-center gap-4">

                        {/* search */}
                        <div className="relative group hidden sm:block border-null">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearch}
                                placeholder="Search books..."
                                className='rounded-full p-1 pl-3 pr-10 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 w-48 group-hover:w-64'
                            />

                            <IoIosSearch

                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 text-2xl " />
                        </div>
                        {/* wishlist */}
                        {user &&
                            <button onClick={() => navigate("/wishlist")}
                                className='relative bg-gradient-to-r from-primary to-secondary text-white py-1 px-4 rounded-full flex items-center gap-2'>
                                <FaHeart />
                                {wishList.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        {wishList.length}
                                    </span>
                                )}
                            </button>
                        }

                        {/* cart */}
                        {user &&
                            <button className="relative bg-gradient-to-r from-primary to-secondary text-white py-1 px-4 rounded-full flex items-center gap-2">
                                <FaCartShopping onClick={() => navigate("/cartlist")}
                                    className="relative text-xl " />
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        {cart.length}
                                    </span>
                                )}
                            </button>
                        }

                        {/* USER / LOGIN */}
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <IoPersonCircle
                                    className="text-4xl cursor-pointer text-primary"
                                    onClick={() => setOpen(!open)}
                                />

                                {/* dropdown */}
                                {open && (
                                    <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 overflow-hidden">
                                        <button
                                            onClick={() => {
                                                navigate('/profile');
                                                setOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            Profile
                                        </button>

                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-gradient-to-r from-primary to-secondary text-white py-1 px-4 rounded-full"
                            >
                                Signin
                            </button>
                        )}

                        <Darkmode />
                    </div>
                </div>
            </div>

            {/* lower navbar */}
            <div className="flex justify-center bg-white dark:bg-gray-900">
                <ul className="sm:flex hidden gap-4">
                    {navbar.map((item) => (
                        <li key={item.id}>
                            <button
                                onClick={() => navigate(item.path)}
                                className="px-4 py-2 text-sm hover:text-primary font-bold"
                            >
                                {item.name}
                            </button>
                        </li>
                    ))}

                </ul>
            </div>
        </div>
    );
}

export default Navbar;






