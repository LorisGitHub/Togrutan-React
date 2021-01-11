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
        isLogging: false,
        token: null,
        value: [],
    },
    reducers: {
        setLoginState:(state, action) => {
            state.isLogging = action.payload;
        },
        loginSuccess: (state, action) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.isLogging = false;
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

export const { setLoginState, loadAllUsersSuccess, getUserInfoSuccess, loginSuccess, logoutSuccess } = userSlice.actions;

export const login = credentials => dispatch => {
    dispatch(setLoginState(true));
    axios.post(process.env.REACT_APP_DJANGO_SERV!.concat('/api-token-auth/'),{
        username: credentials.username,
        password: credentials.password
    }).then(res => {
        localStorage.setItem('JWT', (res.data.token));
        localStorage.setItem('username', credentials.username);
        dispatch(loginSuccess({token: res.data.token, username: credentials.username}));
        dispatch(getUserInfo(credentials.username));
        dispatch(setLoginModal(false));
    },
    error => {
        dispatch(setLoginState(true));
    });
};

export const getUserInfo = username => dispatch => {
    const authorizationJWT = 'JWT '+ localStorage.getItem('JWT')
    axios.get(process.env.REACT_APP_DJANGO_SERV!.concat('/api/user').concat('?username=').concat(username),{
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
    axios.post(process.env.REACT_APP_DJANGO_SERV!.concat('/api/user'),{
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
    axios.get(process.env.REACT_APP_API!.concat('users'), {
        headers: {
            'Authorization': authorizationJWT
        }
    }).then(res => {
        dispatch(loadAllUsersSuccess(res.data));
    });
};

export const selectUsername = state => state.user.username;
export const selectCurrentUser = state => state.user.user;
export const selectLoggingState = state => state.user.isLogging;
export const selectUsers = state => state.user.value;

export default userSlice.reducer;
