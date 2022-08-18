import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import userSlice from "./slices/users-slice";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: userSlice.reducer
    },
});
export default store;