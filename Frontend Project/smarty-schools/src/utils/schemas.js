// ============== ADMIN SCHEMA ==============
export const adminSchema = [
    {
        _id: "1",
        name: "name",
        type: "text",
        label: "First Name",
        placeholder: "Enter your first name",
        autoComplete: "given-name",
        required: true,
    },
    {
        _id: "2",
        name: "surname",
        type: "text",
        label: "Last Name",
        placeholder: "Enter your last name",
        autoComplete: "family-name",
        required: true,
    },
    {
        _id: "3",
        name: "username",
        type: "text",
        label: "Username",
        placeholder: "Please enter your username",
        autoComplete: "username",
        required: true,
    },
    {
        _id: "4",
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "•� •� •� •� •� •� •� •�",
        autoComplete: "current-password",
        required: true,
    },
    {
        _id: "5",
        name: "confirmPassword",
        type: "password",
        label: "Confirm Password",
        placeholder: "•� •� •� •� •� •� •� •�",
        autoComplete: "new-password",
        required: true,
    },
    {
        _id: "6",
        name: "ssn",
        type: "text",
        label: "SSN (XXX-XX-XXXX)",
        placeholder: "Please enter your SSN",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "7",
        name: "birthDay",
        type: "date",
        label: "Birth Day",
        placeholder: "Please enter your birth day",
        autoComplete: "bday",
        required: true,
    },
    {
        _id: "8",
        name: "birthPlace",
        type: "text",
        label: "Birth Place",
        placeholder: "Please enter your birth place",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "9",
        name: "phoneNumber",
        type: "tel",
        label: "Phone Number (XXX-XXX-XXXX)",
        placeholder: "Please enter your phone number",
        autoComplete: "tel-national",
        required: true,
    },
];

// ============== CONTACT SCHEMA ==============
export const contactSchema = [
    {
        _id: "1",
        name: "name",
        type: "text",
        label: "Name",
        placeholder: "Enter your name",
        autoComplete: "name",
        required: true,
    },
    {
        _id: "2",
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Enter your email",
        autoComplete: "email",
        required: true,
    },
    {
        _id: "3",
        name: "subject",
        type: "text",
        label: "Subject",
        placeholder: "Enter your subject",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "4",
        name: "message",
        type: "textarea",
        label: "Message",
        placeholder: "Enter your message",
        autoComplete: "off",
        required: true,
    },
];

// ====================== EDUCATION TERM ======================
export const educationTermSchema = [
    {
        _id: "1",
        name: "term",
        type: "select",
        label: "Term",
        placeholder: "Please enter the term",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "2",
        name: "startDate",
        type: "date",
        label: "Start Date",
        placeholder: "Please enter the start date",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "3",
        name: "lastRegistrationDate",
        type: "date",
        label: "Last Registration Date",
        placeholder: "Please enter the last registration date",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "4",
        name: "endDate",
        type: "date",
        label: "End Date",
        placeholder: "Please enter the end date",
        autoComplete: "off",
        required: true,
    },
];

// ====================== MEETING ======================
export const meetingSchema = [
    {
        _id: "1",
        name: "date",
        type: "date",
        label: "Date",
        placeholder: "Please enter the date",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "2",
        name: "startTime",
        type: "time",
        label: "Starts At",
        placeholder: "Please enter the start time",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "3",
        name: "stopTime",
        type: "time",
        label: "Ends At",
        placeholder: "Please enter the end time",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "4",
        name: "description",
        type: "textarea",
        label: "Description",
        placeholder: "Please enter the description",
        autoComplete: "off",
        required: true,
    },
];

// ====================== LESSON PROGRAM ======================
export const lessonProgramSchema = [
    {
        _id: "1",
        name: "startTime",
        type: "time",
        label: "Starts At",
        placeholder: "Please enter the start time",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "2",
        name: "stopTime",
        type: "time",
        label: "Ends At",
        placeholder: "Please enter the end time",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "3",
        name: "day",
        type: "select",
        label: "Day",
        placeholder: "Please enter the day",
        autoComplete: "off",
        required: true,
    },
];

// ====================== LESSON ======================
export const lessonSchema = [
    {
        _id: "1",
        name: "lessonName",
        type: "text",
        label: "Lesson Name",
        placeholder: "Please enter the lesson name",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "2",
        name: "creditScore",
        type: "number",
        label: "Credit Score",
        placeholder: "Please enter the lesson's credit score",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "3",
        name: "compulsory",
        type: "checkbox",
        label: "Compulsory",
        placeholder: "Please check if lesson is compulsory",
        autoComplete: "off",
        required: false,
    },
];

// ============== LOGIN SCHEMA ==============
export const loginSchema = [
    {
        _id: "1",
        name: "username",
        type: "text",
        label: "Username",
        placeholder: "Enter your username",
        autoComplete: "username",
        required: true,
    },
    {
        _id: "2",
        name: "password",
        type: "password",
        label: "Password",
        placeholder: "••••••••••••••",
        autoComplete: "current-password",
        required: true,
    },
];

// ====================== STUDENT INFO ======================
export const studentInfoSchema = [
    {
        _id: "1",
        name: "studentId",
        type: "select",
        label: "Student",
        placeholder: "Please select the student",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "2",
        name: "lessonId",
        type: "select",
        label: "Lesson",
        placeholder: "Please select the lesson",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "3",
        name: "educationTermId",
        type: "select",
        label: "Education Term",
        placeholder: "Please select the education term",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "4",
        name: "absentee",
        type: "number",
        label: "Absentee",
        placeholder: "Enter how many days the student was absent",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "5",
        name: "midtermExam",
        type: "number",
        label: "Midterm Exam",
        placeholder: "Enter the midterm exam score",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "6",
        name: "finalExam",
        type: "number",
        label: "Final Exam",
        placeholder: "Enter the final exam score",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "7",
        name: "infoNote",
        type: "textarea",
        label: "Info Note",
        placeholder: "Enter the info note",
        autoComplete: "off",
        required: true,
    },
];

// ====================== TEACHER ======================
export const teacherSchema = [
    ...adminSchema,
    {
        _id: "10",
        name: "email",
        type: "email",
        label: "Email",
        placeholder: "Please enter your email",
        autoComplete: "email",
        required: true,
    },
];

// ====================== STUDENT ======================
export const studentSchema = [
    ...teacherSchema,
    {
        _id: "11",
        name: "fatherName",
        type: "text",
        label: "Father Name",
        placeholder: "Please enter your father name",
        autoComplete: "off",
        required: true,
    },
    {
        _id: "12",
        name: "motherName",
        type: "text",
        label: "Mother Name",
        placeholder: "Please enter your mother name",
        autoComplete: "off",
        required: true,
    },
];
