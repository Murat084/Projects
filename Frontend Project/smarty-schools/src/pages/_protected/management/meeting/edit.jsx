import {
    deleteMeeting,
    getMeetingById,
    updateMeeting,
} from "@/api/meeting-services";
import {
    convertTimeToHourMinute,
    swalQuestion,
    swalToast,
    transformMeetingsArray,
} from "@/utils/functions";
import { meetingInitialValues } from "@/utils/initialValues";
import { meetingSchema } from "@/utils/schemas";
import { meetingValidation } from "@/utils/validations";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import {
    Button,
    ButtonGroup,
    Col,
    FloatingLabel,
    Form,
    Row,
    Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

const EditMeetingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedStudents, setSelectedStudents] = useState([]);

    const onSubmit = async (values) => {
        // eslint-disable-next-line no-unused-vars
        const { students, ...rest } = values;
        try {
            await updateMeeting(id, rest);
            formik.resetForm();
            swalToast("Meeting updated successfully", "success");
            navigate("/dashboard/meeting-management");
        } catch (error) {
            swalToast(
                Object.values(error?.response?.data?.validations),
                "error"
            );
        }
    };

    const handleDelete = (id) => {
        swalQuestion("Are you sure you want to delete this meeting?").then(
            async (response) => {
                if (response.isConfirmed) {
                    setIsDeleting(true);
                    try {
                        await deleteMeeting(id);
                        swalToast("Meeting deleted successfully", "success");
                        // refetch the data after delete
                        fetchData();
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
            }
        );
    };

    const fetchData = async () => {
        try {
            const response = await getMeetingById(id);
            const {
                date,
                description,
                id: meetingId,
                startTime,
                stopTime,
                students,
            } = response.data.object;

            const payload = {
                date,
                description,
                id: meetingId,
                startTime: convertTimeToHourMinute(startTime),
                stopTime: convertTimeToHourMinute(stopTime),
                students,
                studentIds: students.map((student) => student.id),
            };

            formik.setValues(payload);
            setSelectedStudents(transformMeetingsArray(students));
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
        setSelectedStudents(selectedItems);
    };

    const formik = useFormik({
        initialValues: meetingInitialValues,
        validationSchema: meetingValidation,
        onSubmit,
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
                        className={`${formik.errors.studentIds ? "" : "mb-3"}`}
                        options={transformMeetingsArray(formik.values.students)}
                        isMulti
                        onChange={handleMultipleSelectChange}
                        value={selectedStudents}
                    />
                    {formik.errors.studentIds && (
                        <div className="text-danger font-sm mb-3">
                            {formik.errors.studentIds}
                        </div>
                    )}
                </Col>
            </Row>
            <ButtonGroup className="d-flex align-items-center justify-content-center justify-content-xl-end gap-2">
                <Button
                    variant="success"
                    type="button"
                    className="fw-bold"
                    onClick={() => navigate("/dashboard/meeting-management")}
                    style={{ maxWidth: "200px" }}>
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    type="button"
                    onClick={handleDelete}
                    className="fw-bold"
                    style={{ maxWidth: "200px" }}>
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
                        !formik.dirty || !formik.isValid || formik.isSubmitting
                    }
                    className="fw-bold"
                    style={{ maxWidth: "200px" }}>
                    {formik.isSubmitting ? (
                        <span className="d-flex justify-content-center align-items-center gap-2">
                            <Spinner animation="border" size="sm" />
                            Updating...
                        </span>
                    ) : (
                        "Update"
                    )}
                </Button>
            </ButtonGroup>
        </Form>
    );
};

export default EditMeetingPage;
