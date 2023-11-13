import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "user",
    initialState: {
        profile: null,
        isFetching: false,
        isRegistering: false,
    },
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        updateLoading: (state, action) => {
            state.isFetching = action.payload;
        },
        updateRegisterLoading: (state, action) => {
            state.isRegistering = action.payload;
        },
        updateNoOfRegistrations: (state, action) => {
            state.profile = {
                ...state.profile,
                number_of_registrations:
                    (state.profile?.number_of_registrations || 0) +
                    action.payload,
            };
        },
    },
});

export const {
    setProfile,
    updateLoading,
    updateRegisterLoading,
    updateNoOfRegistrations,
} = slice.actions;

export default slice.reducer;
