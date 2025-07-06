import { getEducationTerms } from "@/api/education-term-services";
import { getLessons } from "@/api/lesson-services";
import { createStudentInfo } from "@/api/student-info-services";
import { getStudentsForAdvisor } from "@/api/student-services";
import {
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
import { useNavigate } from "react-router-dom";

const NewStudentInfoPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        educationTermId: [],
        lessonId: [],
        studentId: [],
    });

    const onSubmit = async (values) => {
        try {
            await createStudentInfo(values);
            formik.resetForm();
            swalToast("Student information created successfully", "success");
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
            const responseEducationTerms = await getEducationTerms();
            const responseLessons = await getLessons();
            const responseStudents = await getStudentsForAdvisor();

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

    const formik = useFormik({
        initialValues: studentInfoInitialValues,
        validationSchema: studentInfoValidation,
        onSubmit,
    });

    useEffect(() => {
        fetchData();
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
                                Creating...
                            </span>
                        ) : (
                            "Create"
                        )}
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default NewStudentInfoPage;
