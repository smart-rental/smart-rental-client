import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
    name: "users",
    initialState: {
        userType: '',
        userData: {}
    },
    reducers: {
        setUserType(state, action) {
            state.userType = action.payload;
        },
        setUserData(state, action) {
            state.userData = action.payload;
        },
        removeUserType(state, action) {
            state.userType = action.payload;
        },
        removeUserData(state, action) { 
            state.userData = action.payload;
        }
    }
});

export const usersActions = usersSlice.actions;

export default usersSlice;