import * as yup from "yup";

// ================== ADMIN VALIDATION ==================
export const adminValidation = yup.object({
    birthDay: yup.date().required("Enter your birthday"),
    birthPlace: yup
        .string()
        .required("Enter the place of your birth")
        .max(16, "Birth place must be less than 16 characters"),
    confirmPassword: yup
        .string()
        .required("Confirm your password")
        .oneOf([yup.ref("password")], "Passwords must match"),
    gender: yup
        .string()
        .required("Please select your gender")
        .oneOf(["MALE", "FEMALE"], "You must select a valid gender"),
    name: yup.string().required("Enter your first name"),
    password: yup
        .string()
        .required("Enter your password")
        .min(8, "Password must be at least 8 characters")
        .matches(
            /[a-z]+/,
            "Password must contain at least one lowercase letter"
        )
        .matches(
            /[A-Z]+/,
            "Password must contain at least one uppercase letter"
        )
        .matches(/\d+/, "Password must contain at least one number"),
    phoneNumber: yup
        .string()
        .required("Enter your phone number")
        .matches(
            /\d{3}-\d{3}-\d{4}/g,
            "Phone number must be in format 555-555-5555"
        ),
    ssn: yup
        .string()
        .required("Enter your SSN")
        .matches(/\d{3}-\d{2}-\d{4}/g, "SSN must be in format 123-45-6789"),
    surname: yup.string().required("Enter your last name"),
    username: yup
        .string()
        .required("Enter your username")
        .min(4, "Username must be at least 4 characters")
        .max(16, "Username must be utmost 16 characters"),
});

// ================== CONTACT VALIDATION ==================
export const contactValidationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    message: yup.string().required("Message is required"),
    name: yup.string().required("Name is required"),
    subject: yup.string().required("Subject for the message is required"),
});

// ====================== EDUCATION TERM ======================
export const educationTermValidation = yup.object({
    // check if end date can't be before start date
    endDate: yup
        .date()
        .required("Select an end date")
        .min(yup.ref("startDate"), "End date can't be before start date"),
    // last registration date has to be before both start and end date. And also last registration date has to be at least one month before the start date
    lastRegistrationDate: yup
        .date()
        .required("Last Registration Date is required")
        .test(
            "is-valid",
            "Has to be at least 15 days before the start date",
            function (value) {
                const { startDate } = this.parent;
                const fifteenDaysBeforeStartDate = new Date(startDate);
                fifteenDaysBeforeStartDate.setDate(
                    fifteenDaysBeforeStartDate.getDate() - 15
                );
                return value <= fifteenDaysBeforeStartDate;
            }
        ),
    startDate: yup.date().required("Select a start date"),
    term: yup.string().required("Select a term"),
});

// ====================== LESSON ======================
export const lessonValidation = yup.object({
    creditScore: yup
        .number()
        .required("Enter the credit of this lesson")
        .min(1, "Credit must be at least 1")
        .max(8, "Credit must be at most 8"),
    lessonName: yup
        .string()
        .required("Enter the name of this lesson")
        .max(16, "You can't enter more than 16 characters"),
});

// ====================== LESSON PROGRAM ======================
export const lessonProgramValidation = yup.object({
    educationTermId: yup.string().required("Select an education term"),
    lessonIdList: yup
        .array()
        .required("Select at least a lesson")
        .min(1, "Select at least a lesson"),
    day: yup.string().required("Select a day"),
    startTime: yup
        .string()
        .required("Select a start time")
        .test(
            "is-before",
            "Lesson program can't start after its end time",
            function (value) {
                const { stopTime } = this.parent;
                return value < stopTime;
            }
        ),
    stopTime: yup.string().required("Select a stop time"),
});

// ================== LOGIN VALIDATION ==================
export const loginValidationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});

// ====================== MEETING ======================
export const meetingValidation = yup.object({
    date: yup
        .date()
        .required("Select a date")
        .min(new Date(), "Select a future date"),
    startTime: yup
        .string()
        .required("Select a start time")
        .test(
            "is-before",
            "Meeting can't start after its end time",
            function (value) {
                const { stopTime } = this.parent;
                return value < stopTime;
            }
        ),
    stopTime: yup.string().required("Select a stop time"),
    studentIds: yup
        .array()
        .required("Select at least a student")
        .min(1, "Select at least a student"),
    description: yup
        .string()
        .required("Enter a description")
        .min(2, "Enter a description with at least 2 characters")
        .max(16, "You can't enter more than 16 characters"),
});

// ====================== STUDENT ======================
export const studentValidation = yup.object({
    advisorTeacherId: yup.string().required("Select an advisor teacher"),
    birthDay: yup.date().required("Enter your birth date"),
    birthPlace: yup.string().required("Enter the place of your birth"),
    confirmPassword: yup
        .string()
        .required("Confirm your password")
        .oneOf([yup.ref("password")], "Passwords must match"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Enter your email"),
    fatherName: yup
        .string()
        .required("Enter your father's name")
        .max(16, "You can't enter more than 16 characters"),
    gender: yup
        .string()
        .required("Please select your gender")
        .oneOf(["MALE", "FEMALE", "NOTSPECIFIED"], "You must select a gender"),
    motherName: yup
        .string()
        .required("Enter your mother's name")
        .max(16, "You can't enter more than 16 characters"),
    name: yup.string().required("Enter your first name"),
    password: yup
        .string()
        .required("Enter your password")
        .min(8, "Password must be at least 8 characters long")
        .matches(
            /[a-z]+/,
            "Password must contain at least one lowercase letter"
        )
        .matches(
            /[A-Z]+/,
            "Password must contain at least one uppercase letter"
        )
        .matches(/\d+/, "Password must contain at least one number"),
    phoneNumber: yup
        .string()
        .required("Enter your phone number")
        .matches(
            /\d{3}-\d{3}-\d{4}/g,
            "Phone number must be in format XXX-XXX-XXXX"
        ),
    ssn: yup
        .string()
        .required("Enter your SSN")
        .matches(/\d{3}-\d{2}-\d{4}/g, "SSN must be in format XXX-XX-XXXX"),
    surname: yup.string().required("Enter your last name"),
    username: yup.string().required("Enter your username"),
});

// ====================== STUDENT INFO ======================
export const studentInfoValidation = yup.object({
    studentId: yup.string().required("Select a student"),
    lessonId: yup.string().required("Select a lesson"),
    educationTermId: yup.string().required("Select an education term"),
    absentee: yup
        .number()
        .required("Enter the absentee of this student")
        .min(0, "Absentee can't be less than 0")
        .max(100, "Absentee can't be more than 100"),
    midtermExam: yup
        .number()
        .required("Enter the midterm exam score of this student")
        .min(0, "Midterm exam score can't be less than 0")
        .max(100, "Midterm exam score can't be more than 100"),
    finalExam: yup
        .number()
        .required("Enter the final exam score of this student")
        .min(0, "Final exam score can't be less than 0")
        .max(100, "Final exam score can't be more than 100"),
    infoNote: yup
        .string()
        .required("Enter the information note of for student"),
});

// ====================== TEACHER ======================
export const teacherValidation = yup.object({
    birthDay: yup.date().required("Enter your birth date"),
    birthPlace: yup
        .string()
        .required("Enter the place of your birth")
        .max(16, "You can't enter more than 16 characters"),
    confirmPassword: yup
        .string()
        .required("Confirm your password")
        .oneOf([yup.ref("password")], "Passwords must match"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Enter your email"),
    gender: yup
        .string()
        .required("Please select your gender")
        .oneOf(["MALE", "FEMALE", "NOTSPECIFIED"], "You must select a gender"),
    lessonsIdList: yup.array().required("Select at least a lesson"),
    name: yup.string().required("Enter your first name"),
    password: yup
        .string()
        .required("Enter your password")
        .min(8, "Password must be at least 8 characters long")
        .matches(
            /[a-z]+/,
            "Password must contain at least one lowercase letter"
        )
        .matches(
            /[A-Z]+/,
            "Password must contain at least one uppercase letter"
        )
        .matches(/\d+/, "Password must contain at least one number"),
    phoneNumber: yup
        .string()
        .required("Enter your phone number")
        .matches(
            /\d{3}-\d{3}-\d{4}/g,
            "Phone number must be in format XXX-XXX-XXXX"
        ),
    ssn: yup
        .string()
        .required("Enter your SSN")
        .matches(/\d{3}-\d{2}-\d{4}/g, "SSN must be in format XXX-XX-XXXX"),
    surname: yup.string().required("Enter your last name"),
    username: yup
        .string()
        .required("Enter your username")
        .min(4, "Username must be at least 4 characters")
        .max(16, "Username must be utmost 16 characters"),
});
