import { useAuth } from "@/hooks/useAuth";
import { swalToast } from "@/utils/functions";
import { loginInitialValues } from "@/utils/initialValues";
import { loginSchema } from "@/utils/schemas";
import { loginValidationSchema } from "@/utils/validations";
import { useFormik } from "formik";
import {
    Button,
    Container,
    FloatingLabel,
    Form,
    Spinner,
} from "react-bootstrap";

const LoginPage = () => {
    const { loginUser } = useAuth();

    const onSubmit = async (values) => {
        // trim the values so that we don't have any leading or trailing spaces
        const payload = {
            username: values.username.trim(),
            password: values.password.trim(),
        };

        try {
            const response = await loginUser(payload);
            if (response.status === 200) {
                return swalToast("You have been logged in.", "success");
            } else if (response.status === 401) {
                return swalToast("Invalid username or password", "error");
            } else {
                return swalToast(
                    "There was a problem logging you in. Please try again.",
                    "error"
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    const formik = useFormik({
        initialValues: loginInitialValues,
        validationSchema: loginValidationSchema,
        onSubmit,
    });

    return (
        <Container
            style={{ maxWidth: "600px" }}
            className="login-page_container d-flex flex-column justify-content-center align-items-center gap-4 p-5">
            <img
                src="/images/logo.svg"
                alt="Smarty Schools"
                title="Smarty School"
                width={130}
            />
            <h1 className="fs-3 text-center">
                To proceed using Smarty Schools, please login to your account
            </h1>
            <Form noValidate onSubmit={formik.handleSubmit} className="w-100">
                {loginSchema.map((item) => (
                    <FloatingLabel
                        key={item._id}
                        controlId={item.name}
                        className="mb-3"
                        label={item.label}>
                        <Form.Control
                            className="fw-bold"
                            {...item}
                            {...formik.getFieldProps(item.name)}
                            isInvalid={
                                formik.errors[item.name] &&
                                formik.touched[item.name]
                            }
                            isValid={
                                !formik.errors[item.name] &&
                                formik.touched[item.name]
                            }
                        />
                        <Form.Control.Feedback type="invalid">
                            {formik.errors[item.name]}
                        </Form.Control.Feedback>
                    </FloatingLabel>
                ))}
                <div className="d-flex justify-content-end">
                    <Button
                        variant="secondary"
                        className="fw-bold btn-wide text-light px-5"
                        type="submit"
                        title="Login"
                        disabled={
                            !formik.dirty ||
                            !formik.isValid ||
                            formik.isSubmitting
                        }>
                        {formik.isSubmitting ? (
                            <>
                                <Spinner animation="border" size="sm" />
                                <span className="ms-2">Logging in...</span>
                            </>
                        ) : (
                            "Login"
                        )}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default LoginPage;
