import { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { Sidebar } from "@/components";
import { sidebarData } from "@/constants/constants";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
    const [showSidebar, setShowSidebar] = useState(false);
    const { user } = useAuth();

    // create a click event listener to toggle the sidebar when the user clicks on the hamburger menu icon
    const handleShowSidebar = (event) => {
        // prevent the event from bubbling up the DOM tree, preventing any parent handlers from being notified of the event.
        event.stopPropagation();
        setShowSidebar((prev) => !prev);
    };

    return (
        <>
            <nav className="navbar-custom">
                <Link
                    to="/"
                    title="Smarty Schools"
                    className="d-flex align-items-center gap-2">
                    <img
                        src="/images/logo.svg"
                        alt="Smarty Schools Logo"
                        title="Smarty Schools"
                        width={60}
                        height={60}
                    />
                    <span className="fs-2">Smarty Schools</span>
                </Link>
                {/* DESKTOP */}
                <div className="d-none d-lg-flex justify-content-end flex-1">
                    <ul className="d-flex reset-list justify-content-between align-items-center ms-5 flex-1 gap-4">
                        <div className="d-flex align-items-center gap-4">
                            <li>
                                <Link
                                    to="/programs"
                                    title="Programs"
                                    className="text-secondary-emphasis font-md">
                                    Programs
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/extra-curricular"
                                    title="Extra-Curricular"
                                    className="text-secondary-emphasis font-md">
                                    Extra-Curricular
                                </Link>
                            </li>
                        </div>
                        <div className="d-flex align-items-center gap-4">
                            <li>
                                <Link
                                    to="/gallery"
                                    title="Gallery"
                                    className="text-secondary-emphasis font-md">
                                    Gallery
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/our-staff"
                                    title="Our Staff"
                                    className="text-secondary-emphasis font-md">
                                    Our Staff
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/contact"
                                    title="Contact Us"
                                    className="text-secondary-emphasis font-md">
                                    Contact Us
                                </Link>
                            </li>
                        </div>
                    </ul>
                    <Link to={user ? "/dashboard" : "/login"}>
                        <button
                            className="btn-login font-md ms-4"
                            title={user ? "Go To Dashboard" : "Login"}>
                            <img
                                src="/images/icons/icon-login.svg"
                                alt="Login Icon"
                                title={user ? "Go To Dashboard" : "Login"}
                                width={32}
                            />
                            {user ? user?.name : "Login"}
                        </button>
                    </Link>
                </div>
                {/* MOBILE */}
                <RxHamburgerMenu
                    className="fs-3 d-lg-none text-secondary-emphasis cursor-pointer"
                    title="Menu"
                    type="mennu"
                    onClick={handleShowSidebar}
                />
            </nav>
            {/* MOBILE */}
            {showSidebar && (
                <Sidebar data={sidebarData} setShowSidebar={setShowSidebar} />
            )}
        </>
    );
};

export default Navbar;
