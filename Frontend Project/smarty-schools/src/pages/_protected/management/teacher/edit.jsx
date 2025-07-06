import { getLessonPrograms } from "@/api/lesson-program-services";
import {
    deleteTeacher,
    getTeacherById,
    updateTeacher,
} from "@/api/teacher-services";
import {
    extractLessonPrograms,
    getFilteredData,
    swalQuestion,
    swalToast,
} from "@/utils/functions";
import { teacherInitialValues } from "@/utils/initialValues";
import { teacherSchema } from "@/utils/schemas";
import { teacherValidation } from "@/utils/validations";
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
import Select from "react-select";

const EditTeacherPage = () => {
    const navigate = useNavigate();
    const [lessonPrograms, setLessonPrograms] = useState(null);
    const [selectedLessons, setSelectedLessons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const { id } = useParams();

    const onSubmit = async (values) => {
        // following line is for removing confirmPassword field from values when sending to server
        // eslint-disable-next-line no-unused-vars
        const { id: teacherId, confirmPassword, ...data } = values;

        try {
            await updateTeacher(teacherId, data);
            formik.resetForm();
            swalToast("Teacher updated successfully", "success");
            navigate("/dashboard/teacher-management");
        } catch (error) {
            swalToast(
                Object.values(error?.response?.data?.validations),
                "error"
            );
        }
    };

    const handleDelete = (id) => {
        swalQuestion("Are you sure you want to delete this teacher?").then(
            async (response) => {
                if (response.isConfirmed) {
                    setIsDeleting(true);
                    try {
                        await deleteTeacher(id);
                        swalToast("Teacher deleted successfully", "success");
                        navigate("/dashboard/teacher-management");
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

    const formik = useFormik({
        initialValues: teacherInitialValues,
        validationSchema: teacherValidation,
        onSubmit,
        enableReinitialize: true,
    });

    const fetchData = async (id) => {
        setLoading(true);
        try {
            const response = await getTeacherById(id);
            // following line is for removing lessonsProgramList from values when setting formik values, because it is not needed
            if (response.data?.object) {
                const { lessonsProgramList, isAdvisor, ...data } =
                    response.data.object;
                const lessonsResponse = await getLessonPrograms();
                setLessonPrograms(lessonsResponse.data);
                // following line is for setting formik values
                formik.setValues({
                    ...data,
                    lessonsIdList: lessonsProgramList.map((item) => item.id),
                    isAdvisorTeacher: isAdvisor,
                });
                // following line is for setting selected lessons
                setSelectedLessons(
                    getFilteredData(
                        lessonsResponse.data,
                        lessonsProgramList.map((item) => item.id)
                    )
                );
            }
        } catch (error) {
            swalToast(
                error?.response?.data?.message || "Something went wrong",
                "error"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleMultipleSelectChange = (selectedItems) => {
        // create a new array
        let lessonsIdList = [];
        // push all the id's of the selected items
        selectedItems.forEach((selectedItem) => {
            lessonsIdList.push(selectedItem.value);
        });
        // update the formik values with the new array of options
        formik.setFieldValue("lessonsIdList", lessonsIdList);
        setSelectedLessons(getFilteredData(lessonPrograms, lessonsIdList));
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
                {teacherSchema.map((item) => (
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
                {/* IS ADVISOR TEACHER */}
                <Col xs={12} lg={6} xxl={4}>
                    <Form.Check
                        inline
                        label="Advisor Teacher"
                        type="checkbox"
                        checked={formik.values.isAdvisorTeacher}
                        className="fw-normal mb-3"
                        {...formik.getFieldProps("isAdvisorTeacher")}
                    />
                </Col>
                {/* LESSON PROGRAM SELECTION */}
                <Col xs={12} lg={6} xxl={4}>
                    <Select
                        options={extractLessonPrograms(lessonPrograms)}
                        onChange={handleMultipleSelectChange}
                        isMulti
                        className="mb-3"
                        value={selectedLessons}
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
                            navigate("/dashboard/teacher-management")
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

export default EditTeacherPage;
