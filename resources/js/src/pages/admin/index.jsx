import React, { useEffect } from "react";
import {
    Text,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Container,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import { HiViewGrid, HiPencilAlt } from "react-icons/hi";
import Dashboard from "./Dashboard";
import RegistrationList from "./RegistrationList";

export default () => {
    return (
        <>
            <Header />
            <Tabs variant="enclosed" margin={"0px 16px"}>
                <TabList>
                    <Tab>
                        <HiViewGrid /> Dashboard
                    </Tab>
                    <Tab>
                        <HiPencilAlt /> Registrations
                    </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Dashboard />
                    </TabPanel>
                    <TabPanel>
                        <RegistrationList hideHeader={true} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    );
};
