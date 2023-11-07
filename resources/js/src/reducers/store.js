import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import registrationReducer from "./registration/registrationSlice";

export default configureStore({
    reducer: {
        user: userReducer,
        registration: registrationReducer,
    },
});
