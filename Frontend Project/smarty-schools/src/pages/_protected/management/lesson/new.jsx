import { createLesson } from "@/api/lesson-services";
import { swalToast } from "@/utils/functions";
import { lessonInitialValues } from "@/utils/initialValues";
import { lessonSchema } from "@/utils/schemas";
import { lessonValidation } from "@/utils/validations";
import { useFormik } from "formik";
import {
    Button,
    Col,
    FloatingLabel,
    Form,
    Row,
    Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NewLessonPage = () => {
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            await createLesson(values);
            formik.resetForm();
            swalToast("Lesson created successfully", "success");
            navigate("/dashboard/lesson-management");
        } catch (error) {
            swalToast(
                Object.values(error?.response?.data?.validations),
                "error"
            );
        }
    };

    const formik = useFormik({
        initialValues: lessonInitialValues,
        validationSchema: lessonValidation,
        onSubmit,
    });

    return (
        <Form
            noValidate
            onSubmit={formik.handleSubmit}
            className="bg-light rounded-3 p-4 shadow-sm">
            <Row>
                {lessonSchema.map((item) => (
                    <Col key={item._id} xs={12} lg={6} xxl={4}>
                        {item.type === "checkbox" ? (
                            <Form.Check
                                inline
                                label={item.label}
                                type={item.type}
                                className="fw-normal mb-3"
                                {...formik.getFieldProps(item.name)}
                            />
                        ) : (
                            <FloatingLabel
                                controlId={item.name}
                                label={`${item.required ? "*" : ""}${
                                    item.label
                                }`}
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
                        )}
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
                            navigate("/dashboard/lesson-management")
                        }>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="secondary"
                        disabled={formik.isSubmitting}
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

export default NewLessonPage;
