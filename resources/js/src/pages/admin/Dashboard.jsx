import React, { useState, useEffect } from "react";
import {
    Text,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
    Card,
    useToast,
    Center,
    useColorModeValue,
    Container,
} from "@chakra-ui/react";
import { registrationDashboard } from "../../repository/registration";
const APP_NAME = import.meta.env.VITE_APP_NAME;
import moment from "moment";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";

export default () => {
    const toast = useToast();
    let [numberOfFederations, setNumberOfFederations] = useState(0);
    let [numberOfHorses, setNumberOfHorses] = useState(0);
    let [schedules, setSchedules] = useState([]);
    let [isFetching, setFetching] = useState(false);
    const { t } = useTranslation();

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const getData = () => {
        if (!localStorage.getItem("token")) return;

        let promise = new Promise(async (resolve, reject) => {
            try {
                setFetching(true);
                let result = await registrationDashboard();
                setNumberOfHorses(
                    result?.number_of_horses?.reduce((total, item) => {
                        return total + item.count;
                    }, 0)
                );
                setNumberOfFederations(
                    result?.number_of_federations_registered?.length
                );
                setSchedules(
                    (result?.registrations_per_schedule || []).filter(
                        (e) => e.registrations_count > 0
                    )
                );

                setFetching(false);
                resolve("Success");
            } catch (e) {
                setFetching(false);
                reject(e?.message);
                // TODO: TOAST
            }
        });

        toast.promise(promise, {
            success: { title: `${t("Success")}`, description: "" },
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
        getData();
    }, []);

    const data = {
        labels: schedules.map((e) =>
            APP_NAME == "RAMAKA"
                ? `${moment(e?.date).format("MMM DD YYYY")} | ${e?.description}`
                : `${moment(e?.date).format("YYYY")} | ${e?.description}`
        ),
        datasets: [
            {
                label: "Registrations",
                data: schedules.map((e) => e.registrations_count),
                interval: 1,
                backgroundColor: "teal",
            },
        ],
    };

    const options = {
        indexAxis: "y",
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: "white",
                    font: {
                        size: 14,
                        color: "white",
                    },
                },
            },
        },
        scales: {
            y: {
                ticks: {
                    color: "white",
                    fontSize: 12,
                },
            },
            x: {
                ticks: {
                    color: "white",
                    fontSize: 12,
                    stepSize: 1,
                },
            },
        },
    };

    return isFetching ? (
        <Center height={"80vh"}>
            <Text>{t("Please Wait")}</Text>
            <div id="chartContainer" />
        </Center>
    ) : (
        <Container>
            <Card
                padding={"16px"}
                marginTop={"32px"}
                marginBottom={"32px"}
                overflow="hidden"
            >
                <StatGroup>
                    <Stat>
                        <StatLabel fontWeight={"bold"} fontSize={"md"}>
                            {t("Number of Horses Registered")}
                        </StatLabel>
                        <StatNumber>{numberOfHorses}</StatNumber>
                    </Stat>

                    <Stat>
                        <StatLabel fontWeight={"bold"} fontSize={"md"}>
                            {t("Number of Riders Registered")}
                        </StatLabel>
                        <StatNumber>{numberOfFederations}</StatNumber>
                    </Stat>
                </StatGroup>
            </Card>

            <Card padding={"16px"}>
                <Text fontWeight={"bold"} marginBottom={"16px"} fontSize={"md"}>
                    {t("Registrations per Schedule")}
                    <Bar options={options} data={data} />
                </Text>
            </Card>
        </Container>
    );
};
