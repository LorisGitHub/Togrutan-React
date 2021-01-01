import {createSlice} from '@reduxjs/toolkit';
import {SIGN_IN, USERS_URL} from "../../constants";
import axios from "axios";
import {setLoginModal} from "../app/appSlice";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        username: null,
        token: null,
        value: [],
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
        },
        loadAllUsersSuccess: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { loadAllUsersSuccess, loginSuccess } = userSlice.actions;

export const login = credentials => dispatch => {
    axios.post(SIGN_IN,{
        username: credentials.username,
        password: credentials.password
    }).then(res => {
        localStorage.setItem('JWT', (res.data.token));
        localStorage.setItem('username', credentials.username);
        dispatch(loginSuccess({token: res.data.token, username: credentials.username}));
        dispatch(setLoginModal(false));
    });
};

export const loadAllUsers = amount => dispatch => {
    const authorizationJWT = 'JWT '+localStorage.getItem('JWT')
    axios.get(USERS_URL, {
        headers: {
            'Authorization': authorizationJWT
        }
    }).then(res => {
        console.log(res.data);
        dispatch(loadAllUsersSuccess(res.data));
    });
};

export const selectUsername = state => state.user.username;
export const selectUsers = state => state.user.value;

export default userSlice.reducer;
