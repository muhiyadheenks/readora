// import React, { useState } from 'react'
// import { IoPersonCircle } from 'react-icons/io5'
// import { useAuth } from '../Context/AuthContext';
// import { FaEdit } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// function Profile() {
//     const navigate = useNavigate();
//     const [userdata, setUserdata] = useState([]);
//     const { user, loadingAuth, logout } = useAuth();
//     console.log(user, "userpro");


//     if (loadingAuth) return null;
//     if (!user) return;
//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };
//     const handleOrderList = () => {
//         navigate('/orderlist');
//     }


//     return (
//         <div className='flex justify-center w-full bg-black gap-10 mt-10'>
//             <div className="min-h-screen  w-[800px] flex  items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

//                 <div key={user.id} className="flex flex-col w-[600px] max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 gap-2">

//                     <div className="text-center justify-center mb-6   bg-primary  w-full p-10 rounded-md">
//                         <div className=' flex justify-center text-center text-6xl '>
//                             <IoPersonCircle />
//                         </div>
//                         <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
//                             {user.name}
//                         </h1>
//                     </div>
//                     <div className='flex justify-between'>
//                         <h1>Personal Information</h1>
//                         <button onClick={() => navigate("/addreslist")}
//                             className="flex items-center gap-2">
//                             <span><FaEdit /></span>
//                             Edit Profile

//                         </button>
//                     </div>


//                     <div className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
//                         <h1 className='text-1xl font-bold'>
//                             Full Name
//                         </h1>
//                         <p>{user.name}</p>
//                     </div>
//                     <div className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
//                         <h1 className='text-1xl font-bold'>
//                             Email
//                         </h1>
//                         <p>{user.email}</p>

//                     </div>
//                     <div className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
//                         <h1 className='text-1xl font-bold'>
//                             Phone Number
//                         </h1>
//                         <p>{user?.phone || "Not added"}</p>
//                     </div>
//                     <div className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
//                         <h1 className='text-1xl font-bold'>
//                             Address
//                         </h1>
//                         <p>{`${user.address} state: ${user.state} pincode: ${user.pincode}` || " Not added"}</p>

//                     </div>

//                 </div>

//                 <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 gap-4">
//                     Account Management
//                     <button onClick={() => navigate("/password")}
//                         className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
//                         Change Password</button>
//                     <button onClick={() => navigate("/addreslist")}
//                         className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
//                         Address Book</button>
//                     <button
//                         onClick={handleOrderList} className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
//                         My Order</button>
//                     <button
//                         onClick={handleLogout} className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
//                         Log Out</button>
//                 </div>
//             </div>
//         </div>

//     )
// }


// export default Profile



import React, { useEffect, useState } from 'react'
import { IoPersonCircle } from 'react-icons/io5'
import { useAuth } from '../Context/AuthContext';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../API/Axios';

function Profile() {
    const navigate = useNavigate();
    const { user, loadingAuth, logout } = useAuth();
    const [address, setAddress] = useState(null);

    useEffect(() => {
        const fetchAddress = async () => {

            try {

                const res = await api.get("/api/users/address");

                setAddress(res.data.userAddress?.address)
                console.log('pfofileusers', res.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchAddress();

    }, []);

    if (loadingAuth) return <p>Loading...</p>;

    if (!user) return <p>No User</p>;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleOrderList = () => {
        navigate('/orderlist');
    }

    return (

        <div className='flex justify-center w-full bg-black gap-10 mt-10'>

            <div className="min-h-screen w-[800px] flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">

                <div className="flex flex-col w-[600px] max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 gap-2">

                    <div className="text-center justify-center mb-6 bg-primary w-full p-10 rounded-md">

                        <div className='flex justify-center text-center text-6xl'>
                            <IoPersonCircle />
                        </div>

                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                            {user.name}
                        </h1>

                    </div>

                    <div className='flex justify-between'>

                        <h1>Personal Information</h1>

                        <button
                            onClick={() => navigate("/addreslist")}
                            className="flex items-center gap-2"
                        >
                            <span><FaEdit /></span>
                            Edit Profile
                        </button>

                    </div>

                    <div className='w-full px-4 py-2 rounded-lg border'>
                        <h1 className='font-bold'>Full Name</h1>
                        <p>{user.name}</p>
                    </div>

                    <div className='w-full px-4 py-2 rounded-lg border'>
                        <h1 className='font-bold'>Email</h1>
                        <p>{user.email}</p>
                    </div>

                    <div className='w-full px-4 py-2 rounded-lg border'>
                        <h1 className='font-bold'>Phone Number</h1>
                        <p>{user.phone || "Not added"}</p>
                    </div>

                    <div className='w-full px-4 py-2 rounded-lg border'>

                        <h1 className='font-bold'>Address</h1>

                        <p>
                            {address?.address
                                ? `${address.address}, ${address.city}, ${address.district}, ${address.state} - ${address.pincode}`
                                : "Not added"}
                        </p>

                    </div>

                </div>

                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4 gap-4">

                    <h1>Account Management</h1>

                    <button
                        onClick={() => navigate("/password")}
                        className='w-full px-4 py-2 rounded-lg border'
                    >
                        Change Password
                    </button>

                    <button
                        onClick={() => navigate("/addreslist")}
                        className='w-full px-4 py-2 rounded-lg border'
                    >
                        Address Book
                    </button>

                    <button
                        onClick={handleOrderList}
                        className='w-full px-4 py-2 rounded-lg border'
                    >
                        My Order
                    </button>

                    <button
                        onClick={handleLogout}
                        className='w-full px-4 py-2 rounded-lg border'
                    >
                        Log Out
                    </button>

                </div>

            </div>

        </div>
    )
}

export default Profile