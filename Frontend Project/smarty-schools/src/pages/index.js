// ================= AUTH PAGES =================
export { default as LoginPage } from "@/pages/_auth/login/login";

// ================= ROOT PAGES =================
export { default as ContactPage } from "@/pages/_root/contact/contact";
export { default as HomePage } from "@/pages/_root/home/home";
export { default as LoadingPage } from "@/pages/_root/loading/loading";
export { default as NotFoundPage } from "@/pages/_root/not-found/not-found";
export { default as UnauthorizedPage } from "@/pages/_root/unauthorized/unauthorized";

// ================= PROTECTED PAGES =================
export { default as DashboardPage } from "@/pages/_protected/dashboard/dashboard";
// admin
export { default as AdminManagementPage } from "@/pages/_protected/management/admin/admin";
export { default as NewAdminPage } from "@/pages/_protected/management/admin/new";
// manager
export { default as ManagerManagementPage } from "@/pages/_protected/management/manager/manager";
export { default as NewManagerPage } from "@/pages/_protected/management/manager/new";
export { default as EditManagerPage } from "@/pages/_protected/management/manager/edit";
// assistant manager
export { default as AssistantManagerManagementPage } from "@/pages/_protected/management/assistant-manager/assistant-manager";
export { default as NewAssistantManagerPage } from "@/pages/_protected/management/assistant-manager/new";
export { default as EditAssistantManagerPage } from "@/pages/_protected/management/assistant-manager/edit";
// teacher
export { default as TeacherManagementPage } from "@/pages/_protected/management/teacher/teacher";
export { default as NewTeacherPage } from "@/pages/_protected/management/teacher/new";
export { default as EditTeacherPage } from "@/pages/_protected/management/teacher/edit";
// student
export { default as StudentManagementPage } from "@/pages/_protected/management/student/student";
export { default as NewStudentPage } from "@/pages/_protected/management/student/new";
export { default as EditStudentPage } from "@/pages/_protected/management/student/edit";
// messages
export { default as MessagesPage } from "@/pages/_protected/messages/messages";
// lesson
export { default as LessonManagementPage } from "@/pages/_protected/management/lesson/lesson";
export { default as NewLessonPage } from "@/pages/_protected/management/lesson/new";
export { default as EducationTermsPage } from "@/pages/_protected/management/lesson/education-terms/education-terms";
export { default as NewEducationTermPage } from "@/pages/_protected/management/lesson/education-terms/new";
export { default as LessonProgramsPage } from "@/pages/_protected/management/lesson/lesson-programs/lesson-programs";
export { default as NewLessonProgramPage } from "@/pages/_protected/management/lesson/lesson-programs/new";
// student-info
export { default as StudentInfoManagementPage } from "@/pages/_protected/management/student-info/student-info";
export { default as NewStudentInfoPage } from "@/pages/_protected/management/student-info/new";
export { default as EditStudentInfoPage } from "@/pages/_protected/management/student-info/edit";
// meeting
export { default as MeetingManagementPage } from "@/pages/_protected/management/meeting/meeting";
export { default as NewMeetingPage } from "@/pages/_protected/management/meeting/new";
export { default as EditMeetingPage } from "@/pages/_protected/management/meeting/edit";
// choose-lesson
export { default as ChooseLessonPage } from "@/pages/_protected/management/choose-lesson/choose-lesson";
// grades-and-meetings
export { default as GradesAndMeetingsPage } from "@/pages/_protected/management/grades-and-meetings/grades-and-meetings";
