import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authentication",
    initialState: {
        isAuthenticated: false,
        user: null,
    },
    reducers: {
        saveUserToStore(state, action) {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        removeUserFromStore(state) {
            state.isAuthenticated = false;
            state.user = null;
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
