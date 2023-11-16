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
import { useTranslation } from "react-i18next";

export default () => {
    const toast = useToast();
    const { t } = useTranslation();

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
                        title: `${t("Password and confirm password does not match.")}`,
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
                        title: `${t("You have successfully registered! You may now proceed to login.")}`,
                        status: "success",
                        isClosable: true,
                        position: "top",
                    });
                } catch (e) {
                    toast({
                        title:
                            e?.message ||
                            `${t("An error occurred. Please try again.")}`,
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
                                return `${t("Full name is required")}`;
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
                                <FormLabel>{t("Full Name")}</FormLabel>
                                <Input {...field} placeholder={t("Full Name")} />
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
                                return `${t("Email is required")}`;
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
                                <FormLabel>{t("Email")}</FormLabel>
                                <Input {...field} placeholder={t("Email")} />
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
                                return `${t("Password is required")}`;
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
                                <FormLabel>{t("Password")}</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        {...field}
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder={t("Password")}
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            h="1.75rem"
                                            size="sm"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? `${t("Hide")}` : `${t("Show")}`}
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
                                return `${t("Confirm password is required")}`;
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
                                <FormLabel>{t("Confirm Password")}</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        {...field}
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder={t("Confirm Password")}
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
                                                ? `${t("Hide")}` : `${t("Show")}`}
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
                        {t("Submit")}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};
