import { Button } from "react-bootstrap";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { TbArrowBackUp } from "react-icons/tb";
import { useAuth } from "@/hooks/useAuth";
import { LoadingPage } from "@/pages";

const AuthLayout = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated, isPending } = useAuth();

    if (isPending) return <LoadingPage />;

    if (isAuthenticated && user) {
        const lastPath = localStorage.getItem("__smarty_schools_last_path");
        return <Navigate to={lastPath || "/dashboard"} />;
    }

    return (
        <div className="d-flex h-100">
            <section
                className="banner-container d-none d-xl-block flex-1"
                style={{ height: "100vh" }}>
                <img
                    src="/images/banner_reverse.svg"
                    alt="Woman wearing orange sweater holding her notebooks with a smile and a bagpack on her back"
                    className="h-100 w-100 object-fit-cover d-block"
                />
            </section>
            <section
                className="d-flex flex-column justify-content-center align-items-start flex-1 gap-4"
                style={{ height: "100vh" }}>
                <Outlet />
            </section>
            <Button
                variant="secondary"
                title="Go Back"
                className="btn-back-arrow text-light"
                onClick={() => navigate("/")}>
                <TbArrowBackUp />
            </Button>
        </div>
    );
};

export default AuthLayout;
