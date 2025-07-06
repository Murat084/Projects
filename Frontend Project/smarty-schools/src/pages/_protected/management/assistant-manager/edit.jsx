import {
    deleteViceDean,
    getViceDeanById,
    updateViceDean,
} from "@/api/assistant-manager-services";
import { swalQuestion, swalToast } from "@/utils/functions";
import { adminInitialValues } from "@/utils/initialValues";
import { adminSchema } from "@/utils/schemas";
import { adminValidation } from "@/utils/validations";
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

const EditAssistantManagerPage = () => {
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState(adminInitialValues);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const { id } = useParams();

    const onSubmit = async (values) => {
        try {
            await updateViceDean(values.userId, values);
            formik.resetForm();
            swalToast("Assistant Manager updated successfully", "success");
            navigate("/dashboard/assistant-manager-management");
        } catch (error) {
            swalToast(
                Object.values(error?.response?.data?.validations),
                "error"
            );
        }
    };

    const handleDelete = () => {
        swalQuestion(
            "Are you sure you want to delete this assistant manager?"
        ).then(async (response) => {
            if (response.isConfirmed) {
                setIsDeleting(true);
                try {
                    await deleteViceDean(id);
                    swalToast(
                        "Assistant Manager deleted successfully",
                        "success"
                    );
                    navigate("/dashboard/assistant-manager-management");
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
        initialValues,
        validationSchema: adminValidation,
        onSubmit,
        enableReinitialize: true,
    });

    const fetchData = async (id) => {
        setLoading(true);
        try {
            const response = await getViceDeanById(id);
            setInitialValues((prev) => ({
                ...prev,
                ...response.data?.object,
            }));
        } catch (error) {
            let message = error.response?.data?.message;
            if (message === "No message available") {
                message = "Something went wrong";
            }
            swalToast(message, "error");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return loading ? (
        <div className="d-flex justify-content-center align-items-center h-100">
            <Spinner
                animation="border"
                variant="secondary"
                style={{ width: 60, height: 60 }}
            />
        </div>
    ) : (
        <Form
            noValidate
            onSubmit={formik.handleSubmit}
            className="bg-light rounded-3 p-4 shadow-sm">
            <Row>
                {adminSchema.map((item) => (
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
            </Row>
            <Row>
                <Col className="text-end">
                    <Button
                        variant="success"
                        type="button"
                        className="fw-bold btn-wide"
                        onClick={() =>
                            navigate("/dashboard/assistant-manager-management")
                        }>
                        Cancel
                    </Button>
                    <Button
                        variant="danger"
                        type="button"
                        onClick={handleDelete}
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

export default EditAssistantManagerPage;
