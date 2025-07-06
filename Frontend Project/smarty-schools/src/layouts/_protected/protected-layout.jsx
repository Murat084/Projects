import { dashboardSidebarData } from "@/constants/constants";
import { useAuth } from "@/hooks/useAuth";
import { IoHome } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { handleLogout } from "@/utils/functions";
import { Header, SidePanel } from "@/components";

const ProtectedLayout = () => {
    const { user, isAuthenticated, logoutUser } = useAuth();
    const { pathname } = useLocation();

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" />;
    }

    const roleBasedSidebarData = dashboardSidebarData.map((item) =>
        item.roles.includes(user.role) ? item : null
    );

    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            {/* ADMIN NAVIGATION MENU */}
            <nav className="admin-navigation_menu-container">
                <ul>
                    {roleBasedSidebarData.map(
                        (item) =>
                            item && (
                                <li key={item._id}>
                                    <Link to={item.path} title={item.title}>
                                        <span
                                            className={`fs-2 ${
                                                pathname === item.path
                                                    ? "text-secondary"
                                                    : "text-light"
                                            }`}>
                                            {item.icon}
                                        </span>
                                    </Link>
                                </li>
                            )
                    )}
                    <li className="mt-5">
                        <Link to="/" title="Home">
                            <span className="fs-2 text-light cursor-pointer">
                                <IoHome />
                            </span>
                        </Link>
                    </li>
                    <li className="mt-5">
                        <span
                            className="fs-2 text-light cursor-pointer"
                            onClick={() => handleLogout(logoutUser)}>
                            <GoSignOut title="Logout" />
                        </span>
                    </li>
                </ul>
            </nav>
            <div
                className="flex-3 d-flex flex-column"
                style={{ padding: "0 2rem 0 6rem", gap: "2rem" }}>
                <Header />
                <Outlet />
            </div>
            <SidePanel />
        </div>
    );
};

export default ProtectedLayout;
