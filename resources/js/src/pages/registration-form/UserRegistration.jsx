import React, { useState } from "react";
import {
    Container,
    Center,
    useColorModeValue,
    Image,
    Text,
    Card,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
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
import lightLogo from "../../../../images/logo/logo-light.png";
import darkLogo from "../../../../images/logo/logo-dark.png";
import { useTranslation } from "react-i18next";
import SignUp from "./registration-form/SignUp";
import LogIn from "./registration-form/LogIn";
import { useSelector, useDispatch } from "react-redux";
import { setProfile, updateLoading } from "../../reducers/user/userSlice";
import { verifyGoogleAuth } from "../../repository/user";

const APP_NAME = import.meta.env.VITE_APP_NAME;

export default () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const verifyAuth = async (googleData) => {
        try {
            dispatch(updateLoading(true));
            let result = await verifyGoogleAuth(googleData);
            if (result?.user?.role == "admin") {
                navigate("/admin");
                return;
            }
            dispatch(setProfile(result.user));
            dispatch(updateLoading(false));
        } catch (e) {
            // TODO: ADD TOAST
            dispatch(updateLoading(false));
        }
    };

    return (
        <Container>
            <Card mt={"10%"} mb={"40px"} padding={"32px"}>
                <Container>
                    <Center marginBottom={"64px"}>
                        {APP_NAME == "FAWARES" ? (
                            <Text fontWeight={"bold"} fontSize={"lg"}>
                                Fawares Logo
                            </Text>
                        ) : (
                            <Image
                                src={useColorModeValue(darkLogo, lightLogo)}
                                height={"100px"}
                            />
                        )}
                    </Center>
                    <Tabs isFitted variant="unstyledunstyled">
                        <TabList>
                            <Tab>Login</Tab>
                            <Tab>Sign Up</Tab>
                        </TabList>
                        <TabIndicator
                            mt="-1.5px"
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
