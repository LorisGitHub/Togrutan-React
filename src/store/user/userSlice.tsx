import {createSlice} from '@reduxjs/toolkit';
import {User} from "../../constants";
import axios from "axios";
import {setLoginModal} from "../app/appSlice";
import {loadAllMedia} from "../media/mediaSlice";

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
        getUserInfoSuccess: (state, action) => {
            state.user = action.payload;
        },
        loadAllUsersSuccess: (state, action) => {
            state.value = action.payload;
        },
        logoutSuccess: (state, action) => {
            state.value = [];
            state.user = null;
            state.username = null;
            state.token = null;
        },
    },
});

export const { loadAllUsersSuccess, getUserInfoSuccess, loginSuccess, logoutSuccess } = userSlice.actions;

export const login = credentials => dispatch => {
    axios.post(process.env.REACT_APP_SIGN_IN!,{
        username: credentials.username,
        password: credentials.password
    }).then(res => {
        localStorage.setItem('JWT', (res.data.token));
        localStorage.setItem('username', credentials.username);
        dispatch(loginSuccess({token: res.data.token, username: credentials.username}));
        dispatch(getUserInfo(credentials.username));
        dispatch(setLoginModal(false));
    });
};

export const getUserInfo = username => dispatch => {
    const authorizationJWT = 'JWT '+ localStorage.getItem('JWT')
    axios.get(process.env.REACT_APP_USER_INFO!.concat('?username=').concat(username),{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationJWT
        }
    }).then(res => {
        const user: User = {
            username:  res.data.Username,
            viewed: res.data.Viewed ? res.data.Viewed.split(';'): null,
            planToWatch: res.data.PlanToWatch ? res.data.PlanToWatch.split(';'): null,
            dropped:  res.data.Dropped ? res.data.Dropped.split(';'): null,
        }
        dispatch(loadAllMedia(user));
        dispatch(getUserInfoSuccess(user));
    });
};

export const updateUserInfo = user => dispatch => {
    const authorizationJWT = 'JWT '+ localStorage.getItem('JWT')
    axios.post(process.env.REACT_APP_USER_INFO!,{
        user: JSON.stringify(user),
    },{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authorizationJWT
        }
    }).then(res => {
        dispatch(getUserInfoSuccess(user));
    });
};

export const logout = user => dispatch => {
    localStorage.removeItem('JWT');
    localStorage.removeItem('username');
    dispatch(logoutSuccess(0));
};

export const loadAllUsers = amount => dispatch => {
    const authorizationJWT = 'JWT '+localStorage.getItem('JWT')
    axios.get(process.env.REACT_APP_USERS_URL!, {
        headers: {
            'Authorization': authorizationJWT
        }
    }).then(res => {
        dispatch(loadAllUsersSuccess(res.data));
    });
};

export const selectUsername = state => state.user.username;
export const selectCurrentUser = state => state.user.user;
export const selectUsers = state => state.user.value;

export default userSlice.reducer;
