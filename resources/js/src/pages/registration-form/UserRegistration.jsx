import React, { useState } from "react";
import {
    Container,
    Center,
    useColorModeValue,
    Image,
    Card,
    Box,
    Divider,
    AbsoluteCenter,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    TabIndicator,
} from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { useTranslation } from "react-i18next";
import SignUp from "./registration-form/SignUp";
import LogIn from "./registration-form/LogIn";
import { useSelector, useDispatch } from "react-redux";
import { setProfile, updateLoading } from "../../reducers/user/userSlice";
import { verifyGoogleAuth } from "../../repository/user";
import { useNavigate } from "react-router-dom";

import ramakaLightLogo from "../../../../images/ramaka/logo/logo-light.png";
import ramakaDarkLogo from "../../../../images/ramaka/logo/logo-dark.png";
import fawaresLightLogo from "../../../../images/fawares/logo/logo-light.png";
import fawaresDarkLogo from "../../../../images/fawares/logo/logo-dark.png";

const APP_NAME = import.meta.env.VITE_APP_NAME;

export default () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const verifyAuth = async (googleData) => {
        try {
            dispatch(updateLoading(true));
            let result = await verifyGoogleAuth(googleData);
            dispatch(setProfile(result.user));
            dispatch(updateLoading(false));
            if (result?.user?.role == "admin") {
                navigate("/admin");
                return;
            }
        } catch (e) {
            // TODO: ADD TOAST
            dispatch(updateLoading(false));
        }
    };

    return (
        <Container>
            <Card mt={"10%"} padding={"32px"} mb={"24px"}>
                <Container>
                    <Center marginBottom={"64px"}>
                        <Image
                            src={
                                APP_NAME == "FAWARES"
                                    ? useColorModeValue(
                                          fawaresDarkLogo,
                                          fawaresLightLogo
                                      )
                                    : useColorModeValue(
                                          ramakaDarkLogo,
                                          ramakaLightLogo
                                      )
                            }
                            height={"150px"}
                        />
                    </Center>
                    <Tabs isFitted variant="unstyledunstyled">
                        <TabList>
                            <Tab>Login</Tab>
                            <Tab>Sign Up</Tab>
                        </TabList>
                        <TabIndicator
                            height="2px"
                            bg="blue.500"
                            borderRadius="1px"
                        />
                        <TabPanels>
                            <TabPanel>
                                <LogIn />
                            </TabPanel>
                            <TabPanel>
                                <SignUp />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>

                    <Box position="relative" padding="10">
                        <Divider />
                        <AbsoluteCenter
                            px="10px"
                            backgroundColor={"transparent"}
                        >
                            Or
                        </AbsoluteCenter>
                    </Box>
                    <Center>
                        <GoogleLogin
                            onSuccess={(response) => verifyAuth(response)}
                            onError={(error) => {
                                console.log(error);
                            }}
                        />
                    </Center>
                </Container>
            </Card>
        </Container>
    );
};
