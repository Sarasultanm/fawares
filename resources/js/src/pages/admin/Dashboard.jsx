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
} from "@chakra-ui/react";
import { registrationDashboard } from "../../repository/registration";

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

export default () => {
    const toast = useToast();
    let [numberOfFederations, setNumberOfFederations] = useState(0);
    let [numberOfHorses, setNumberOfHorses] = useState(0);
    let [schedules, setSchedules] = useState([]);
    let [isFetching, setFetching] = useState(false);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const getData = () => {
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
                setSchedules(result?.registrations_per_schedule || []);

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
                title: "Error",
                description: "Something went wrong. Try again.",
            },
            loading: { title: "Getting data", description: "Please wait" },
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const data = {
        labels: schedules.map((e) => `${e?.date} | ${e?.description}`),
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

    // plugins: {
    //     legend: {
    //         position: "top",
    //         labels: {
    //             // This more specific font property overrides the global property
    //             font: {
    //                 size: 14,
    //                 color: "white",
    //             },
    //         },
    //     },

    //     title: {
    //         display: true,
    //         text: "Registrations by schedule",
    //     },
    // },

    return isFetching ? (
        <Center height={"80vh"}>
            <Text>Please wait...</Text>
            <div id="chartContainer" />
        </Center>
    ) : (
        <>
            <Card
                padding={"16px"}
                marginTop={"32px"}
                marginBottom={"32px"}
                overflow="hidden"
            >
                <StatGroup>
                    <Stat>
                        <StatLabel fontWeight={"bold"} fontSize={"md"}>
                            Number of Horses Registered
                        </StatLabel>
                        <StatNumber>{numberOfHorses}</StatNumber>
                    </Stat>

                    <Stat>
                        <StatLabel fontWeight={"bold"} fontSize={"md"}>
                            Number of Riders Registered
                        </StatLabel>
                        <StatNumber>{numberOfFederations}</StatNumber>
                    </Stat>
                </StatGroup>
            </Card>

            <Card padding={"16px"}>
                <Text fontWeight={"bold"} marginBottom={"16px"} fontSize={"md"}>
                    Registrations per Schedule
                    <Bar options={options} data={data} />
                </Text>
            </Card>
        </>
    );
};
