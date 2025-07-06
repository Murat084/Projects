import { formatSegment } from "@/utils/functions";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
    const { pathname } = useLocation();
    // ["", "dashboard","admin-management", "5"]
    // extract the last segment for the title
    const titleSegments = pathname.split("/");
    let title = titleSegments[titleSegments.length - 1] || "Home";

    // check if the last segment is a number
    if (!isNaN(title)) {
        title = titleSegments[titleSegments.length - 2] || "Home";
    }

    title = formatSegment(title);

    const breadcrumb = pathname
        .split("/")
        .filter(Boolean)
        .map((segment, index, array) => {
            const text = formatSegment(segment);
            const path = `/${array.slice(0, index + 1).join("/")}`;
            const separator = index < array.length - 1 ? " > " : "";

            return (
                <span key={index}>
                    <Link title={text} to={path} className="text-secondary">
                        {text}
                    </Link>
                    {separator}
                </span>
            );
        });

    return (
        <div
            className="d-flex flex-column flex-xl-row justify-content-between align-items-center rounded-3 bg-light gap-3 p-4 shadow-sm"
            style={{ minHeight: "100px" }}>
            <h2>{title}</h2>
            <div>{breadcrumb}</div>
        </div>
    );
};

export default Header;
