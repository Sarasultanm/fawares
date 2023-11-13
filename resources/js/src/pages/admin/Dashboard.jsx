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
// import CanvasJSReact from "@canvasjs/react-charts";

// var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Test bui

export default () => {
    const toast = useToast();
    let [numberOfFederations, setNumberOfFederations] = useState(0);
    let [numberOfHorses, setNumberOfHorses] = useState(0);
    let [schedules, setSchedules] = useState([]);
    let [isFetching, setFetching] = useState(false);

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

    // let options = {
    //     backgroundColor: "transparent",
    //     animationEnabled: true,
    //     theme: useColorModeValue("light2", "dark2"),
    //     axisX: {
    //         // title: "Social Network",
    //         titleFontSize: 12,
    //         reversed: true,
    //     },
    //     axisY: {
    //         // title: "Monthly Active Users",
    //         includeZero: true,
    //         interval: 1,
    //         // labelFormatter: (e) => {
    //         //     var suffixes = ["", "K", "M", "B"];
    //         //     var order = Math.max(
    //         //         Math.floor(Math.log(Math.abs(e.value)) / Math.log(1000)),
    //         //         0
    //         //     );
    //         //     if (order > suffixes.length - 1) order = suffixes.length - 1;
    //         //     var suffix = suffixes[order];
    //         //     return (
    //         //         CanvasJS.formatNumber(e.value / Math.pow(1000, order)) +
    //         //         suffix
    //         //     );
    //         // },
    //     },
    //     data: [
    //         {
    //             type: "bar",
    //             dataPoints: schedules.map((e) => {
    //                 console.log(e?.registration_count);
    //                 return {
    //                     y: e?.registrations_count,
    //                     label: `${e?.date} | ${e?.description}`,
    //                 };
    //             }),
    //         },
    //     ],
    // };

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
                            Number of Federations Registered
                        </StatLabel>
                        <StatNumber>{numberOfFederations}</StatNumber>
                    </Stat>
                </StatGroup>
            </Card>

            <Card padding={"16px"}>
                <Text fontWeight={"bold"} marginBottom={"16px"} fontSize={"md"}>
                    Registrations per Schedule
                </Text>
                {/* <CanvasJSChart options={options} /> */}
            </Card>
        </>
    );
};
