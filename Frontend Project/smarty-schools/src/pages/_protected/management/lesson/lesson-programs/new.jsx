import { getEducationTerms } from "@/api/education-term-services";
import { createLessonProgram } from "@/api/lesson-program-services";
import { getLessons } from "@/api/lesson-services";
import {
    swalToast,
    transformEducationTermsArray,
    transformLessonsArray,
} from "@/utils/functions";
import { lessonProgramInitialValues } from "@/utils/initialValues";
import { lessonProgramSchema } from "@/utils/schemas";
import { lessonProgramValidation } from "@/utils/validations";
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

const NewLessonProgramPage = () => {
    const navigate = useNavigate();
    const [educationTerms, setEducationTerms] = useState([]);
    const [lessons, setLessons] = useState(null);

    const onSubmit = async (values) => {
        try {
            await createLessonProgram(values);
            formik.resetForm();
            swalToast("Lesson program created successfully", "success");
            navigate("/dashboard/lesson-management/lesson-programs");
        } catch (error) {
            swalToast(
                Object.values(error?.response?.data?.validations),
                "error"
            );
        }
    };

    const handleMultipleSelectChange = (selectedItems) => {
        // create a new array
        let lessonIdList = [];
        // push all the id's of the selected items
        selectedItems.forEach((selectedItem) => {
            lessonIdList.push(selectedItem.value);
        });
        // update the formik values with the new array of options
        formik.setFieldValue("lessonIdList", lessonIdList);
    };

    const fetchData = async () => {
        try {
            const responseEducationTerms = await getEducationTerms();
            const responseLessons = await getLessons();
            setLessons(transformLessonsArray(responseLessons.data));
            setEducationTerms(
                transformEducationTermsArray(responseEducationTerms.data)
            );
        } catch (error) {
            let message = error.response?.data?.message;
            if (message === "No message available") {
                message = "Something went wrong";
            }
            swalToast(message, "error");
        }
    };

    const formik = useFormik({
        initialValues: lessonProgramInitialValues,
        validationSchema: lessonProgramValidation,
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
                {lessonProgramSchema.map((item) => (
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
                                    <option value="">Select Day</option>
                                    <option value="SUNDAY">Sunday</option>
                                    <option value="MONDAY">Monday</option>
                                    <option value="TUESDAY">Tuesday</option>
                                    <option value="WEDNESDAY">Wednesday</option>
                                    <option value="THURSDAY">Thursday</option>
                                    <option value="FRIDAY">Friday</option>
                                    <option value="SATURDAY">Saturday</option>
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
                {/* TERM SELECTION */}
                <Col xs={12} lg={6} xxl={4}>
                    <FloatingLabel
                        controlId="educationTermId"
                        label="*Education Term"
                        className="mb-3">
                        <Form.Select
                            {...formik.getFieldProps("educationTermId")}
                            isValid={
                                formik.touched.educationTermId &&
                                !formik.errors.educationTermId
                            }
                            isInvalid={
                                formik.touched.educationTermId &&
                                formik.errors.educationTermId
                            }>
                            <option value="">Select Term</option>
                            {educationTerms.map((item) => (
                                <option key={item.value} value={item.value}>
                                    {item.label}
                                </option>
                            ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.educationTermId}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                </Col>
                {/* LESSON PROGRAM SELECTION */}
                <Col xs={12} lg={6} xxl={4}>
                    <Select
                        options={lessons}
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
                            navigate(
                                "/dashboard/lesson-management/lesson-programs"
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

export default NewLessonProgramPage;
