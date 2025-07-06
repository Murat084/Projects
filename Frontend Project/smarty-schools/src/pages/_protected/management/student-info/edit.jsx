import { getEducationTerms } from "@/api/education-term-services";
import { getLessons } from "@/api/lesson-services";
import {
    deleteStudentInfo,
    getStudentInfosById,
    updateStudentInfo,
} from "@/api/student-info-services";
import { getStudentsForAdvisor } from "@/api/student-services";
import {
    swalQuestion,
    swalToast,
    transformEducationTermsArray,
    transformLessonsArray,
    transformStudentsArray,
} from "@/utils/functions";
import { studentInfoInitialValues } from "@/utils/initialValues";
import { studentInfoSchema } from "@/utils/schemas";
import { studentInfoValidation } from "@/utils/validations";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
    Button,
    Col,
    FloatingLabel,
    Form,
    Row,
    Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditStudentInfoPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({
        educationTermId: [],
        lessonId: [],
        studentId: [],
    });
    const [isDeleting, setIsDeleting] = useState(false);

    const onSubmit = async (values) => {
        const payload = {
            absentee: values.absentee,
            educationTermId: values.educationTermId,
            finalExam: values.finalExam,
            infoNote: values.infoNote,
            lessonId: values.lessonId,
            midtermExam: values.midtermExam,
            studentId: values.studentId,
        };
        try {
            await updateStudentInfo(id, payload);
            formik.resetForm();
            swalToast("Student information updated successfully", "success");
            navigate("/dashboard/student-info-management");
        } catch (error) {
            swalToast(
                Object.values(error?.response?.data?.validations),
                "error"
            );
        }
    };

    const fetchData = async () => {
        try {
            const response = await getStudentInfosById(id);
            const responseEducationTerms = await getEducationTerms();
            const responseLessons = await getLessons();
            const responseStudents = await getStudentsForAdvisor();

            formik.setValues({
                ...response.data,
                studentId: response.data?.studentResponse?.userId,
            });

            setData({
                educationTermId: transformEducationTermsArray(
                    responseEducationTerms.data
                ),
                lessonId: transformLessonsArray(responseLessons.data),
                studentId: transformStudentsArray(responseStudents.data),
            });
        } catch (error) {
            let message = error.response?.data?.message;
            if (message === "No message available") {
                message = "Something went wrong";
            }
            swalToast(message, "error");
        }
    };

    const handleDelete = (id) => {
        swalQuestion(
            "Are you sure you want to delete this student information?"
        ).then(async (response) => {
            if (response.isConfirmed) {
                setIsDeleting(true);
                try {
                    await deleteStudentInfo(id);
                    swalToast(
                        "Student information deleted successfully",
                        "success"
                    );
                    navigate("/dashboard/student-info-management");
                } catch (error) {
                    let message = error.response?.data?.message;
                    if (message === "No message available") {
                        message = "Something went wrong";
                    }
                    swalToast(message, "error");
                } finally {
                    setIsDeleting(false);
                }
            }
        });
    };

    const formik = useFormik({
        initialValues: studentInfoInitialValues,
        validationSchema: studentInfoValidation,
        onSubmit,
        enableReinitialize: true,
    });

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Form
            noValidate
            onSubmit={formik.handleSubmit}
            className="bg-light rounded-3 p-4 shadow-sm">
            <Row>
                {studentInfoSchema.map((item) => (
                    <Col key={item._id} xs={12} lg={6} xxl={4}>
                        <FloatingLabel
                            controlId={item.name}
                            label={`${item.required ? "*" : ""}${item.label}`}
                            className="mb-3">
                            {item.type === "select" ? (
                                <Form.Select
                                    {...formik.getFieldProps(item.name)}
                                    autoComplete={item.autoComplete}
                                    isValid={
                                        formik.touched[item.name] &&
                                        !formik.errors[item.name]
                                    }
                                    isInvalid={
                                        formik.touched[item.name] &&
                                        formik.errors[item.name]
                                    }>
                                    <option value="">Choose...</option>
                                    {data[item.name] &&
                                        data[item.name].map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                </Form.Select>
                            ) : (
                                <Form.Control
                                    type={item.type}
                                    {...formik.getFieldProps(item.name)}
                                    autoComplete={item.autoComplete}
                                    isValid={
                                        formik.touched[item.name] &&
                                        !formik.errors[item.name]
                                    }
                                    isInvalid={
                                        formik.touched[item.name] &&
                                        formik.errors[item.name]
                                    }
                                />
                            )}
                            <Form.Control.Feedback type="invalid">
                                {formik.errors[item.name]}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                ))}
            </Row>
            <Row>
                <Col className="text-end">
                    <Button
                        variant="success"
                        type="button"
                        className="fw-bold btn-wide"
                        onClick={() =>
                            navigate("/dashboard/student-info-management")
                        }>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        type="button"
                        onClick={() => handleDelete(id)}
                        className="fw-bold btn-wide ms-3"
                        disabled={formik.isSubmitting || isDeleting}>
                        {isDeleting ? (
                            <span className="d-flex justify-content-center align-items-center gap-2">
                                <Spinner animation="border" size="sm" />
                                Deleting...
                            </span>
                        ) : (
                            "Delete"
                        )}
                    </Button>
                    <Button
                        type="submit"
                        variant="secondary"
                        disabled={
                            !formik.dirty ||
                            !formik.isValid ||
                            formik.isSubmitting
                        }
                        className="fw-bold btn-wide ms-3">
                        {formik.isSubmitting ? (
                            <span className="d-flex justify-content-center align-items-center gap-2">
                                <Spinner animation="border" size="sm" />
                                Updating...
                            </span>
                        ) : (
                            "Update"
                        )}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default EditStudentInfoPage;
