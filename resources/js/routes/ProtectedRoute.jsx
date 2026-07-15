import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, permission = null }) {
    const { user, loading, hasPermission } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (permission && !hasPermission(permission)) {
        return (
            <div className="p-10 text-red-600 text-xl">403 - Unauthorized</div>
        );
    }

    return children;
}
