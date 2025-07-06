import { createMeeting } from "@/api/meeting-services";
import { getStudentsForAdvisor } from "@/api/student-services";
import { swalToast, transformStudentsArray } from "@/utils/functions";
import { meetingInitialValues } from "@/utils/initialValues";
import { meetingSchema } from "@/utils/schemas";
import { meetingValidation } from "@/utils/validations";
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
import Select from "react-select";

const NewMeetingPage = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);

    const onSubmit = async (values) => {
        try {
            await createMeeting(values);
            formik.resetForm();
            swalToast("Meeting created successfully", "success");
            navigate("/dashboard/meeting-management");
        } catch (error) {
            swalToast(
                Object.values(error?.response?.data?.validations),
                "error"
            );
        }
    };

    const fetchData = async () => {
        try {
            const response = await getStudentsForAdvisor();
            setStudents(response.data);
        } catch (error) {
            let message = error.response?.data?.message;
            if (message === "No message available") {
                message = "Something went wrong";
            }
            swalToast(message, "error");
        }
    };

    const handleMultipleSelectChange = (selectedItems) => {
        let studentIds = [];
        selectedItems.map((selectedItem) =>
            studentIds.push(selectedItem.value)
        );
        formik.setFieldValue("studentIds", studentIds);
    };

    const formik = useFormik({
        initialValues: meetingInitialValues,
        validationSchema: meetingValidation,
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
                {meetingSchema.map((item) => (
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
                <Col xs={12} lg={6} xxl={4}>
                    <Select
                        className="mb-3"
                        options={transformStudentsArray(students)}
                        isMulti
                        onChange={handleMultipleSelectChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col className="text-end">
                    <Button
                        variant="success"
                        type="button"
                        className="fw-bold btn-wide"
                        onClick={() =>
                            navigate("/dashboard/meeting-management")
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

export default NewMeetingPage;
