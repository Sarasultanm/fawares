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
    Text,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardBody, StackDivider } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

import moment from "moment";
const APP_NAME = import.meta.env.VITE_APP_NAME;

import ramakaSchedLight from "../../../../images/ramaka/sched_light.png";
import ramakaSchedDark from "../../../../images/ramaka/sched_dark.png";

import fawaresSchedLight from "../../../../images/fawares/sched_light.png";
import fawaresSchedDark from "../../../../images/fawares/sched_dark.png";

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

    let scheduleA =
        APP_NAME == "RAMAKA"
            ? [
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
              ]
            : [
                  {
                      id: "1",
                      date: "2023-12-22",
                      age: "4-5",
                      description: "Extra - Small",
                  },
                  {
                      id: "2",
                      date: "2023-12-22",
                      age: "5-6",
                      description: "Extra 2 - Medium",
                  },
                  {
                      id: "3",
                      date: "2023-12-22",
                      age: "6-7",
                      description: "Extra 3 - Big",
                  },
              ];

    let scheduleB =
        APP_NAME == "RAMAKA"
            ? [
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
              ]
            : [
                  {
                      id: "4",
                      date: "2023-12-23",
                      age: "4-5",
                      description: "Extra - Small",
                  },
                  {
                      id: "5",
                      date: "2023-12-23",
                      age: "5-6",
                      description: "Extra 2 - Medium",
                  },
                  {
                      id: "6",
                      date: "2023-12-23",
                      age: "6-7",
                      description: "Extra 3 - Big",
                  },
              ];

    return (
        <Container marginTop={"40px"} marginBottom={"32px"}>
            <Image
                onClick={onOpen}
                src={
                    APP_NAME == "FAWARES"
                        ? useColorModeValue(fawaresSchedLight, fawaresSchedDark)
                        : useColorModeValue(ramakaSchedLight, ramakaSchedDark)
                }
                width={"100%"}
                borderRadius={"8px"}
                marginBottom={"30px"}
            />
            <Card marginBottom={"30px"}>
                <CardHeader>
                    <Heading size="sm" marginBottom={"16px"}>
                        {t("First Day")}{" "}
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
                        {t("Second Day")}{" "}
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
                                title: `${t("Please select schedule for second and first day.")}`,
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
                    <ModalHeader>{t("Schedules")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Center>
                            <Image
                                onClick={onOpen}
                                src={
                                    APP_NAME == "FAWARES"
                                        ? useColorModeValue(
                                              fawaresSchedLight,
                                              fawaresSchedDark
                                          )
                                        : useColorModeValue(
                                              ramakaSchedDark,
                                              ramakaSchedDark
                                          )
                                }
                                width={"100%"}
                            />
                        </Center>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>{t("Close")}</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
};
