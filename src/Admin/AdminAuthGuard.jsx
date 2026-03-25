import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/Context/AuthContext";

const AdminAuth = () => {
    const { user, loadingAuth } = useAuth();

    // wait for refresh auth restore
    if (loadingAuth) return null; // or spinner

    // not logged in
    if (!user) {
        return <Navigate to="/admin" replace />;
    }

    // blocked admin
    if (user.isBlock) {
        return <Navigate to="/blocked" replace />;
    }

    // not admin
    if (user.role !== "admin") {
        return <Navigate to="/" replace />;
    }

    // allowed
    return <Outlet />;
};

export default AdminAuth;
