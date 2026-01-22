import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

function AddresList() {
    const { updateProfile, user } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.name || "",
        lastName: user?.lastName || "",
        phone: user?.phone || "",
        address: user?.address || "",
        city: user?.city || "",
        state: user?.state || "",
        pincode: user?.pincode || "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateProfile(formData);
        navigate("/profile");
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <form onSubmit={handleSubmit}
                className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg space-y-5">

                <h2 className="text-2xl font-bold text-center">Edit Address</h2>

                <input name="firstName" value={formData.name}
                    onChange={handleChange} placeholder="First Name" className="input border" />

                <input name="lastName" value={formData.lastName}
                    onChange={handleChange} placeholder="Last Name" className="input border" />

                <input name="phone" value={formData.phone}
                    onChange={handleChange} placeholder="Phone" className="input border" />

                <textarea name="address" value={formData.address}
                    onChange={handleChange} placeholder="Complete Address"
                    className="input border w-full" />

                <div className="grid grid-cols-3 gap-3">
                    <input name="state" value={formData.state}
                        onChange={handleChange} placeholder="State" className="input border" />
                    <input name="city" value={formData.city}
                        onChange={handleChange} placeholder="City" className="input border" />
                    <input name="pincode" value={formData.pincode}
                        onChange={handleChange} placeholder="Pincode" className="input border" />
                </div>

                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
                    Save Address
                </button>
            </form>
        </div>
    );
}

export default AddresList;
