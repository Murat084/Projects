import { Route, Routes, useLocation } from "react-router-dom";
import { AuthLayout, ProtectedLayout, RootLayout } from "@/layouts";
import {
    // ROOT PAGES
    ContactPage,
    HomePage,
    LoadingPage,
    NotFoundPage,
    // AUTH PAGES
    LoginPage,
    DashboardPage,
    AdminManagementPage,
    NewAdminPage,
    ManagerManagementPage,
    NewManagerPage,
    EditManagerPage,
    AssistantManagerManagementPage,
    NewAssistantManagerPage,
    EditAssistantManagerPage,
    TeacherManagementPage,
    NewTeacherPage,
    EditTeacherPage,
    StudentManagementPage,
    NewStudentPage,
    EditStudentPage,
    MessagesPage,
    LessonManagementPage,
    NewLessonPage,
    EducationTermsPage,
    NewEducationTermPage,
    LessonProgramsPage,
    NewLessonProgramPage,
    StudentInfoManagementPage,
    NewStudentInfoPage,
    EditStudentInfoPage,
    MeetingManagementPage,
    NewMeetingPage,
    EditMeetingPage,
    ChooseLessonPage,
    GradesAndMeetingsPage,
    UnauthorizedPage,
    // PROTECTED PAGES
} from "@/pages";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { updateLastPath } from "@/utils/functions";
import RoleBasedRoute from "@/providers/role-based-route";
import { pageRoles } from "@/constants/constants";

const App = () => {
    const { loginUser, isPending } = useAuth();
    const location = useLocation();

    useEffect(() => {
        loginUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        updateLastPath(location.pathname);
    }, [location.pathname]);

    if (isPending) return <LoadingPage />;

    return (
        <Routes>
            {/* AUTH ROUTES */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<LoginPage />} />
            </Route>
            {/* ROOT ROUTES */}
            <Route element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Route>
            {/* PROTECTED ROUTES */}
            <Route path="/dashboard" element={<ProtectedLayout />}>
                {/* DASHBOARD */}
                <Route index element={<DashboardPage />} />
                {/* ADMIN MANAGEMENT */}
                <Route
                    path="admin-management"
                    element={
                        <RoleBasedRoute
                            allowedRoles={pageRoles.adminManagement}
                        />
                    }>
                    <Route index element={<AdminManagementPage />} />
                    <Route path="new-admin" element={<NewAdminPage />} />
                </Route>
                {/* MANAGER MANAGEMENT */}
                <Route
                    path="manager-management"
                    element={
                        <RoleBasedRoute
                            allowedRoles={pageRoles.managerManagement}
                        />
                    }>
                    <Route index element={<ManagerManagementPage />} />
                    <Route path="new-manager" element={<NewManagerPage />} />
                    <Route path=":id" element={<EditManagerPage />} />
                </Route>
                {/* ASSISTANT MANAGER MANAGEMENT */}
                <Route
                    path="assistant-manager-management"
                    element={
                        <RoleBasedRoute
                            allowedRoles={pageRoles.assistantManagerManagement}
                        />
                    }>
                    <Route index element={<AssistantManagerManagementPage />} />
                    <Route
                        path="new-assistant-manager"
                        element={<NewAssistantManagerPage />}
                    />
                    <Route path=":id" element={<EditAssistantManagerPage />} />
                </Route>
                {/* TEACHER MANAGEMENT */}
                <Route
                    path="teacher-management"
                    element={
                        <RoleBasedRoute
                            allowedRoles={pageRoles.teacherManagement}
                        />
                    }>
                    <Route index element={<TeacherManagementPage />} />
                    <Route path="new-teacher" element={<NewTeacherPage />} />
                    <Route path=":id" element={<EditTeacherPage />} />
                </Route>
                {/* STUDENT MANAGEMENT */}
                <Route
                    path="student-management"
                    element={
                        <RoleBasedRoute
                            allowedRoles={pageRoles.studentManagement}
                        />
                    }>
                    <Route index element={<StudentManagementPage />} />
                    <Route path="new-student" element={<NewStudentPage />} />
                    <Route path=":id" element={<EditStudentPage />} />
                </Route>
                {/* LESSON MANAGEMENT */}
                <Route
                    path="lesson-management"
                    element={
                        <RoleBasedRoute
                            allowedRoles={pageRoles.lessonManagement}
                        />
                    }>
                    <Route index element={<LessonManagementPage />} />
                    <Route path="new-lesson" element={<NewLessonPage />} />
                    {/* EDUCATION TERMS */}
                    <Route
                        path="education-terms"
                        element={<EducationTermsPage />}
                    />
                    <Route
                        path="new-education-term"
                        element={<NewEducationTermPage />}
                    />
                    {/* LESSON PROGRAMS */}
                    <Route
                        path="lesson-programs"
                        element={<LessonProgramsPage />}
                    />
                    <Route
                        path="new-lesson-program"
                        element={<NewLessonProgramPage />}
                    />
                </Route>
                {/* STUDENT INFO MANAGEMENT */}
                <Route
                    path="student-info-management"
                    element={
                        <RoleBasedRoute
                            allowedRoles={
                                pageRoles.studentInformationManagement
                            }
                        />
                    }>
                    <Route index element={<StudentInfoManagementPage />} />
                    <Route
                        path="new-student-info"
                        element={<NewStudentInfoPage />}
                    />
                    <Route path=":id" element={<EditStudentInfoPage />} />
                </Route>
                {/* MEETING MANAGEMENT */}
                <Route
                    path="meeting-management"
                    element={
                        <RoleBasedRoute
                            allowedRoles={pageRoles.meetingManagement}
                        />
                    }>
                    <Route index element={<MeetingManagementPage />} />
                    <Route path="new-meeting" element={<NewMeetingPage />} />
                    <Route path=":id" element={<EditMeetingPage />} />
                </Route>
                {/* CHOOSE LESSON */}
                <Route
                    path="choose-lesson"
                    element={
                        <RoleBasedRoute
                            isChildren
                            allowedRoles={pageRoles.chooseLesson}>
                            <ChooseLessonPage />
                        </RoleBasedRoute>
                    }
                />
                {/* GRADES AND MEETINGS */}
                <Route
                    path="grades-and-meetings"
                    element={
                        <RoleBasedRoute
                            isChildren
                            allowedRoles={pageRoles.gradesAndMeetings}>
                            <GradesAndMeetingsPage />
                        </RoleBasedRoute>
                    }
                />
                {/* MESSAGES */}
                <Route
                    path="messages"
                    element={
                        <RoleBasedRoute
                            isChildren
                            allowedRoles={pageRoles.messages}>
                            <MessagesPage />
                        </RoleBasedRoute>
                    }
                />
            </Route>
            {/* UNAUTHORIZED */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};

export default App;
