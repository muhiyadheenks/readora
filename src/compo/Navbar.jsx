import React from 'react';
import { FaCartShopping } from 'react-icons/fa6';
import { IoIosSearch } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa"
import Darkmode from './Darkmode';

const menu = [
    {
        id: 1,
        name: "home",
        link: "/#"
    },
    {
        id: 2,
        name: "Top Rated",
        link: "/#services"
    },
    {
        id: 3,
        name: "Autobiography",
        link: "/#"
    },
    {
        id: 4,
        name: "Religious",
        link: "/#"
    }
];
const DropdownLink = [
    {
        id: 1,
        name: "Trending products",
        link: "#"
    },
    {
        id: 2,
        name: "Bestselling",
        link: "#"
    },
    {
        id: 3,
        name: "Top rated",
        link: "#"
    }
];

function Navbar() {
    return (
        <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">

            {/* upper navbar */}
            <div className="bg-primary/40 py-2">
                <div className="container mx-auto flex justify-between items-center px-4">
                    {/* logo */}
                    <div>
                        <a href="#">
                            <img className="w-10 p-0" src="/images/logo.png" alt="logo" />
                        </a>
                    </div>
                    {/* search */}
                    <div className="flex items-center gap-4">
                        <div className="relative group hidden sm:block">
                            <input
                                type="text"
                                placeholder="Searching..."
                                className="
                                    w-[200px]
                                    group-hover:w-[300px]
                                    transition-all
                                    duration-300
                                    rounded-full
                                    border
                                    border-gray-300
                                    px-3
                                    py-1
                                    focus:outline-none
                                    focus:border-primary
                                    bg-white
                                    dark:bg-gray-800
                                "
                            />
                            <IoIosSearch
                                className="
                                    absolute
                                    top-1/2
                                    right-3
                                    -translate-y-1/2
                                    text-gray-500
                                    group-hover:text-primary
                                "
                            />
                        </div>
                        {/* order button */}
                        <button
                            onClick={() => alert("Ordering not available yet")}
                            className="
                            bg-gradient-to-r
                            from-primary
                            to-secondary
                            text-white
                            py-1
                            px-4
                            rounded-full
                            flex
                            items-center
                            gap-2
                            group
                            transition-all
                            duration-200
                        "
                        >
                            <span className="hidden group-hover:block transition-all duration-200">
                                Order
                            </span>
                            <FaCartShopping className="text-xl cursor-pointer" />
                        </button>
                        <div>
                            {/* dark mode */}
                            <Darkmode />
                        </div>
                    </div>
                </div>
            </div>

            {/* lower navbar */}
            <div className='flex justify-center bg-white dark:bg-gray-900 text-black dark:text-white'>
                <ul className='sm:flex hidden items-center gap-4'>
                    {
                        menu.map((data) => (
                            <li key={data.id}>
                                <a href={data.link} className='inline-block px-4 hover:text-primary duration-200'>{data.name}</a>
                            </li>
                        ))
                    }
                    {/* dropdown */}
                    <li className='group relative cursor-pointer'>
                        <a href="#" className='flex items-center gap-[2px] py-2'>trending <span>
                            <FaCaretDown className='transition-all duration-200 group-hover:rotate-180' /></span></a>
                        <div className='absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md'>
                            <ul>
                                {
                                    DropdownLink.map((data) => (
                                        <li key={data.id}>
                                            <a href={data.link}
                                                className='inline-block w-full rounded-md p-2 hover:bg-primary/20'>{data.name}</a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    );
}

export default Navbar;
