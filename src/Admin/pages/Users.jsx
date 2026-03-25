


import { useEffect, useState } from "react"
import { FaTrash, FaEye } from "react-icons/fa"
import { useAuth } from "../../components/Context/AuthContext"
import api from "../../API/Axios"
import { MdBlockFlipped } from "react-icons/md"

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    // 🔹 Fetch all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/users")
                setUsers(res.data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    // 🔹 Delete user
    // const deleteUser = async (id) => {
    //     if (!confirm("Are you sure you want to delete this user?")) return

    //     try {
    //         await api.patch(`/users/${id}`)
    //         setUsers(users.filter((u) => u.id !== id))
    //     } catch (err) {
    //         alert("Failed to delete user")
    //     }
    // }

    // if (loading) {
    //     return <p className="text-center mt-10">Loading users...</p>
    // }
    // 🔹 Block / Unblock user
    const toggleBlockUser = async (id, currentStatus) => {
        try {
            await api.patch(`/users/${id}`, {
                isBlock: !currentStatus
            })

            setUsers(users.map((u) =>
                u.id === id ? { ...u, isBlock: !currentStatus } : u
            ))
        } catch (err) {
            alert("Failed to update user status")
        }
    }


    return (
        <div className="space-y-6 text-black">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Users Management</h1>

            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="text-left p-4">Name</th>
                            <th className="text-left p-4">Email</th>
                            <th className="text-left p-4">Role</th>
                            <th className="text-left p-4">Status</th>
                            <th className="text-center p-4">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-t hover:bg-gray-50">
                                <td className="p-4 font-medium">{u.name}</td>
                                <td className="p-4">{u.email}</td>

                                <td className="p-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold
                      ${u.role === "admin"
                                                ? "bg-purple-100 text-purple-700"
                                                : "bg-blue-100 text-blue-700"
                                            }`}
                                    >
                                        {u.role}
                                    </span>
                                </td>
                                <td className={`font-semibold ${u.isBlock ? "text-red-600" : "text-green-600"}`}>
                                    {u.isBlock ? "Blocked" : "Active"}
                                </td>


                                {/* <td className="p-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                        active
                                    </span>
                                </td> */}

                                <td className="p-4 text-center space-x-3">

                                    {u.role !== "admin" && (
                                        // <button
                                        //     onClick={() => deleteUser(u.id)}
                                        //     className="text-red-600 hover:text-red-800"
                                        // >
                                        //     <MdBlockFlipped />
                                        // </button>
                                        <button
                                            onClick={() => toggleBlockUser(u.id, u.isBlock)}
                                            className={`px-3 py-1 rounded text-white 
        ${u.isBlock ? "bg-green-600" : "bg-red-600"}`}
                                        >
                                            {u.isBlock ? "Unblock" : "Block"}
                                        </button>

                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {users.length === 0 && (
                    <p className="text-center py-6 text-gray-500">
                        No users found
                    </p>
                )}
            </div>
        </div>
    )
}

export default Users
