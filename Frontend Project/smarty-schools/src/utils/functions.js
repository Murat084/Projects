import Swal from "sweetalert2";

export const handleClickOutside = (e, reference, callback) => {
    if (reference.current && !reference.current.contains(e.target)) {
        callback(false);
    }
};

export const swalQuestion = (title, text) => {
    return Swal.fire({
        title,
        text,
        icon: "question",
        showCancelButton: true,
    });
};

export const swalToast = (title, icon = "info", timer = 4000) => {
    return Swal.fire({
        icon, // success, error, warning, info, question
        title,
        timer,
        showConfirmButton: false,
    });
};

export const formatSegment = (segment) => {
    return segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    // admin-management
    // ["admin", "management"]
    // ["Admin", "Management"]
    // "Admin Management"
};

export const calculateOrder = (pageSize, currentPage, index) =>
    pageSize * (currentPage - 1) + index + 1;

export const extractLessonPrograms = (lessonPrograms) => {
    if (!lessonPrograms) return [];
    return lessonPrograms.map((item) => ({
        value: item.lessonProgramId,
        label: `Lesson Program ${item.lessonProgramId} - ${item.lessonName
            .map((lesson) => lesson.lessonName)
            .join(", ")}`,
    }));
};

export const extractLessonProgamsForEdit = (lessonPrograms) => {
    if (!lessonPrograms) return [];
    return lessonPrograms.map((item) => ({
        value: item.id,
        label: `Lesson Program ${item.id} - ${item.lesson
            .map((item) => item.lessonName)
            .join(", ")}`,
    }));
};

export const getFilteredData = (lessonPrograms, lessonsIdList) => {
    const filteredData = lessonPrograms
        .filter((item) => lessonsIdList.includes(item.lessonProgramId))
        .map((item) => ({
            value: item.lessonProgramId,
            label: `Lesson Program ${item.lessonProgramId} - ${item.lessonName
                .map((item) => item.lessonName)
                .join(", ")}`,
        }));
    return filteredData;
};

export const truncateString = (str, maxLength) => {
    let newStr = str;
    // check if the str is an array, if it is, convert it to a string
    if (typeof str === "object") {
        if (Array.isArray(str)) {
            newStr = str
                .map((item) =>
                    item.lessonName
                        ? item.lessonName
                        : `${item.name} ${item.surname}`
                )
                .join(", ");
        } else {
            newStr = `${str.name} ${str.surname}`;
        }
    }

    // Check if the string's length is greater than the maximum length
    newStr = String(newStr);
    if (!newStr) return "false";

    if (newStr.length > maxLength) {
        // If it is, truncate the string to the maximum length and add '...'
        return newStr.substring(0, maxLength) + "...";
    } else {
        // If the string is shorter than the maximum length, return it as is
        return newStr;
    }
};

export const transformEducationTermsArray = (array) => {
    // Check if the input is an array
    if (!Array.isArray(array)) {
        return null;
    }

    // Function to convert term to title case and remove underscores
    function formatTerm(term) {
        return term
            .toLowerCase()
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }

    // Function to format date in DD/MM/YYYY format
    function formatDate(date) {
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    }

    // Map through each item and transform it
    return array.map((item) => ({
        value: item.id,
        label: `${formatTerm(item.term)} - ${formatDate(item.startDate)}`,
    }));
};

export const transformLessonsArray = (array) => {
    // Check if the input is an array
    if (!Array.isArray(array)) {
        return null;
    }
    // Map through each item and transform it
    return array.map((item) => ({
        value: item.lessonId,
        label: item.lessonName,
    }));
};

export const transformStudentsArray = (array) => {
    // Check if the input is an array
    if (!Array.isArray(array)) {
        return null;
    }
    // Map through each item and transform it
    return array.map((item) => ({
        value: item.userId,
        label: `${item.name} ${item.surname}`,
    }));
};

export const transformMeetingsArray = (array) => {
    // Check if the input is an array
    if (!Array.isArray(array)) {
        return null;
    }
    // Map through each item and transform it
    return array.map((item) => ({
        value: item.id,
        label: `${item.name} - ${item.surname}`,
    }));
};

export const convertTimeToHourMinute = (timeString) => {
    // Split the string by colon
    const parts = timeString.split(":");

    // Check if the input is in the correct format
    if (parts.length !== 3) {
        throw new Error("Invalid time format. Expected hh:mm:ss");
    }

    // Reassemble the first two parts (hours and minutes)
    return parts[0] + ":" + parts[1];
};

// save the last path to local storage to redirect user to the last page after the login
export const updateLastPath = (pathname) => {
    // exclude certain paths
    const excludedPaths = ["/", "/login", "/register", "/unauthorized"];
    // only save path if it's not in the excluded paths
    if (!excludedPaths.includes(pathname)) {
        localStorage.setItem("__smarty_schools_last_path", pathname);
    }
};

export const handleLogout = (callback) => {
    try {
        swalQuestion("Are you sure you want to logout?").then((response) => {
            if (response.isConfirmed) {
                callback();
                swalToast("You have been logged out.", "success");
            }
        });
    } catch (error) {
        swalToast(
            "There was a problem logging you out. Please try again.",
            "error"
        );
    }
};
