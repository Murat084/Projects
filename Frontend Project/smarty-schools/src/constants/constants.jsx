import { BsListCheck } from "react-icons/bs";
import { TbListDetails } from "react-icons/tb";
import { RiGalleryLine, RiAdminFill, RiHome2Line } from "react-icons/ri";
import { IoIosPeople } from "react-icons/io";
import {
    MdDashboard,
    MdAssistant,
    MdPlayLesson,
    MdCastForEducation,
    MdManageAccounts,
} from "react-icons/md";
import { GrUserManager } from "react-icons/gr";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiStudentFill, PiExamFill, PiUsersThreeFill } from "react-icons/pi";
import { FaPeopleLine } from "react-icons/fa6";
import { TiMessages } from "react-icons/ti";
import { GiChoice, GiNotebook, GiSatelliteCommunication } from "react-icons/gi";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";

// ====================== NAVBAR DATA ======================
export const navbarData = [
    {
        _id: "1",
        title: "Programs",
        path: "/programs",
    },
    {
        _id: "2",
        title: "Extra-Curricular",
        path: "/extra-curricular",
    },
    {
        _id: "3",
        title: "Gallery",
        path: "/gallery",
    },
    {
        _id: "4",
        title: "Our Staff",
        path: "/our-staff",
    },
    {
        _id: "5",
        title: "Contact Us",
        path: "/contact",
    },
];

// ====================== SIDEBAR DATA ======================
export const sidebarData = [
    {
        _id: "1",
        title: "Home",
        path: "/",
        icon: <RiHome2Line />,
    },
    {
        _id: "2",
        title: "Programs",
        path: "/programs",
        icon: <BsListCheck />,
    },
    {
        _id: "3",
        title: "Extra-Curricular",
        path: "/extra-curricular",
        icon: <TbListDetails />,
    },
    {
        _id: "4",
        title: "Gallery",
        path: "/gallery",
        icon: <RiGalleryLine />,
    },
    {
        _id: "5",
        title: "Our Staff",
        path: "/our-staff",
        icon: <IoIosPeople />,
    },
    {
        _id: "6",
        title: "Contact Us",
        path: "/contact",
        icon: <GiSatelliteCommunication />,
    },
];

// ====================== DASHBOARD SIDEBAR DATA ======================
export const dashboardSidebarData = [
    {
        _id: "1",
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
        roles: ["ADMIN", "MANAGER", "ASSISTANTMANAGER", "TEACHER", "STUDENT"],
    },
    {
        _id: "2",
        title: "Admin Management",
        path: "/dashboard/admin-management",
        icon: <RiAdminFill />,
        roles: ["ADMIN"],
    },
    {
        _id: "3",
        title: "Manager Management",
        path: "/dashboard/manager-management",
        icon: <GrUserManager />,
        roles: ["ADMIN"],
    },
    {
        _id: "4",
        title: "Assistant Manager Management",
        path: "/dashboard/assistant-manager-management",
        icon: <MdAssistant />,
        roles: ["ADMIN", "MANAGER"],
    },
    {
        _id: "5",
        title: "Teacher Management",
        path: "/dashboard/teacher-management",
        icon: <FaChalkboardTeacher />,
        roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    {
        _id: "6",
        title: "Lesson Management",
        path: "/dashboard/lesson-management",
        icon: <MdPlayLesson />,
        roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    {
        _id: "7",
        title: "Student Management",
        path: "/dashboard/student-management",
        icon: <PiStudentFill />,
        roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    {
        _id: "8",
        title: "Student Info Management",
        path: "/dashboard/student-info-management",
        icon: <GiNotebook />,
        roles: ["TEACHER"],
    },
    {
        _id: "9",
        title: "Meeting Management",
        path: "/dashboard/meeting-management",
        icon: <FaPeopleLine />,
        roles: ["TEACHER"],
    },
    {
        _id: "10",
        title: "Messages",
        path: "/dashboard/messages",
        icon: <TiMessages />,
        roles: ["ADMIN", "MANAGER", "ASSISTANTMANAGER"],
    },
    {
        _id: "11",
        title: "Choose Lesson",
        path: "/dashboard/choose-lesson",
        icon: <GiChoice />,
        roles: ["STUDENT"],
    },
    {
        _id: "12",
        title: "Grades and Meetings",
        path: "/dashboard/grades-and-meetings",
        icon: <PiExamFill />,
        roles: ["STUDENT"],
    },
];

// ====================== EVENT CARD DATA ======================
export const eventCardData = [
    {
        _id: "1",
        day: "Monday",
        description:
            "Annual Science Fair Kickoff, showcasing student inventions and experiments.",
        date: "7th December, 2023",
        variant: "secondary",
    },
    {
        _id: "2",
        day: "Tuesday",
        description:
            "Parent-Teacher Meet for academic progress discussions and future planning.",
        date: "8th December, 2023",
        variant: "primary",
    },
    {
        _id: "3",
        day: "Wednesday",
        description:
            "Workshop on digital literacy for students, including cyber security essentials.",
        date: "9th December, 2023",
        variant: "success",
    },
    {
        _id: "4",
        day: "Thursday",
        description:
            "Inter-class debate competition on current affairs and environmental issues.",
        date: "10th December, 2023",
        variant: "info",
    },
];

// ====================== DASHBOARD DATA ======================
export const dashboardData = [
    {
        _id: "1",
        title: "Admins",
        icon: <RiAdminFill />,
        roles: ["ADMIN"],
    },
    {
        _id: "2",
        title: "Teachers",
        icon: <FaChalkboardTeacher />,
        roles: ["ADMIN", "ASSISTANTMANAGER", "TEACHER"],
    },
    {
        _id: "3",
        title: "Students",
        icon: <PiStudentFill />,
        roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    {
        _id: "4",
        title: "Managers",
        icon: <MdManageAccounts />,
        roles: ["ADMIN"],
    },
    {
        _id: "5",
        title: "Assistant Managers",
        icon: <MdAssistant />,
        roles: ["ADMIN", "MANAGER"],
    },
    {
        _id: "6",
        title: "Meetings",
        icon: <FaPeopleLine />,
        roles: ["ADMIN"],
    },
    {
        _id: "7",
        title: "Lessons",
        icon: <MdPlayLesson />,
        roles: ["ADMIN", "ASSISTANTMANAGER", "TEACHER"],
    },
    {
        _id: "8",
        title: "Advisor Teachers",
        icon: <LiaChalkboardTeacherSolid />,
        roles: ["ADMIN", "ASSISTANTMANAGER"],
    },
    {
        _id: "9",
        title: "Education Terms",
        icon: <MdCastForEducation />,
        roles: ["ADMIN", "ASSISTANTMANAGER", "TEACHER"],
    },
    {
        _id: "10",
        title: "Guest Users",
        icon: <PiUsersThreeFill />,
        roles: ["ADMIN"],
    },
    {
        _id: "11",
        title: "Lesson Programs",
        icon: <GiNotebook />,
        roles: ["ADMIN", "ASSISTANTMANAGER", "TEACHER", "STUDENT"],
    },
];

// ====================== ADMIN TABLE HEADERS ======================
export const adminTableHeaders = [
    {
        _id: "1",
        title: "#",
        value: "#",
    },
    {
        _id: "2",
        title: "SSN",
        value: "ssn",
    },
    {
        _id: "3",
        title: "Username",
        value: "username",
    },
    {
        _id: "4",
        title: "Gender",
        value: "gender",
    },
    {
        _id: "5",
        title: "Name",
        value: "name",
    },
    {
        _id: "6",
        title: "Phone Number",
        value: "phoneNumber",
    },
    {
        _id: "7",
        title: "",
        value: "",
    },
];

// ====================== ADMIN TABLE CONTENT ======================
export const adminTableContent = [
    "ssn",
    "username",
    "gender",
    "name",
    "phoneNumber",
];

// ====================== PAGE ROLES ======================
export const pageRoles = {
    dashboard: ["ADMIN", "MANAGER", "ASSISTANTMANAGER", "TEACHER", "STUDENT"],
    adminManagement: ["ADMIN"],
    managerManagement: ["ADMIN"],
    assistantManagerManagement: ["ADMIN", "MANAGER"],
    teacherManagement: ["ADMIN", "ASSISTANTMANAGER"],
    lessonManagement: ["ADMIN", "ASSISTANTMANAGER"],
    studentManagement: ["ADMIN", "ASSISTANTMANAGER"],
    studentInformationManagement: ["TEACHER"],
    meetingManagement: ["TEACHER"],
    messages: ["ADMIN", "MANAGER", "ASSISTANTMANAGER"],
    chooseLesson: ["STUDENT"],
    gradesAndMeetings: ["STUDENT"],
};

// ====================== MESSAGE HEADERS ======================
export const messageHeaders = [
    {
        _id: "1",
        title: "#",
        value: "#",
    },
    {
        _id: "2",
        title: "Date",
        value: "date",
    },
    {
        _id: "3",
        title: "Email",
        value: "email",
    },
    {
        _id: "4",
        title: "Name",
        value: "name",
    },
    {
        _id: "5",
        title: "Subject",
        value: "subject",
    },
    {
        _id: "6",
        title: "Message",
        value: "message",
    },
];

// ====================== MESSAGE TABLE CONTENT ======================
export const messageTableContent = [
    "date",
    "email",
    "name",
    "subject",
    "message",
];

// ====================== FAQ DATA ======================

export const faqData = [
    {
        id: "1",
        question: "How do I reset my password?",
        answer: "Reach out to our support team via email or phone and we'll help you reset your password.",
    },
    {
        id: "2",
        question: "Can I access Smarty Schools on mobile devices?",
        answer: "Yes, Smarty Schools is mobile-friendly and can be accessed on various devices, ensuring you can manage your school's needs on-the-go.",
    },
    {
        id: "3",
        question:
            "What features does Smarty Schools offer for classroom management?",
        answer: "Smarty Schools offers a range of features including attendance tracking, assignment distribution, grade management, and interactive class schedules.",
    },
    {
        id: "4",
        question: "Is training provided for new users?",
        answer: "Absolutely! We provide comprehensive training sessions for new users to help them navigate and utilize all the features of Smarty Schools effectively.",
    },
    {
        id: "5",
        question: "How does Smarty Schools ensure data security?",
        answer: "We prioritize data security with end-to-end encryption, regular backups, and compliance with global data protection regulations.",
    },
    {
        id: "6",
        question:
            "Can parents access their child’s academic records through Smarty Schools?",
        answer: "Yes, parents can access their child's academic records, including grades and attendance, through a secure parent portal in Smarty Schools.",
    },
    {
        id: "7",
        question:
            "Is there a feature for managing school events and activities?",
        answer: "Definitely! Smarty Schools includes a comprehensive event management feature that allows you to schedule, track, and notify about school events and activities.",
    },
    {
        id: "8",
        question:
            "How does Smarty Schools facilitate communication between teachers and students?",
        answer: "Smarty Schools offers integrated communication tools, including messaging and announcement boards, to facilitate seamless interaction between teachers and students.",
    },
    {
        id: "9",
        question: "Does Smarty Schools support different languages?",
        answer: "Yes, Smarty Schools supports multiple languages, making it accessible to a diverse range of users.",
    },
    {
        id: "10",
        question:
            "Can I integrate Smarty Schools with other educational tools and platforms?",
        answer: "Yes, Smarty Schools is designed to be compatible with various educational tools and platforms for a seamless integration experience.",
    },
    {
        id: "11",
        question:
            "What kind of support can I expect if I encounter issues with Smarty Schools?",
        answer: "Our dedicated support team is available to assist you with any issues or queries you might have. We offer support via email, phone, and through our helpdesk.",
    },
    {
        id: "12",
        question: "How frequently is student data updated in the system?",
        answer: "Student data is updated in real-time, ensuring that all records are current and accurately reflect the latest information.",
    },
];

// ====================== LESSON TABLE HEADERS ======================
export const lessonTableHeaders = [
    {
        _id: "1",
        title: "#",
        value: "#",
    },
    {
        _id: "2",
        title: "Lesson Name",
        value: "lessonName",
    },
    {
        _id: "3",
        title: "Credit Score",
        value: "creditScore",
    },
    {
        _id: "4",
        title: "Compulsory",
        value: "compulsory",
    },
    {
        _id: "5",
        title: "Lesson Id",
        value: "lessonId",
    },
    {
        _id: "6",
        title: "",
        value: "",
    },
];

// ====================== LESSON TABLE CONTENT ======================

export const lessonTableContent = [
    "lessonName",
    "creditScore",
    "compulsory",
    "lessonId",
];

// ====================== EDUCATION TERM TABLE HEADERS ======================
export const educationTermHeaders = [
    {
        _id: "1",
        title: "#",
        value: "#",
    },
    {
        _id: "2",
        title: "Term",
        value: "term",
    },
    {
        _id: "3",
        title: "Start Date",
        value: "startDate",
    },
    {
        _id: "4",
        title: "Last Registration Date",
        value: "lastRegistrationDate",
    },
    {
        _id: "5",
        title: "End Date",
        value: "endDate",
    },
    {
        _id: "6",
        title: "",
        value: "",
    },
];

// ====================== EDUCATION TERM TABLE CONTENT ======================
export const educationTermTableContent = [
    "term",
    "startDate",
    "lastRegistrationDate",
    "endDate",
];

// ====================== LESSON PROGRAM TABLE HEADERS ======================
export const lessonProgramHeaders = [
    {
        _id: "1",
        title: "#",
        value: "#",
    },
    {
        _id: "2",
        title: "Lessons",
        value: "lessonName",
    },
    {
        _id: "3",
        title: "Day",
        value: "day",
    },
    {
        _id: "4",
        title: "Starts At",
        value: "startTime",
    },
    {
        _id: "5",
        title: "Ends At",
        value: "stopTime",
    },
    {
        _id: "6",
        title: "",
        value: "",
    },
];

// ====================== LESSON PROGRAM TABLE CONTENT ======================
export const lessonProgramContent = [
    "lessonName",
    "day",
    "startTime",
    "stopTime",
];

// ====================== MEETING TABLE HEADERS ======================
export const meetingTableHeaders = [
    {
        _id: "1",
        title: "#",
        value: "#",
    },
    {
        _id: "2",
        title: "Date",
        value: "date",
    },
    {
        _id: "3",
        title: "Start Time",
        value: "startTime",
    },
    {
        _id: "4",
        title: "End Time",
        value: "endTime",
    },
    {
        _id: "5",
        title: "Students",
        value: "students",
    },
    {
        _id: "6",
        title: "Teacher",
        value: "teacherName",
    },
    {
        _id: "7",
        title: "Description",
        value: "description",
    },
    {
        _id: "8",
        title: "",
        value: "",
    },
];

// ====================== MEETING TABLE CONTENT ======================
export const meetingTableContent = [
    "date",
    "startTime",
    "stopTime",
    "students",
    "teacherName",
    "description",
];

// ====================== STUDENT INFO TABLE HEADERS ======================
export const studentInfoTableHeaders = [
    {
        _id: "1",
        title: "#",
        value: "#",
    },
    {
        _id: "2",
        title: "Name",
        value: "name",
    },
    {
        _id: "3",
        title: "Lesson",
        value: "lesson",
    },
    {
        _id: "4",
        title: "Absentee",
        value: "absentee",
    },
    {
        _id: "5",
        title: "Midterm",
        value: "midterm",
    },
    {
        _id: "6",
        title: "Final",
        value: "final",
    },
    {
        _id: "7",
        title: "Average",
        value: "average",
    },
    {
        _id: "8",
        title: "Letter Grade",
        value: "note",
    },
    {
        _id: "9",
        title: "Information",
        value: "infoNote",
    },
    {
        _id: "10",
        title: "",
        value: "",
    },
];

// ====================== STUDENT INFO TABLE CONTENT ======================
export const studentInfoTableContent = [
    "studentResponse",
    "lessonName",
    "absentee",
    "midtermExam",
    "finalExam",
    "average",
    "note",
    "infoNote",
];

// ====================== GRADES TABLE HEADERS ======================
export const gradesTableHeaders = [
    {
        _id: "1",
        title: "#",
        value: "#",
    },
    {
        _id: "2",
        title: "Name",
        value: "name",
    },
    {
        _id: "3",
        title: "Lesson",
        value: "lesson",
    },
    {
        _id: "4",
        title: "Absentee",
        value: "absentee",
    },
    {
        _id: "5",
        title: "Midterm",
        value: "midterm",
    },
    {
        _id: "6",
        title: "Final",
        value: "final",
    },
    {
        _id: "7",
        title: "Average",
        value: "average",
    },
    {
        _id: "8",
        title: "Letter Grade",
        value: "note",
    },
    {
        _id: "9",
        title: "Information",
        value: "infoNote",
    },
];

// ====================== MEETINGS TABLE HEADERS ======================
export const meetingsTableHeaders = [
    {
        _id: "1",
        title: "#",
        value: "#",
    },
    {
        _id: "2",
        title: "Date",
        value: "date",
    },
    {
        _id: "3",
        title: "Teacher Name",
        value: "teacherName",
    },
    {
        _id: "4",
        title: "Start Time",
        value: "startTime",
    },
    {
        _id: "5",
        title: "End Time",
        value: "stopTime",
    },
    {
        _id: "6",
        title: "Description",
        value: "description",
    },
];

// ====================== MEETINGS TABLE CONTENT ======================
export const meetingsTableContent = [
    "date",
    "teacherName",
    "startTime",
    "stopTime",
    "description",
];

// ====================== CHOOSE LESSON TABLE HEADERS ======================
export const chooseLessonTableHeaders = [
    {
        _id: "1",
        title: "Lesson",
        value: "lessonName",
    },
    {
        _id: "2",
        title: "Teacher",
        value: "teachers",
    },
    {
        _id: "3",
        title: "Day",
        value: "day",
    },
    {
        _id: "4",
        title: "Start Time",
        value: "startTime",
    },
    {
        _id: "5",
        title: "End Time",
        value: "stopTime",
    },
];

// ====================== CHOOSE LESSON TABLE CONTENT ======================
export const chooseLessonTableContent = [
    "lessonName",
    "teachers",
    "day",
    "startTime",
    "stopTime",
];

// ====================== CHOOSE LESSON SELECTED PROGRAMS HEADERS ======================
export const chooseLessonSelectedProgramsHeaders = [
    {
        _id: "1",
        title: "#",
        value: "#",
    },
    {
        _id: "2",
        title: "Lesson",
        value: "lessonName",
    },
    {
        _id: "3",
        title: "Teacher",
        value: "teachers",
    },
    {
        _id: "4",
        title: "Day",
        value: "day",
    },
    {
        _id: "5",
        title: "Start Time",
        value: "startTime",
    },
    {
        _id: "6",
        title: "End Time",
        value: "stopTime",
    },
];
