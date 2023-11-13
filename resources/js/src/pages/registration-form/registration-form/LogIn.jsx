import React, { useState } from "react";
import {
    Container,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    useToast,
    InputRightElement,
    InputGroup,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { login } from "../../../repository/user";
import { setProfile } from "../../../reducers/user/userSlice";
import { useDispatch } from "react-redux";

export default () => {
    const dispatch = useDispatch();
    const toast = useToast();

    const [showPassword, setShowPassword] = useState(false);

    let payload = {
        email: "",
        password: "",
    };

    return (
        <Formik
            initialValues={payload}
            onSubmit={async (values, actions) => {
                if (!values) return;
                try {
                    let result = await login(values);

                    if (result?.user?.role == "admin") {
                        navigate("/admin");
                        return;
                    }
                    dispatch(setProfile(result.user));
                } catch (e) {
                    console.log(e);
                    toast({
                        title: "An error occurred. Please try again.",
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
