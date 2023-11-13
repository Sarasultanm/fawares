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
    useColorModeValue,
    Image,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Center,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardBody, StackDivider } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import schedLight from "../../../../images/sched_light.png";
import schedDark from "../../../../images/sched_dark.png";
import moment from "moment";

export default ({ onBack, payload, onSavePayload }) => {
    const toast = useToast();
    const { t } = useTranslation();
    const { isOpen, onOpen, onClose } = useDisclosure();

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
            date: "2023-12-22",
            age: "4-5",
            description: "(4-5) الشوط الأول",
        },
        {
            id: "2",
            date: "2023-12-22",
            age: "5-6",
            description: "(5-6) الشوط الثاني",
        },
        {
            id: "3",
            date: "2023-12-22",
            age: "6-7",
            description: "(6-7) الشوط الثالث",
        },
    ];

    let scheduleB = [
        {
            id: "4",
            date: "2023-12-23",
            age: "4-5",
            description: "(4-5) الشوط الرابع",
        },
        {
            id: "5",
            date: "2023-12-23",
            age: "5-6",
            description: "(5-6) الشوط الخامس",
        },
        {
            id: "6",
            date: "2023-12-23",
            age: "6-7",
            description: "(6-7) الشوط السادس",
        },
    ];

    return (
        <Container marginTop={"40px"}>
            <Image
                onClick={onOpen}
                src={useColorModeValue(schedLight, schedDark)}
                width={"100%"}
                borderRadius={"8px"}
                marginBottom={"30px"}
            />
            <Card marginBottom={"30px"}>
                <CardHeader>
                    <Heading size="sm" marginBottom={"16px"}>
                        First Day{" "}
                        {moment(scheduleA[0].date).format("MMMM DD, YYYY")}
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
                        Second Day{" "}
                        {moment(scheduleB[0].date).format("MMMM DD, YYYY")}
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
            <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Schedules</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <Image
                                onClick={onOpen}
                                src={useColorModeValue(schedLight, schedDark)}
                                width={"100%"}
                            />
                        </Center>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
};
