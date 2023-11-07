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
    },
});

export const { setProfile, updateLoading, updateRegisterLoading } =
    slice.actions;

export default slice.reducer;
