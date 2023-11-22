import React, { useEffect } from "react";
import {
    Box,
    Text,
    Flex,
    Select,
    Spacer,
    Avatar,
    HStack,
    VStack,
    Button,
    Menu,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuButton,
    CircularProgress,
    IconButton,
    useMediaQuery,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Link,
    useColorModeValue,
    Image,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { googleLogout } from "@react-oauth/google";
import { signOut } from "../repository/user";
import { getProfile } from "../repository/user";
import { setProfile, updateLoading } from "../reducers/user/userSlice";
import { useNavigate, useLocation } from "react-router-dom";
import ramakaLightLogo from "../../../images/ramaka/logo/logo-light.png";
import ramakaDarkLogo from "../../../images/ramaka/logo/logo-dark.png";
import fawaresLightLogo from "../../../images/fawares/logo/logo-light.png";
import fawaresDarkLogo from "../../../images/fawares/logo/logo-dark.png";
const APP_NAME = import.meta.env.VITE_APP_NAME;

export default () => {
    const { t, i18n } = useTranslation();
    const { profile, isFetching } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

    const fetchProfile = async () => {
        try {
            dispatch(updateLoading(true));
            let result = await getProfile();
            dispatch(setProfile(result));
            dispatch(updateLoading(false));

            if (result?.role == "admin") {
                if (!location.pathname.includes("/admin")) navigate("/admin");
            }
        } catch (e) {
            dispatch(updateLoading(false));
        }
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchProfile();
        } else {
            navigate("/");
        }
    }, []);

    const [isTablet] = useMediaQuery("(min-width: 500px)");

    const LocaleSelector = () => {
        return (
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
        );
    };

    const UserProfile = () => {
        return (
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
                                    onClick={async () =>
                                        navigate("/registration/list")
                                    }
                                >
                                    {t("Registration List")}
                                </MenuItem>
                                <MenuItem
                                    onClick={async () => {
                                        googleLogout();
                                        await signOut();
                                        localStorage.setItem("token", "");
                                        dispatch(setProfile(null));
                                        window.location.reload();
                                    }}
                                >
                                    {t("Logout")}
                                </MenuItem>
                            </MenuGroup>
                        </MenuList>
                    </Menu>
                )}
            </Box>
        );
    };

    return (
        <Flex
            spacing="32px"
            width={"100%"}
            padding={"23"}
            alignItems={"center"}
        >
            <Link href="/">
                {APP_NAME == "FAWARES" ? (
                    <Image
                        src={useColorModeValue(
                            fawaresDarkLogo,
                            fawaresLightLogo
                        )}
                        height={"48px"}
                    />
                ) : (
                    <Image
                        src={useColorModeValue(ramakaDarkLogo, ramakaLightLogo)}
                        height={"48px"}
                    />
                )}
            </Link>
            <Spacer />
            {isTablet ? (
                <>
                    <LocaleSelector />
                    <UserProfile />
                    <Box>
                        <ColorModeSwitcher justifySelf="flex-end" />
                    </Box>
                </>
            ) : (
                <>
                    <Box marginRight={"16px"}>
                        <ColorModeSwitcher justifySelf="flex-end" />
                    </Box>
                    <IconButton icon={<HamburgerIcon />} onClick={onOpen} />
                </>
            )}
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
                size={"xs"}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader></DrawerHeader>

                    <DrawerBody>
                        <UserProfile />
                    </DrawerBody>

                    <DrawerFooter>
                        <LocaleSelector />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Flex>
    );
};
