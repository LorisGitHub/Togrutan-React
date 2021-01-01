import {createSelector, createSlice} from '@reduxjs/toolkit';
import {MEDIAS_URL, SIGN_IN, USERS_URL} from "../../constants";
import axios from "axios";

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        loginModal: false,
        drawerOpen: true,
    },
    reducers: {
        setLoginModal: (state, action) => {
            state.loginModal = action.payload;
        },
        setDrawer: (state, action) => {
            state.drawerOpen = !state.drawerOpen;
        },
    },
});

export const { setLoginModal, setDrawer } = appSlice.actions;

export const selectLoginModal = state => state.app.loginModal;
export const selectDrawerState = state => state.app.drawerOpen;

export default appSlice.reducer;
