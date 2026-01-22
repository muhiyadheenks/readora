import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState(user?.name || "");
    const [phone, setPhone] = useState(user?.phone || "");

    const handleSubmit = (e) => {
        e.preventDefault();

        updateProfile({
            name,
            phone,
        });

        navigate("/profile");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4"
            >
                <h2 className="text-2xl font-bold text-center">Edit Profile</h2>

                <div>
                    <label className="text-sm">Full Name</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input border w-full"
                        required
                    />
                </div>

                <div>
                    <label className="text-sm">Phone</label>
                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="input border w-full"
                    />
                </div>

                <button className="w-full bg-indigo-600 text-white py-2 rounded-lg">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default EditProfile;
