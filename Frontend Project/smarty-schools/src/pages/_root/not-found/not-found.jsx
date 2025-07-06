import { Link } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";

const NotFoundPage = () => {
    return (
        <div className="not-found_container">
            <Link to="/" className="btn-go-back" title="Go Back">
                <IoReturnUpBack /> Go Back
            </Link>
            <h1 className="not-found_title">
                <span>4</span>
                <span>0</span>
                <span>4</span>
            </h1>
            <p className="not-found_text">
                The page you&apos;re looking for seems to be on a summer break.
                It might have been moved to a new semester or no longer exists.
                Let&apos;s get you back to the main campus and on track with
                your educational journey.
            </p>
        </div>
    );
};

export default NotFoundPage;
