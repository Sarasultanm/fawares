import React from "react";
import {
    Box,
    Text,
    Flex,
    Select,
    Spacer,
    Image,
    useColorModeValue,
    Avatar,
    HStack,
    VStack,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    CircularProgress,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { useTranslation } from "react-i18next";
import lightLogo from "../../../images/logo/logo-light.png";
import darkLogo from "../../../images/logo/logo-dark.png";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../reducers/user/userSlice";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { googleLogout } from "@react-oauth/google";
import { signOut } from "../repository/user";

export default () => {
    const { t, i18n } = useTranslation();
    const { profile, isFetching } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    return (
        <Flex
            spacing="32px"
            width={"100%"}
            padding={"23"}
            alignItems={"center"}
        >
            <Image
                src={useColorModeValue(darkLogo, lightLogo)}
                height={"48px"}
            />
            <Spacer />
            <Box>
                <Select
                    placeholder="Select option"
                    onChange={(e) => {
                        i18n.changeLanguage(e.target.value);
                    }}
                    value={i18n.language}
                >
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                </Select>
            </Box>
            <Box>
                {isFetching && !profile && (
                    <CircularProgress
                        marginLeft={"16px"}
                        isIndeterminate
                        size="24px"
                        color="green.300"
                    />
                )}
                {profile && (
                    <Menu>
                        <MenuButton
                            marginLeft={"8px"}
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                        >
                            <HStack>
                                <Avatar
                                    size="xs"
                                    name={profile?.name}
                                    src={profile?.external_photo}
                                />
                                <VStack
                                    alignItems={"flex-start"}
                                    alignContent={"center"}
                                >
                                    <Text fontSize="xs">{profile?.name}</Text>
                                </VStack>
                            </HStack>
                        </MenuButton>
                        <MenuList>
                            <MenuGroup title={profile?.email}>
                                <MenuItem
                                    onClick={async () => {
                                        googleLogout();
                                        await signOut();
                                        localStorage.setItem("token", "");
                                        dispatch(setProfile(null));
                                        window.location.reload();
                                    }}
                                >
                                    Logout
                                </MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                )}
            </Box>
            <Box>
                <ColorModeSwitcher justifySelf="flex-end" />
            </Box>
        </Flex>
    );
};
