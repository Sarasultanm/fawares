import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        body: `'PT Serif', serif;`,
    },
    config: {
        initialColorMode: "dark",
    },
});

export default theme;
