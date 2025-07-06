import { getAdvisorTeachers } from "@/api/advisor-teacher-services";
import { createStudent } from "@/api/student-services";
import { swalToast } from "@/utils/functions";
import { studentInitialValues } from "@/utils/initialValues";
import { studentSchema } from "@/utils/schemas";
import { studentValidation } from "@/utils/validations";
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

const NewStudentPage = () => {
    const navigate = useNavigate();
    const [advisors, setAdvisors] = useState([]);

    const onSubmit = async (values) => {
        // following line is for removing confirmPassword field from values when sending to server
        // eslint-disable-next-line no-unused-vars
        const { id, confirmPassword, ...data } = values;

        try {
            await createStudent(data);
            formik.resetForm();
            swalToast("Student created successfully", "success");
            navigate("/dashboard/student-management");
        } catch (error) {
            swalToast(
                Object.values(error?.response?.data?.validations),
                "error"
            );
        }
    };

    const fetchData = async () => {
        try {
            const response = await getAdvisorTeachers();
            setAdvisors(response.data);
        } catch (error) {
            let message = error.response?.data?.message;
            if (message === "No message available") {
                message = "Something went wrong";
            }
            swalToast(message, "error");
        }
    };

    const formik = useFormik({
        initialValues: studentInitialValues,
        validationSchema: studentValidation,
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
                {studentSchema.map((item) => (
                    <Col key={item._id} xs={12} lg={6} xxl={4}>
                        <FloatingLabel
                            controlId={item.name}
                            label={`${item.required ? "*" : ""}${item.label}`}
                            className="mb-3">
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
                            <Form.Control.Feedback type="invalid">
                                {formik.errors[item.name]}
                            </Form.Control.Feedback>
                        </FloatingLabel>
                    </Col>
                ))}
                {/* GENDER SELECTION */}
                <Col xs={12} lg={6} xxl={4}>
                    <FloatingLabel
                        controlId="gender"
                        label="*Gender"
                        className="mb-3">
                        <Form.Select
                            {...formik.getFieldProps("gender")}
                            isValid={
                                formik.touched.gender && !formik.errors.gender
                            }
                            isInvalid={
                                formik.touched.gender && formik.errors.gender
                            }>
                            <option value="">Select Gender</option>
                            <option value="FEMALE">Female</option>
                            <option value="MALE">Male</option>
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.gender}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                {/* ADVISOR TEACHERS */}
                <Col xs={12} lg={6} xxl={4}>
                    <FloatingLabel
                        controlId="advisorTeacherId"
                        label="*Advisor Teacher"
                        className="mb-3">
                        <Form.Select
                            {...formik.getFieldProps("advisorTeacherId")}
                            isValid={
                                formik.touched.advisorTeacherId &&
                                !formik.errors.advisorTeacherId
                            }
                            isInvalid={
                                formik.touched.advisorTeacherId &&
                                formik.errors.advisorTeacherId
                            }>
                            <option value="">Select Advisor Teacher</option>
                            {advisors.map((advisor) => (
                                <option
                                    key={advisor.advisorTeacherId}
                                    value={advisor.advisorTeacherId}
                                    className="fw-bold"
                                    style={{ textTransform: "capitalize" }}>
                                    {advisor.teacherName}{" "}
                                    {advisor.teacherSurname}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.advisorTeacherId}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
            </Row>
            <Row>
                <Col className="text-end">
                    <Button
                        variant="success"
                        type="button"
                        className="fw-bold btn-wide"
                        onClick={() =>
                            navigate("/dashboard/student-management")
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

export default NewStudentPage;
