import { createEducationTerm } from "@/api/education-term-services";
import { swalToast } from "@/utils/functions";
import { educationTermInitialValues } from "@/utils/initialValues";
import { educationTermSchema } from "@/utils/schemas";
import { educationTermValidation } from "@/utils/validations";
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

const NewEducationTermPage = () => {
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        try {
            await createEducationTerm(values);
            formik.resetForm();
            swalToast("Education term created successfully", "success");
            navigate("/dashboard/lesson-management/education-terms");
        } catch (error) {
            swalToast(
                Object.values(error?.response?.data?.validations),
                "error"
            );
        }
    };

    const formik = useFormik({
        initialValues: educationTermInitialValues,
        validationSchema: educationTermValidation,
        onSubmit,
    });

    return (
        <Form
            noValidate
            onSubmit={formik.handleSubmit}
            className="bg-light rounded-3 p-4 shadow-sm">
            <Row>
                {educationTermSchema.map((item) => (
                    <Col key={item._id} xs={12} lg={6} xxl={4}>
                        <FloatingLabel
                            controlId={item.name}
                            label={`${item.required ? "*" : ""}${item.label}`}
                            className="mb-3">
                            {item.type === "select" ? (
                                <Form.Select
                                    {...formik.getFieldProps(item.name)}
                                    isValid={
                                        formik.touched[item.name] &&
                                        !formik.errors[item.name]
                                    }
                                    isInvalid={
                                        formik.touched[item.name] &&
                                        formik.errors[item.name]
                                    }>
                                    <option value="">Select Term</option>
                                    <option value="SPRING_SEMESTER">
                                        Spring
                                    </option>
                                    <option value="FALL_SEMESTER">Fall</option>
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
                            navigate(
                                "/dashboard/lesson-management/education-terms"
                            )
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

export default NewEducationTermPage;
