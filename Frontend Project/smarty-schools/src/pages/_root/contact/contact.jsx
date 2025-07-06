import { createMessage } from "@/api/message-services";
import { faqData } from "@/constants/constants";
import { swalToast } from "@/utils/functions";
import { contactInitialValues } from "@/utils/initialValues";
import { contactSchema } from "@/utils/schemas";
import { contactValidationSchema } from "@/utils/validations";
import { useFormik } from "formik";
import {
    Accordion,
    Button,
    Col,
    FloatingLabel,
    Form,
    Row,
    Spinner,
} from "react-bootstrap";

const ContactPage = () => {
    const onSubmit = async (values) => {
        try {
            await createMessage(values);
            formik.resetForm();
            swalToast("Your message has been sent successfully!", "success");
        } catch (error) {
            console.log(error);
            swalToast(
                "An error occurred while sending your message. Please try again.",
                "error"
            );
        }
    };

    const formik = useFormik({
        initialValues: contactInitialValues,
        validationSchema: contactValidationSchema,
        onSubmit,
    });

    return (
        <div className="contact-page_container">
            <div className="contact-page_titles">
                <h1 className="contact-page_title">
                    Have questions or need support?
                </h1>
                <h2 className="contact-page_subtitle">
                    Our team is ready to help you navigate the halls of Smarty
                    Schools&apos; school management system.
                </h2>
            </div>
            <div className="contact-page_inner-container">
                <div className="contact-page_accordion-container">
                    <Accordion>
                        {faqData.map((question) => (
                            <Accordion.Item
                                key={question.id}
                                eventKey={question.id}>
                                <Accordion.Header>
                                    {question.question}
                                </Accordion.Header>
                                <Accordion.Body>
                                    {question.answer}
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                </div>
                <div className="contact-page_contact-form_container">
                    <h3>
                        Whether you&apos;re looking for guidance, technical
                        support, or just want to send us your feedback,
                        we&apos;re here to listen and assist.
                    </h3>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Row>
                            {contactSchema.map((field) => (
                                <Col key={field._id} xs={12}>
                                    <FloatingLabel
                                        controlId={field.name}
                                        label={`${field.required ? "*" : ""} ${
                                            field.label
                                        }`}
                                        className="mb-3">
                                        <Form.Control
                                            type={field.type}
                                            as={
                                                field.type === "textarea"
                                                    ? "textarea"
                                                    : "input"
                                            }
                                            {...formik.getFieldProps(
                                                field.name
                                            )}
                                            autoComplete={field.autoComplete}
                                            isValid={
                                                formik.touched[field.name] &&
                                                !formik.errors[field.name]
                                            }
                                            isInvalid={
                                                formik.touched[field.name] &&
                                                !!formik.errors[field.name]
                                            }
                                            style={{
                                                height:
                                                    field.type === "textarea"
                                                        ? "150px"
                                                        : "auto",
                                                resize: "none",
                                            }}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors[field.name]}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Col>
                            ))}
                        </Row>
                        <Row>
                            <Col className="text-end">
                                <Button
                                    type="submit"
                                    variant="secondary"
                                    disabled={
                                        !formik.dirty ||
                                        !formik.isValid ||
                                        formik.isSubmitting
                                    }
                                    title="Send Message"
                                    className="fw-bold btn-wide text-light">
                                    {formik.isSubmitting ? (
                                        <span className="d-flex justify-content-center align-items-center gap-2">
                                            <Spinner
                                                animation="border"
                                                size="sm"
                                            />
                                            Sending...
                                        </span>
                                    ) : (
                                        "Send"
                                    )}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
