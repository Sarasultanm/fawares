import React, { useState } from "react";
import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Container,
    Center,
    useToast,
    useMediaQuery,
    Flex,
    Spacer,
    Divider,
} from "@chakra-ui/react";
import { Box, Text, VStack } from "@chakra-ui/react";
import RiderInformation from "./RiderInformation";
import HorseInformation from "./HorseInformation";
import Schedule from "./Schedule";
import { useTranslation } from "react-i18next";
import RulesScreen from "./Rules";
import { useSelector, useDispatch } from "react-redux";
import {
    setProfile,
    updateLoading,
    updateRegisterLoading,
    updateNoOfRegistrations,
} from "../../reducers/user/userSlice";
import { verifyGoogleAuth } from "../../repository/user";
import { ramakaRegistration } from "../../repository/registration";
import { ArrowForwardIcon, WarningIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import UserRegistration from "./UserRegistration";

export default () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const toast = useToast();

    const { profile, isFetching } = useSelector((state) => state.user);

    let [showRules, setShowRules] = useState(true);
    let [payload, setPayload] = useState({});

    const steps = [
        { title: t("Rider Information"), description: "" },
        { title: t("Horse Details"), description: "" },
        { title: t("Schedule"), description: "" },
    ];
    const { activeStep, setActiveStep } = useSteps({
        index: 1,
        count: steps.length,
    });

    const [isMoreThan800] = useMediaQuery("(min-width: 800px)");

    if (isFetching && !profile) {
        return (
            <Center h="80vh">
                <Text> Please wait...</Text>
            </Center>
        );
    }

    if (!profile) {
        return <UserRegistration />;
    }

    if (showRules) {
        return (
            <Container marginTop={"40px"}>
                <RulesScreen
                    onProceed={() => {
                        setShowRules(false);
                    }}
                />
            </Container>
        );
    }

    const FormStepper = () => {
        return (
            <Stepper index={activeStep} width={"100%"} padding={"40px 20%"}>
                {steps.map((step, index) => (
                    <Step key={index}>
                        <StepIndicator>
                            <StepStatus
                                complete={<StepIcon />}
                                incomplete={<StepNumber />}
                                active={<StepNumber />}
                            />
                        </StepIndicator>

                        <Box flexShrink="0">
                            <StepTitle>{step.title}</StepTitle>
                            <StepDescription>
                                {step.description}
                            </StepDescription>
                        </Box>

                        <StepSeparator />
                    </Step>
                ))}
            </Stepper>
        );
    };

    const RegistrationForms = () => {
        return (
            <>
                {activeStep == 1 && (
                    <RiderInformation
                        payload={payload}
                        onSavePayload={(data) => {
                            setPayload({
                                ...payload,
                                ...data,
                            });
                            setActiveStep(2);
                        }}
                    />
                )}
                {activeStep == 2 && (
                    <HorseInformation
                        payload={payload}
                        onBack={() => {
                            setActiveStep(1);
                        }}
                        onSavePayload={(data) => {
                            setPayload({
                                ...payload,
                                ...data,
                            });

                            setActiveStep(3);
                        }}
                    />
                )}
                {activeStep == 3 && (
                    <Schedule
                        payload={payload}
                        onBack={() => {
                            setActiveStep(2);
                        }}
                        onSavePayload={async (data) => {
                            payload = {
                                ...payload,
                                ...data,
                            };
                            try {
                                dispatch(updateRegisterLoading(true));
                                await ramakaRegistration(payload);
                                dispatch(updateRegisterLoading(false));
                                dispatch(updateNoOfRegistrations(1));
                                setShowRules(true);
                                setActiveStep(1);
                                toast({
                                    title: "You have successfully registered!",
                                    status: "success",
                                    isClosable: true,
                                    position: "top",
                                });
                                setPayload({});
                            } catch (e) {
                                dispatch(updateRegisterLoading(false));
                            }
                        }}
                    />
                )}
            </>
        );
    };

    return (
        <VStack>
            {isMoreThan800 ? (
                <FormStepper />
            ) : (
                <Container marginTop={"16px"}>
                    <Flex width={"100%"}>
                        <Text fontWeight={"bold"} color={"teal.300"}>
                            <WarningIcon marginRight={"8px"} />
                            {steps[activeStep - 1].title}
                        </Text>
                        <Spacer />
                        <Text color={"teal"} fontWeight={"bold"}>
                            {steps?.[activeStep]
                                ? steps?.[activeStep].title
                                : "Submit"}
                            <ArrowForwardIcon marginLeft={"8px"} />
                        </Text>
                    </Flex>
                    <Divider marginTop={"16px"} />
                </Container>
            )}

            <RegistrationForms />
        </VStack>
    );
};

// https://fonts.google.com/specimen/PT+Serif?preview.text=RAMAKA
