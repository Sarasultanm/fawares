import React, { useState, useEffect } from "react";
import {
    Container,
    Stack,
    Button,
    RadioGroup,
    Radio,
    Heading,
    useToast,
    Flex,
    Spacer,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardBody, StackDivider } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

export default ({ onBack, payload, onSavePayload }) => {
    const toast = useToast();
    const { t } = useTranslation();

    const { isRegistering } = useSelector((state) => state.user);

    let [selectedScheduleA, setScheduleA] = useState(null);
    let [selectedScheduleB, setScheduleB] = useState(null);

    useEffect(() => {
        let scheds = payload?.schedules;
        if (scheds) {
            scheds = scheds.split(",");
            setScheduleA(scheds?.[0]);
            setScheduleB(scheds?.[1]);
        }
    }, [payload?.schedules]);

    let scheduleA = [
        {
            id: "1",
            date: "2023-12-16",
            age: "4-5",
            description: "(4-5) الشوط الأول",
        },
        {
            id: "2",
            date: "2023-12-16",
            age: "5-6",
            description: "(5-6) الشوط الثاني",
        },
        {
            id: "3",
            date: "2023-12-16",
            age: "6-7",
            description: "(6-7) الشوط الثالث",
        },
    ];

    let scheduleB = [
        {
            id: "4",
            date: "2023-12-17",
            age: "4-5",
            description: "(4-5) الشوط الرابع",
        },
        {
            id: "5",
            date: "2023-12-17",
            age: "5-6",
            description: "(5-6) الشوط الخامس",
        },
        {
            id: "6",
            date: "2023-12-17",
            age: "6-7",
            description: "(6-7) الشوط السادس",
        },
    ];

    return (
        <Container marginTop={"40px"}>
            <Card marginBottom={"30px"}>
                <CardHeader>
                    <Heading size="sm" marginBottom={"16px"}>
                        First Day *DATE HERE*
                    </Heading>
                    <RadioGroup
                        value={selectedScheduleA}
                        onChange={(e) => setScheduleA(e)}
                    >
                        <Stack>
                            {scheduleA.map((e) => (
                                <Radio key={e.id} value={e.id}>
                                    {e.description}
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                </CardHeader>
            </Card>

            <Card marginBottom={"30px"}>
                <CardHeader>
                    <Heading size="sm" marginBottom={"16px"}>
                        Second Day *DATE HERE*
                    </Heading>
                    <RadioGroup
                        value={selectedScheduleB}
                        onChange={(e) => setScheduleB(e)}
                    >
                        <Stack>
                            {scheduleB.map((e) => (
                                <Radio key={e.id} value={e.id}>
                                    {e.description}
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                </CardHeader>
            </Card>
            <Flex>
                <Button
                    colorScheme="teal"
                    isLoading={isRegistering}
                    onClick={onBack}
                    variant="outline"
                >
                    <ArrowBackIcon marginRight={"5px"} />
                    {t("Back")}
                </Button>
                <Spacer />
                <Button
                    background={"teal"}
                    isLoading={isRegistering}
                    onClick={() => {
                        if (!selectedScheduleA || !selectedScheduleB) {
                            toast({
                                title: "Please select schedule for second and first day.",
                                status: "error",
                                isClosable: true,
                                position: "top",
                            });
                            return;
                        }

                        onSavePayload({
                            schedules: `${selectedScheduleA},${selectedScheduleB}`,
                        });
                    }}
                >
                    Submit
                </Button>
            </Flex>
        </Container>
    );
};
