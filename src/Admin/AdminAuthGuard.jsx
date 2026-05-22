import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../Admin/context/AuthContext";

const AdminAuthGuard = () => {
    const { admin, loading } = useAdminAuth();

    if (loading) return null;

    // not logged in
    if (!admin) {
        return <Navigate to="/admin/login" replace />;
    }

    // allowed
    return <Outlet />;
};

export default AdminAuthGuard;
