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
                    <Text>{t("Rules Description")}</Text>
                    <Box>
                        <Text pt="2" fontSize="sm">
                            {t("Rule 1")}
                        </Text>
                    </Box>
                    <Box>
                        <Text pt="2" fontSize="sm">
                            {t("Rule 2")}
                        </Text>
                    </Box>
                    <Box>
                        <Text pt="2" fontSize="sm">
                            {t("Rule 3")}
                        </Text>
                    </Box>
                    <Box>
                        <Text pt="2" fontSize="sm">
                            {t("Rule 4")}
                        </Text>
                    </Box>
                    <Box>
                        <Text pt="2" fontSize="sm">
                            {t("Rule 5")}
                        </Text>
                    </Box>
                    <Box>
                        <Text pt="2" fontSize="sm">
                            {t("Rule 6")}
                        </Text>
                    </Box>
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
