import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { TfiClose } from "react-icons/tfi";
import { GoSignIn } from "react-icons/go";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "react-bootstrap";
import { handleLogout } from "@/utils/functions";
import { MdDashboard } from "react-icons/md";

const handleClickOutside = (e, reference, callback) => {
    if (reference.current && !reference.current.contains(e.target)) {
        callback(false);
    }
};

const handleResize = (width, callback) => {
    if (window.innerWidth > width) {
        callback(false);
    }
};

const Sidebar = (props) => {
    // get the current path so we can highlight the current page
    const { pathname } = useLocation();
    const sidebarRef = useRef();
    const { user, logoutUser } = useAuth();

    // create a click event listener to hide the sidebar when the user clicks outside of it
    useEffect(() => {
        // create a resize event listener to hide the sidebar when the user resizes the window
        window.addEventListener("resize", () =>
            handleResize(992, props.setShowSidebar)
        );

        // create a click event listener to hide the sidebar when the user clicks outside of it
        document.addEventListener("click", (event) =>
            handleClickOutside(event, sidebarRef, props.setShowSidebar)
        );

        // initial check
        handleResize(992, props.setShowSidebar);

        // cleanup the event listeners
        return () => {
            window.removeEventListener("resize", () =>
                handleResize(992, props.setShowSidebar)
            );
            document.removeEventListener("click", (event) =>
                handleClickOutside(event, sidebarRef, props.setShowSidebar)
            );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogoutButton = () => {
        props.setShowSidebar(false);
        handleLogout(logoutUser);
    };

    return (
        <div className="sidebar" ref={sidebarRef}>
            <div className="d-flex justify-content-between align-items-center gap-4">
                <Link to="/" title="Home" className="fs-2">
                    Smarty Schools
                </Link>
                <TfiClose
                    onClick={() => props.setShowSidebar(false)}
                    className="cursor-pointer"
                    title="Close Sidebar"
                />
            </div>
            <ul className="reset-list d-flex flex-column flex-1 gap-4">
                {user && (
                    <li>
                        <Link
                            to="/dashboard"
                            title="Dashboard"
                            className="d-flex align-items-center gap-3">
                            <span className="fs-1">
                                <MdDashboard />
                            </span>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                )}
                {props.data.map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.path}
                            title={item.title}
                            className={`d-flex align-items-center gap-3 ${
                                pathname === item.path ? "text-light" : ""
                            }`}>
                            <span className="fs-1">{item.icon}</span>
                            <span>{item.title}</span>
                        </Link>
                    </li>
                ))}
                <li className="d-flex align-items-end flex-1 ">
                    {user ? (
                        <Button
                            type="button"
                            title="Login to your account"
                            className="d-flex align-items-center fw-bold gap-3 border-0 bg-transparent p-0 text-black"
                            onClick={handleLogoutButton}>
                            <span className="fs-1">
                                <GoSignIn />
                            </span>
                            <span>Logout</span>
                        </Button>
                    ) : (
                        <Link
                            to="/login"
                            title="Login to your account"
                            className="d-flex align-items-center gap-3">
                            <span className="fs-1">
                                <GoSignIn />
                            </span>
                            <span>Login</span>
                        </Link>
                    )}
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
