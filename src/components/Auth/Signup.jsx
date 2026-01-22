import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { v4 as uuid } from "uuid";
import { Validation } from "./Validation";
import { useAuth } from "../Context/AuthContext";

const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
};
const Signup = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { values, handleChange, handleBlur, handleSubmit, errors, touched } = useFormik({
        initialValues,
        validationSchema: Validation,
        onSubmit: async (values, { resetForm }) => {
            setIsSubmitting(true);
            setError('');

            const result = await register({
                id: uuid(),
                name: values.name,
                email: values.email,
                phone: values.phone,
                password: values.password,
                cpassword: values.cpassword
            });

            if (result.success) {
                alert("Registration successful! Please login.");
                resetForm();
                navigate("/login");
            } else {
                setError(result.error);
            }

            setIsSubmitting(false);
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">

                {/* Title */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Create Account
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Join Readora and start reading
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>
                    {/* pone */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Your Phone Number"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="cpassword"
                            value={values.cpassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="••••••••"
                            required
                            className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
                    >
                        Sign Up
                    </button>
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                </form>
                <p className="text-sm text-center text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
