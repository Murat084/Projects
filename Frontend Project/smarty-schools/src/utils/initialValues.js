// =============== ADMIN ===============
export const adminInitialValues = {
    birthDay: "",
    birthPlace: "",
    confirmPassword: "",
    gender: "",
    name: "",
    password: "",
    phoneNumber: "",
    ssn: "",
    surname: "",
    username: "",
};

// =============== CONTACT ===============
export const contactInitialValues = {
    email: "",
    message: "",
    name: "",
    subject: "",
};

// ====================== EDUCATION TERM ======================
export const educationTermInitialValues = {
    endDate: "",
    lastRegistrationDate: "",
    startDate: "",
    term: "",
};

// ====================== LESSON PROGRAM ======================
export const lessonProgramInitialValues = {
    day: "",
    educationTermId: "",
    lessonIdList: null,
    startTime: "",
    stopTime: "",
};

// ====================== LESSON TERM ======================
export const lessonInitialValues = {
    compulsory: true,
    creditScore: 0,
    lessonName: "",
};

// =============== LOGIN ===============
export const loginInitialValues = {
    username: "",
    password: "",
};

// ====================== MEETING ======================
export const meetingInitialValues = {
    date: "",
    description: "",
    startTime: "",
    stopTime: "",
    studentIds: "",
};

// ====================== STUDENT ======================
export const studentInitialValues = {
    advisorTeacherId: "",
    birthDay: "",
    birthPlace: "",
    confirmPassword: "",
    email: "",
    fatherName: "",
    gender: "",
    motherName: "",
    name: "",
    password: "",
    phoneNumber: "",
    ssn: "",
    surname: "",
    username: "",
};

// ====================== STUDENT INFO ======================
export const studentInfoInitialValues = {
    studentId: "",
    lessonId: "",
    educationTermId: "",
    absentee: "",
    midtermExam: "",
    finalExam: "",
    infoNote: "",
};

// ====================== TEACHER ======================
export const teacherInitialValues = {
    birthDay: "",
    birthPlace: "",
    confirmPassword: "",
    email: "",
    gender: "",
    isAdvisorTeacher: false,
    lessonsIdList: [],
    name: "",
    password: "",
    phoneNumber: "",
    ssn: "",
    surname: "",
    username: "",
};
