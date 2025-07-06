import { Link } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";

const UnauthorizedPage = () => {
    return (
        <div className="unauthorized-container">
            <Link to="/" className="btn-go-back" title="Go Back To Home">
                <IoReturnUpBack />
                Go Back
            </Link>
            <h1 className="unauthorized-title">
                {[
                    "U",
                    "n",
                    "a",
                    "u",
                    "t",
                    "h",
                    "o",
                    "r",
                    "i",
                    "z",
                    "e",
                    "d",
                    "!",
                ].map((letter, index) => (
                    <span key={index}>{letter}</span>
                ))}
            </h1>
            <p className="unauthorized-text">
                It appears you&apos;ve tried to access a restricted area of the
                academic portal. This section is reserved for specific members
                of our educational community. If you believe this is an error,
                please consult the administration. Otherwise, let&apos;s
                navigate you back to familiar grounds where your academic
                journey can continue smoothly.
            </p>
        </div>
    );
};

export default UnauthorizedPage;
