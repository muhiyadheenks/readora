// import React, { useState } from 'react'
// import { useAuth } from '../Context/AuthContext';
// import api from '../../API/Axios';

// function Password() {
//     const [newPassword, setNewPassword] = useState("");
//     const [oldPassword, setOldPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const { user } = useAuth();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (newPassword !== confirmPassword) {
//             alert("New Password and Confirm Password do not match");
//             return;
//         }
//         if (confirmPassword.length < 6) {
//             alert("Password must be at least 6 characters long");
//             return;
//         }


//         await api.patch(`/users/reset-password/${user.id}`, {
//             password: newPassword, cpassword: confirmPassword
//         }).catch((error) => { });
//         alert("Password changed successfully");
//         setOldPassword("");
//         setNewPassword("");
//         setConfirmPassword("");
//     }
//     return (
//         <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
//             <h2 className="text-xl font-bold mb-4">Change Password</h2>

//             <input
//                 type="password"
//                 placeholder="Old Password"
//                 className="w-full border p-2 mb-3"
//                 value={oldPassword}
//                 onChange={(e) => setOldPassword(e.target.value)}
//             />

//             <input
//                 type="password"
//                 placeholder="New Password"
//                 className="w-full border p-2 mb-3"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//             />

//             <input
//                 type="password"
//                 placeholder="Confirm New Password"
//                 className="w-full border p-2 mb-4"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//             />

//             <button
//                 onClick={handleSubmit}
//                 className="w-full bg-blue-600 text-white py-2 rounded"
//             >
//                 Update Password
//             </button>
//         </div>
//     );
// }

// export default Password


import React, { useState } from 'react'
import { useAuth } from '../Context/AuthContext';
import api from '../../API/Axios';

function Password() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }

        try {

            await api.patch(`/users/reset-password/${user._id}`, {
                oldPassword,
                password: newPassword,
                cpassword: confirmPassword
            });

            alert("Password changed successfully");

            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (error) {
            console.log(error.response, "err");

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );

        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow rounded">

            <h2 className="text-xl font-bold mb-4">
                Change Password
            </h2>

            <input
                type="password"
                placeholder="Old Password"
                className="w-full border p-2 mb-3"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />

            <input
                type="password"
                placeholder="New Password"
                className="w-full border p-2 mb-3"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />

            <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border p-2 mb-4"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded"
            >
                Update Password
            </button>

        </div>
    )
}

export default Password
