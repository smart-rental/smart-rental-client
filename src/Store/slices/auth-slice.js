import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: null
    },
    reducers: {
        login(state, action) {
            state.isLoggedIn = action.payload;
        },
        logout(state, action) {
            state.isLoggedIn = action.payload;
        }
    }
});

export const authActions = authSlice.actions;

export default authSlice;