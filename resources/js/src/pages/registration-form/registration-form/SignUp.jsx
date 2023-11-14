import React, { useState } from "react";
import {
    Container,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    useToast,
    InputGroup,
    InputRightElement,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { signUp } from "../../../repository/user";

export default () => {
    const toast = useToast();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    let payload = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    return (
        <Formik
            initialValues={payload}
            onSubmit={async (values, actions) => {
                if (!values) return;
                if (values.password != values.confirmPassword) {
                    toast({
                        title: "Password and confirm password does not match.",
                        status: "error",
                        isClosable: true,
                        position: "top",
                    });
                    actions.setSubmitting(false);
                    return;
                }
                try {
                    await signUp(values);
                    actions.resetForm();
                    toast({
                        title: "You have successfully registered! You may now proceed to login.",
                        status: "success",
                        isClosable: true,
                        position: "top",
                    });
                } catch (e) {
                    toast({
                        title:
                            e?.message ||
                            "An error occurred. Please try again.",
                        status: "error",
                        isClosable: true,
                        position: "top",
                    });
                }
                actions.setSubmitting(false);
            }}
        >
            {(props) => (
                <Form>
                    <Container height={"24px"} />
                    <Field
                        name="name"
                        validate={(value) => {
                            if (!value) {
                                return "Full name is required";
                            }
                            return null;
                        }}
                    >
                        {({ field, form }) => (
                            <FormControl
                                isInvalid={
                                    form.errors.name && form.touched.name
                                }
                            >
                                <FormLabel>Full name</FormLabel>
                                <Input {...field} placeholder="Full name" />
                                <FormErrorMessage>
                                    {form.errors.name}
                                </FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Container height={"24px"} />
                    <Field
                        name="email"
                        validate={(value) => {
                            if (!value) {
                                return "Email is required";
                            }
                            return null;
                        }}
                    >
                        {({ field, form }) => (
                            <FormControl
                                isInvalid={
                                    form.errors.email && form.touched.email
                                }
                            >
                                <FormLabel>Email</FormLabel>
                                <Input {...field} placeholder="Email" />
                                <FormErrorMessage>
                                    {form.errors.email}
                                </FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Container height={"24px"} />
                    <Field
                        name="password"
                        validate={(value) => {
                            if (!value) {
                                return "Password is required";
                            }
                            return null;
                        }}
                    >
                        {({ field, form }) => (
                            <FormControl
                                isInvalid={
                                    form.errors.password &&
                                    form.touched.password
                                }
                            >
                                <FormLabel>Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        {...field}
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>
                                    {form.errors.password}
                                </FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Container height={"24px"} />
                    <Field
                        name="confirmPassword"
                        validate={(value) => {
                            if (!value) {
                                return "Confirm password is required";
                            }
                            return null;
                        }}
                    >
                        {({ field, form }) => (
                            <FormControl
                                isInvalid={
                                    form.errors.confirmPassword &&
                                    form.touched.confirmPassword
                                }
                            >
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        {...field}
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Confirm Password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        >
                                            {showConfirmPassword
                                                ? "Hide"
                                                : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                <FormErrorMessage>
                                    {form.errors.confirmPassword}
                                </FormErrorMessage>
                            </FormControl>
                        )}
                    </Field>
                    <Container height={"24px"} />
                    <Button
                        width={"100%"}
                        colorScheme="teal"
                        isLoading={props.isSubmitting}
                        type="submit"
                    >
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
