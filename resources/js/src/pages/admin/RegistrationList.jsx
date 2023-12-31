import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
    Text,
    Container,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    Input,
    TableContainer,
    VStack,
    Link,
    useToast,
    Badge,
    InputGroup,
    Stack,
    InputLeftElement,
    InputRightElement,
    Button,
    Tooltip,
    Center,
    HStack,
} from "@chakra-ui/react";
import { ramakaRegistrationList } from "../../repository/registration";
import { ExternalLinkIcon, SearchIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";
import {
    exportAsSheetByJSON,
    exportAsSheetByTable,
} from "../../utilities/generate-sheet";
import moment from "moment";
const APP_NAME = import.meta.env.VITE_APP_NAME;

export default ({ hideHeader }) => {
    const toast = useToast();
    let [list, setList] = useState([]);
    let [isFetching, setFetching] = useState(false);
    let searchKey = "";
    const { t } = useTranslation();

    const getList = () => {
        let promise = new Promise(async (resolve, reject) => {
            try {
                setFetching(true);
                let result = await ramakaRegistrationList({
                    searchKey,
                });
                setList(result?.list || []);
                setFetching(false);
                resolve("Success");
            } catch (e) {
                setFetching(false);
                reject(e?.message);
                // TODO: TOAST
            }
        });

        toast.promise(promise, {
            success: { title: "Success", description: "" },
            error: {
                title: `${t("Error")}`,
                description: `${t("Something went wrong. Try again")}`,
            },
            loading: {
                title: `${t("Getting data")}`,
                description: `${t("Please Wait")}`,
            },
        });
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getList();
        }
    }, []);

    return (
        <>
            {!hideHeader && <Header />}
            <VStack padding={"16px 16px"}>
                <Center marginBottom={"24px"}>
                    <HStack>
                        <Tooltip
                            hasArrow
                            label={t(
                                "Search by rider name, federation ID, horse name or horse registration number"
                            )}
                            color={"white"}
                            bg="teal"
                            alignSelf={"flex-end"}
                        >
                            <InputGroup size="md">
                                <InputLeftElement pointerEvents="none">
                                    <SearchIcon color="gray.300" />
                                </InputLeftElement>

                                <Input
                                    pr="4.5rem"
                                    placeholder={t("Search")}
                                    onChange={(val) =>
                                        (searchKey = val.target.value)
                                    }
                                />
                                <InputRightElement width="4.5rem">
                                    <Button
                                        h="1.75rem"
                                        size="sm"
                                        marginRight={"8px"}
                                        backgroundColor={"teal"}
                                        fontSize={"12px"}
                                        isLoading={isFetching}
                                        onClick={() => getList()}
                                    >
                                        {t("Search")}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Tooltip>
                        <Button
                            variant="solid"
                            px={"50px"}
                            backgroundColor={"green"}
                            color={"white"}
                            isLoading={isFetching}
                            onClick={() => {
                                let parsedList = [];

                                let labels = {
                                    rider_name: "Rider name",
                                    user: "Rider email",
                                    rider_age: "Rider Age",
                                    federation_id: "Federation ID",
                                    horse_name: "Horse Name",
                                    pedigree: "Pedigree",
                                    horse_registration_number:
                                        "Horse Registration Number",
                                    horse_document: "Horse Document",
                                    created_at: "Registered On",
                                    schedules: "Schedules",
                                };

                                for (let i = 0; i < list.length; i++) {
                                    let parsedData = {};

                                    Object.entries(list[i]).map(
                                        ([key, value], i) => {
                                            if (labels[key]) {
                                                if (key === "schedules") {
                                                    parsedData[labels[key]] =
                                                        value
                                                            ?.map((e) => {
                                                                return `${
                                                                    e.sched_data
                                                                        .description
                                                                }-${moment(
                                                                    e.sched_data
                                                                        .date
                                                                ).format(
                                                                    APP_NAME ==
                                                                        "FAWARES"
                                                                        ? "YYYY"
                                                                        : "MMM DD, YYYY"
                                                                )}`;
                                                            })
                                                            .join(", ");
                                                    return;
                                                }

                                                if (key === "created_at") {
                                                    parsedData[labels[key]] =
                                                        moment(value).format(
                                                            "MMMM DD, YYYY"
                                                        );
                                                    return;
                                                }

                                                if (key === "user") {
                                                    parsedData[labels[key]] =
                                                        value?.email;
                                                    return;
                                                }

                                                parsedData[labels[key]] = value;
                                            }
                                        }
                                    );

                                    parsedList.push(parsedData);
                                }

                                return exportAsSheetByJSON({
                                    excelData: parsedList,
                                    fileName: `${APP_NAME} | 2023`,
                                });
                            }}
                        >
                            Export to Excel
                        </Button>
                    </HStack>
                </Center>
                <TableContainer>
                    <Table id="registration_table" variant="simple">
                        <Thead>
                            <Tr>
                                <Th>{t("Rider name")}</Th>
                                <Th>{t("Rider age")}</Th>
                                <Th>{t("Federation ID Number")}</Th>
                                <Th>{t("Horse Name")}</Th>
                                <Th>{t("Schedules")}</Th>
                                <Th>{t("Registered On")}</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {list.map((e) => {
                                return (
                                    <Tr key={e?.id}>
                                        <Td>
                                            <Text fontWeight={"bold"}>
                                                {e?.rider_name}
                                            </Text>
                                            <Text>{e?.user?.email}</Text>
                                        </Td>
                                        <Td>{e?.rider_age}</Td>
                                        <Td>{e?.federation_id}</Td>
                                        <Td>
                                            <VStack alignItems={"flex-start"}>
                                                <Text>
                                                    {e?.horse_name}{" "}
                                                    <Tooltip
                                                        hasArrow
                                                        label={e?.pedigree}
                                                        color={"white"}
                                                        bg="teal"
                                                        alignSelf={"flex-end"}
                                                    >
                                                        <Badge
                                                            ml="1"
                                                            fontSize="0.8em"
                                                            colorScheme="green"
                                                            maxWidth={"200px"}
                                                            overflow={"hidden"}
                                                        >
                                                            {e?.pedigree}
                                                        </Badge>
                                                    </Tooltip>
                                                </Text>
                                                <Text>
                                                    {
                                                        e?.horse_registration_number
                                                    }
                                                </Text>
                                                {e?.horse_document && (
                                                    <Link
                                                        href={e?.horse_document}
                                                        isExternal
                                                        color={"blue.400"}
                                                    >
                                                        {t(
                                                            "Horse Official Document"
                                                        )}
                                                        <ExternalLinkIcon mx="2px" />
                                                    </Link>
                                                )}
                                            </VStack>
                                        </Td>
                                        <Td>
                                            <VStack alignItems={"flex-start"}>
                                                {e?.schedules?.map((e) => (
                                                    <div key={e?.id}>
                                                        <Text>
                                                            {
                                                                e?.sched_data
                                                                    ?.description
                                                            }
                                                            <Badge
                                                                ml="1"
                                                                fontSize="0.8em"
                                                                colorScheme="green"
                                                            >
                                                                {e?.sched_data
                                                                    ?.description &&
                                                                    moment(
                                                                        e
                                                                            ?.sched_data
                                                                            ?.date
                                                                    ).format(
                                                                        APP_NAME ==
                                                                            "FAWARES"
                                                                            ? "YYYY"
                                                                            : "MMM DD, YYYY"
                                                                    )}
                                                            </Badge>
                                                        </Text>
                                                    </div>
                                                ))}
                                            </VStack>
                                        </Td>
                                        <Td>
                                            {moment(e?.created_at).format(
                                                "MMMM DD, YYYY"
                                            )}
                                        </Td>
                                    </Tr>
                                );
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </VStack>
        </>
    );
};
