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
            <Text marginTop={"24px"} fontWeight={"bold"}>
                {t("Rider Information")}
            </Text>
            <Formik
                initialValues={formValues}
                onSubmit={(values, actions) => {
                    if (!values) return;
                    setTimeout(() => {
                        onSavePayload(values);
                        actions.setSubmitting(false);
                    }, 500);
                }}
            >
                {(props) => (
                    <Form>
                        <Container marginTop={"24px"} />
                        <Field
                            name="riderName"
                            validate={(value) => {
                                if (!value) {
                                    return `${t("Rider name is required")}`;
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
                                        placeholder={t("Rider name")}
                                    />
                                    <FormErrorMessage>
                                        {form.errors.riderName}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Container marginTop={"24px"} />
                        <Field
                            name="riderAge"
                            validate={(value) => {
                                if (!value) {
                                    return `${t("Rider age is required")}`;
                                }

                                var regex = /^[0-9]+$/;
                                if (!regex.test(value)) {
                                    return `${t("Age must be a number")}`;
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
                                        placeholder={t("Rider age")}
                                    />
                                    <FormErrorMessage>
                                        {form.errors.riderAge}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Container marginTop={"24px"} />
                        <Field
                            name="federationId"
                            validate={(value) => {
                                if (!value) {
                                    return `${("Federation ID Number is required")}`;
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
                                        placeholder={t("Federation ID Number")}
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
