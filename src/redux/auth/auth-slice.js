import { createSlice } from '@reduxjs/toolkit';
import authActions from './auth-action';

const {
    registerRequest,
    registerSuccess,
    registerError,
    logInRequest,
    logInSuccess,
    logInError,
    logoutRequest,
    logoutSuccess,
    logoutError,
    getCurrentUserRequest,
    getCurrentUserSuccess,
    getCurrentUserError,
} = authActions;

const initialState = {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    isFetchingCurrentUser: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [registerRequest]: state => {
            state.isLoading = true;
        },
        [registerSuccess]: (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
            state.isLoggedIn = true;
            state.isLoading = false;
        },
        [registerError]: (state, { payload }) => {
            state.error = payload;
        },
        //
        //
        [logInRequest]: state => {
            state.isLoading = true;
        },
        [logInSuccess]: (state, { payload }) => {
            state.user = payload.user;
            state.token = payload.token;
            state.isLoggedIn = true;
            state.isLoading = false;
        },
        [logInError]: (state, { payload }) => {
            state.error = payload;
        },
        //
        //
        [logoutRequest]: state => {
            state.isLoading = true;
        },
        [logoutSuccess]: state => {
            state.user = { name: null, email: null };
            state.token = null;
            state.isLoggedIn = false;
            state.isLoading = false;
            state.error = null;
        },
        [logoutError]: (state, { payload }) => {
            state.error = payload;
        },
        //
        //
        [getCurrentUserRequest]: state => {
            state.isLoading = true;
            state.isFetchingCurrentUser = true;
        },
        [getCurrentUserSuccess]: (state, { payload }) => {
            state.user = payload;
            state.isLoggedIn = true;
            state.isLoading = false;
            state.isFetchingCurrentUser = false;
        },
        [getCurrentUserError]: state => {
            state.isLoading = false;
            state.isFetchingCurrentUser = false;
        },
    },
});

export default authSlice.reducer;
