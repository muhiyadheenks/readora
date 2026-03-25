import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ role }) => {
    const { user } = useAuth();

    // not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // role-based protection (optional)
    if (role && user.role !== role) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
