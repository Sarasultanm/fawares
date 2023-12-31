import React, { useState, useEffect } from "react";
import {
    Text,
    Container,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    Button,
    useToast,
    Flex,
    Spacer,
} from "@chakra-ui/react";

import { Field, Form, Formik } from "formik";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import FilePicker from "chakra-ui-file-picker";
import { useTranslation } from "react-i18next";

export default ({ payload, onSavePayload, onBack }) => {
    const toast = useToast();
    const { t } = useTranslation();

    let formValues = {
        horseName: "",
        pedigree: "",
        horseRegistrationNumber: "",
    };
    let [horseDocument, setHorseDocument] = useState(null);

    useEffect(() => {
        Object.keys(formValues).forEach((key) => {
            if (payload[key]) {
                formValues[key] = payload[key];
            }
        });

        if (payload["horseDocument"]) {
            setHorseDocument(payload?.horseDocument);
        }
    });

    return (
        <Container>
            <Formik
                initialValues={formValues}
                onSubmit={(values, actions) => {
                    if (!values) return;

                    // if (!horseDocument) {
                    //     actions.setSubmitting(false);
                    //     toast({
                    //         title: "Official horse document is required! ",
                    //         status: "error",
                    //         isClosable: true,
                    //         position: "top",
                    //     });
                    //     return;
                    // }

                    setTimeout(() => {
                        onSavePayload({
                            ...values,
                            horseDocument,
                        });
                        actions.setSubmitting(false);
                    }, 500);
                }}
            >
                {(props) => (
                    <Form>
                        <Container marginTop={"24px"} />
                        <Field
                            name="horseName"
                            validate={(value) => {
                                if (!value) {
                                    return `${t("Horse name is required")}`;
                                }
                                return null;
                            }}
                        >
                            {({ field, form }) => (
                                <FormControl
                                    isRequired={true}
                                    isInvalid={
                                        form.errors.horseName &&
                                        form.touched.horseName
                                    }
                                >
                                    <FormLabel>{t("Horse Name")}</FormLabel>
                                    <Input
                                        {...field}
                                        placeholder={t("Horse Name")}
                                    />
                                    <FormErrorMessage>
                                        {form.errors.horseName}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Container marginTop={"24px"} />
                        <Field name="pedigree">
                            {({ field, form }) => (
                                <FormControl
                                    isInvalid={
                                        form.errors.pedigree &&
                                        form.touched.pedigree
                                    }
                                >
                                    <FormLabel>
                                        {t("Pedigree (if available)")}
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        placeholder={t(
                                            "Pedigree (if available)"
                                        )}
                                    />
                                    <FormErrorMessage>
                                        {form.errors.pedigree}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Container marginTop={"24px"} />
                        <Field
                            name="horseRegistrationNumber"
                            validate={(value) => {
                                if (!value) {
                                    return `${t("Horse registration number is required")}`;
                                }
                                return null;
                            }}
                        >
                            {({ field, form }) => (
                                <FormControl
                                    isRequired={true}
                                    isInvalid={
                                        form.errors.horseRegistrationNumber &&
                                        form.touched.horseRegistrationNumber
                                    }
                                >
                                    <FormLabel>
                                        {t("Horse Registration Number")}
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        placeholder={t(
                                            "Horse Registration Number"
                                        )}
                                    />
                                    <FormErrorMessage>
                                        {form.errors.horseRegistrationNumber}
                                    </FormErrorMessage>
                                </FormControl>
                            )}
                        </Field>
                        <Container marginTop={"24px"} />
                        <FormControl>
                            <FormLabel>
                                {t("Horse Official Document")}
                            </FormLabel>
                            <Text fontSize={"xs"}>
                                {t("Horse Document Instruction")}
                            </Text>
                            <Container marginTop={"16px"} />
                            <FilePicker
                                onFileChange={(fileList) => {
                                    setHorseDocument(fileList[0]);
                                }}
                                placeholder={
                                    horseDocument?.name || "Select a file"
                                }
                                clearButtonLabel="Remove"
                                multipleFiles={false}
                                hideClearButton={true}
                            />
                        </FormControl>
                        <Flex mt={"32px"}>
                            <Button
                                colorScheme="teal"
                                isLoading={props.isSubmitting}
                                onClick={onBack}
                                variant="outline"
                            >
                                <ArrowBackIcon marginRight={"5px"} />
                                {t("Back")}
                            </Button>
                            <Spacer />
                            <Button
                                colorScheme="teal"
                                isLoading={props.isSubmitting}
                                type="submit"
                            >
                                {t("Next")}
                                <ArrowForwardIcon marginLeft={"5px"} />
                            </Button>
                        </Flex>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};
