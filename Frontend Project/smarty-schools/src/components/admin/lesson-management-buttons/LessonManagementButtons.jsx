import { Link, useLocation } from "react-router-dom";

const LessonManagementButtons = () => {
    const { pathname } = useLocation();

    return (
        <div className="lesson-management_buttons bg-light rounded-2 p-4 shadow-sm">
            <Link
                to="/dashboard/lesson-management/education-terms"
                className={`fw-bold ${
                    pathname === "/dashboard/lesson-management/education-terms"
                        ? "text-secondary"
                        : "text-success"
                }`}>
                Education Terms
            </Link>
            <Link
                to="/dashboard/lesson-management"
                className={`fw-bold ${
                    pathname === "/dashboard/lesson-management"
                        ? "text-secondary"
                        : "text-success"
                }`}>
                Lessons
            </Link>
            <Link
                to="/dashboard/lesson-management/lesson-programs"
                className={`fw-bold ${
                    pathname === "/dashboard/lesson-management/lesson-programs"
                        ? "text-secondary"
                        : "text-success"
                }`}>
                Lesson Programs
            </Link>
        </div>
    );
};

export default LessonManagementButtons;
