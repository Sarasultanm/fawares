import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";
import React, { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import "./src/utilities/internalization";
import { GoogleOAuthProvider } from "@react-oauth/google";
const GOOGLE_OAUTH_CLIEND_ID = import.meta.env.VITE_GOOGLE_OAUTH_CLIEND_ID;
import store from "./src/reducers/store";
import { Provider } from "react-redux";
import theme from "./src/utilities/theme";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./src/pages/App";
import RegistrationList from "./src/pages/admin/RegistrationList";

const Main = () => {
    let routes = createBrowserRouter([
        {
            path: "/",
            element: <App />,
        },
        {
            path: "/registration/list",
            element: <RegistrationList />,
        },
    ]);

    return (
        <ChakraProvider theme={theme}>
            <Provider store={store}>
                <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIEND_ID}>
                    {/* <StrictMode> */}
                    <ColorModeScript />
                    <RouterProvider router={routes} />
                    {/* </StrictMode> */}
                </GoogleOAuthProvider>
            </Provider>
        </ChakraProvider>
    );
};

export default Main;

if (document.getElementById("example")) {
    const Index = ReactDOM.createRoot(document.getElementById("example"));

    Index.render(
        <React.StrictMode>
            <Main />
        </React.StrictMode>
    );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
