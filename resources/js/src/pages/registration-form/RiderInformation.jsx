import React, { useEffect } from "react";
import {
    Text,
    Container,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Button,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Field, Form, Formik } from "formik";
import { useTranslation } from "react-i18next";

export default ({ payload, onSavePayload }) => {
    const { t } = useTranslation();
    let formValues = { riderName: "", riderAge: "", federationId: "" };

    useEffect(() => {
        Object.keys(formValues).forEach((key) => {
            if (payload[key]) {
                formValues[key] = payload[key];
            }
        });
    });

    return (
        <Container>
            <Text marginTop={"16px"} fontWeight={"bold"}>
                {t("Rider Information")}
            </Text>
            <Formik
                initialValues={formValues}
                onSubmit={(values, actions) => {
                    if (!values) return;
                    setTimeout(() => {
                        onSavePayload(values);
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {(props) => (
                    <Form>
                        <Container marginTop={"16px"} />
                        <Field
                            name="riderName"
                            validate={(value) => {
                                if (!value) {
                                    return "Rider name is required";
                                }
                                return null;
                            }}
                        >
                            {({ field, form }) => (
                                <FormControl
                                    isRequired={true}
                                    isInvalid={
                                        form.errors.riderName &&
                                        form.touched.riderName
                                    }
                                >
                                    <FormLabel>{t("Rider name")}</FormLabel>
                                    <Input
                                        {...field}
                                        placeholder="Enter full name"
                                    />
                                    <FormErrorMessage>
                                        {form.errors.riderName}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Container marginTop={"16px"} />
                        <Field
                            name="riderAge"
                            validate={(value) => {
                                if (!value) {
                                    return "Rider age is required";
                                }

                                var regex = /^[0-9]+$/;
                                if (!regex.test(value)) {
                                    return "Age must be a number";
                                }
                                return null;
                            }}
                        >
                            {({ field, form }) => (
                                <FormControl
                                    isRequired={true}
                                    isInvalid={
                                        form.errors.riderAge &&
                                        form.touched.riderAge
                                    }
                                >
                                    <FormLabel>{t("Rider age")}</FormLabel>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="Federation ID Number"
                                    />
                                    <FormErrorMessage>
                                        {form.errors.riderAge}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Container marginTop={"16px"} />
                        <Field
                            name="federationId"
                            validate={(value) => {
                                if (!value) {
                                    return "Federation ID Number is required";
                                }
                                return null;
                            }}
                        >
                            {({ field, form }) => (
                                <FormControl
                                    isRequired={true}
                                    isInvalid={
                                        form.errors.federationId &&
                                        form.touched.federationId
                                    }
                                >
                                    <FormLabel>
                                        {t("Federation ID Number")}
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        placeholder="Federation ID Number"
                                    />
                                    <FormErrorMessage>
                                        {form.errors.federationId}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Button
                            mt={"32px"}
                            colorScheme="teal"
                            isLoading={props.isSubmitting}
                            type="submit"
                        >
                            {t("Next")}
                            <ArrowForwardIcon marginLeft={"5px"} />
                        </Button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};
