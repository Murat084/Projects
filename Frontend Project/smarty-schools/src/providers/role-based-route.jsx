import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const RoleBasedRoute = ({ allowedRoles, isChildren, children }) => {
    const { user } = useAuth();

    const hasAccess = user && allowedRoles.includes(user.role);

    return hasAccess ? (
        isChildren ? (
            children
        ) : (
            <Outlet />
        )
    ) : (
        <Navigate to="/unauthorized" replace />
    );
};

export default RoleBasedRoute;
