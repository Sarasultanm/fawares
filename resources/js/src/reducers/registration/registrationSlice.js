import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "registration",
    initialState: {
        registeredList: [],
        isFetchingRegistered: false,
    },
    reducers: {
        setRegisteredList: (state, action) => {
            state.registeredList = action.payload;
        },
        updateFetchingRegistered: (state, action) => {
            state.isFetchingRegistered = action.payload;
        },
    },
});

export const { setRegisteredList, updateFetchingRegistered } = slice.actions;

export default slice.reducer;
