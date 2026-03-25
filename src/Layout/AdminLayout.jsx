import { FaBox, FaSignOutAlt, FaTachometerAlt, FaUsers } from "react-icons/fa"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../components/Context/AuthContext"

const AdminLayout = () => {
    const navigate = useNavigate()
    const { setUser } = useAuth()

    const handleLogout = () => {
        localStorage.removeItem("token")
        setUser(null)
        navigate("/admin", { replace: true })
    }

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 w-64 h-screen bg-gray-900 text-white flex flex-col">
                <div className="p-6 text-2xl font-bold border-b border-gray-700">
                    Admin Panel
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <NavLink
                        to="/admin/dashboard"
                        end
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg ${isActive ? "bg-gray-700" : "hover:bg-gray-800"
                            }`
                        }
                    >
                        <FaTachometerAlt /> Dashboard
                    </NavLink>

                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg ${isActive ? "bg-gray-700" : "hover:bg-gray-800"
                            }`
                        }
                    >
                        <FaUsers /> Users
                    </NavLink>

                    <NavLink
                        to="/admin/adminbooks"
                        className={({ isActive }) =>
                            `flex items-center gap-3 p-3 rounded-lg ${isActive ? "bg-gray-700" : "hover:bg-gray-800"
                            }`
                        }
                    >
                        <FaBox /> Books
                    </NavLink>
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-600"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </aside>

            {/* Content */}
            <main className="ml-64 w-full h-screen overflow-y-auto bg-gray-100 p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default AdminLayout
