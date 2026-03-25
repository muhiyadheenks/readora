import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../components/Context/AuthContext"
import { FaEye, FaEyeSlash } from "react-icons/fa6"
import api from "../../API/Axios"

const AdminLogin = () => {
    const { login } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [hide, setHide] = useState(true)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        console.log('submitting...');


        await login(email, password)

    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">

                {/* Title */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Admin Panel
                    </h1>
                    <h3 className="text-sm font-bold text-gray-300 mt-1">
                        Login to manage Readora
                    </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {error && (
                        <div className="border border-red-400 p-2 rounded-md bg-red-200 text-red-600 text-center">
                            {error}
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Admin Email
                        </label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Password
                        </label>
                        <input
                            type={hide ? "password" : "text"}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span
                            onClick={() => setHide(!hide)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 mt-3"
                        >
                            {hide ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                        Login as Admin
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin


// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../components/Context/AuthContext";
// import { FaEye, FaEyeSlash } from "react-icons/fa6";

// const AdminLogin = () => {
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//     const [hide, setHide] = useState(true);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError("");

//         const result = await login({
//             email,
//             password,
//             role: "admin",
//         });

//         if (!result.success) {
//             setError(result.error);
//             return;
//         }

//         navigate("/admin/dashboard");
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800 px-4">
//             <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">

//                 {/* Title */}
//                 <div className="text-center mb-6">
//                     <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
//                         Admin Panel
//                     </h1>
//                     <h3 className="text-sm font-bold text-gray-300 mt-1">
//                         Login to manage Readora
//                     </h3>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-5">

//                     {error && (
//                         <div className="border border-red-400 p-2 rounded-md bg-red-200 text-red-600 text-center">
//                             {error}
//                         </div>
//                     )}

//                     {/* Email */}
//                     <div>
//                         <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
//                             Admin Email
//                         </label>
//                         <input
//                             type="email"
//                             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />
//                     </div>

//                     {/* Password */}
//                     <div className="relative">
//                         <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
//                             Password
//                         </label>
//                         <input
//                             type={hide ? "password" : "text"}
//                             className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                         <span
//                             onClick={() => setHide(!hide)}
//                             className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 mt-3"
//                         >
//                             {hide ? <FaEye /> : <FaEyeSlash />}
//                         </span>
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
//                     >
//                         Login as Admin
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AdminLogin;
