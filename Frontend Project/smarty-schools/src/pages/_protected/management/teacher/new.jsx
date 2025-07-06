import { getLessonPrograms } from "@/api/lesson-program-services";
import { createTeacher } from "@/api/teacher-services";
import { extractLessonPrograms, swalToast } from "@/utils/functions";
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
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const NewTeacherPage = () => {
    const navigate = useNavigate();
    const [lessonPrograms, setLessonPrograms] = useState(null);

    const onSubmit = async (values) => {
        // following line is for removing confirmPassword field from values when sending to server
        // eslint-disable-next-line no-unused-vars
        const { id, confirmPassword, ...data } = values;

        try {
            await createTeacher(data);
            formik.resetForm();
            swalToast("Teacher created successfully", "success");
            navigate("/dashboard/teacher-management");
        } catch (error) {
            swalToast(
                Object.values(error?.response?.data?.validations),
                "error"
            );
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
    };

    const fetchData = async () => {
        try {
            const response = await getLessonPrograms();
            setLessonPrograms(response.data);
        } catch (error) {
            let message = error.response?.data?.message;
            if (message === "No message available") {
                message = "Something went wrong";
            }
            swalToast(message, "error");
        }
    };

    const formik = useFormik({
        initialValues: teacherInitialValues,
        validationSchema: teacherValidation,
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

export default NewTeacherPage;
