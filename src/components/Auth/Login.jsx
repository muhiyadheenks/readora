import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

function Login() {
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [hide, setHide] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate()
    const hidePassword = () => {
        setHide(prev => !prev);
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: async (values) => {
            console.log('validating...');

            setIsSubmitting(true);
            setError("");

            const result = await login(values.email, values.password);
            console.log(result);

            if (!result.success) {
                console.log('passed!');

                setError(result.error);
                console.log(error);

                setIsSubmitting(false);
                return;
            }
            alert("Login successful");
            setIsSubmitting(false);
            navigate('/')
        }


    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">

                {/* Logo / Title */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Readora
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Welcome back, please login
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    {error && <div className="border border-red-400 p-2 rounded-md bg-red-200 text-red-600 bg-liner-to-br text-center">
                        {error}
                    </div>}
                    {/* Email */}
                    <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative ">
                        <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1 ">
                            Password
                        </label>
                        <input
                            type={hide ? "password" : "text"}
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="••••••••"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <span
                            onClick={hidePassword}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 mt-3"
                        >
                            {hide ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>

                    {/* Forgot password */}
                    <div className="flex justify-end">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-indigo-600 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                        Login
                    </button>
                </form>
                {/* Divider */}

                <div className="my-6 text-center text-gray-400 text-sm">
                    Don’t have an account?
                </div>

                {/* Register link */}
                <Link
                    to="/signup"
                    className="block text-center border border-indigo-600 text-indigo-600 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                >
                    Create Account
                </Link>
            </div>
        </div>
    );
}

export default Login;
