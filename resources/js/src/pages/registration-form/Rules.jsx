import React from "react";
import { Stack, Heading, Button } from "@chakra-ui/react";
import {
    Box,
    Text,
    Card,
    CardHeader,
    CardBody,
    StackDivider,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
const APP_NAME = import.meta.env.VITE_APP_NAME;

export default ({ onProceed }) => {
    const { profile, isFetching } = useSelector((state) => state.user);
    const { t } = useTranslation();

    return (
        <Card marginBottom={"30px"}>
            <CardHeader>
                <Heading size="md">{t("Rules")}</Heading>
            </CardHeader>

            <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                    <Text>{t(`${APP_NAME.toLowerCase()}_rules_desc`)}</Text>

                    {[...Array(APP_NAME == "RAMAKA" ? 6 : 9).keys()].map(
                        (e, i) => (
                            <Box>
                                <Text pt="2" fontSize="sm">
                                    {i + 1}.{" "}
                                    {t(
                                        `${APP_NAME.toLowerCase()}_rule_${
                                            i + 1
                                        }`
                                    )}
                                </Text>
                            </Box>
                        )
                    )}

                    <Button backgroundColor={"teal"} onClick={onProceed}>
                        {profile?.number_of_registrations > 0
                            ? `${t("Register Again")}`
                            : `${t("Proceed")}`}
                    </Button>
                </Stack>
            </CardBody>
        </Card>
    );
};
