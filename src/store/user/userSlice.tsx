import {createSelector, createSlice} from '@reduxjs/toolkit';
import {USERS_URL} from "../../constants";
import axios from "axios";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        value: [],
    },
    reducers: {
        loadAllUsersSuccess: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { loadAllUsersSuccess } = userSlice.actions;

export const loadAllUsers = amount => dispatch => {
    axios.get(USERS_URL).then(res => {
        console.log(res.data);
        dispatch(loadAllUsersSuccess(res.data));
    });
};

export const selectUsers = state => state.user.value;

export default userSlice.reducer;
