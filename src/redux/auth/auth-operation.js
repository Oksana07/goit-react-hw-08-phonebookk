import axios from 'axios';
import { toast } from 'react-toastify';
import authActions from './auth-action';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common.Authorization = '';
    },
};

export const register = userData => async dispatch => {
    dispatch(authActions.registerRequest());

    try {
        const { data } = await axios.post('/users/signup', userData);
        token.set(data.token);
        dispatch(authActions.registerSuccess(data));
    } catch (error) {
        dispatch(authActions.registerError(error.message));
        toast.error(error.message);
    }
};

export const logIn = userData => async dispatch => {
    dispatch(authActions.logInRequest());

    try {
        const { data } = await axios.post('/users/login', userData);
        token.set(data.token);

        dispatch(authActions.logInSuccess(data));
    } catch (error) {
        dispatch(authActions.logInError(error.message));
        toast.error(error.message);
    }
};

export const logOut = userData => async dispatch => {
    dispatch(authActions.logoutRequest());
    try {
        await axios.post('/users/logout');
        token.unset();
        dispatch(authActions.logoutSuccess());
    } catch (error) {
        dispatch(authActions.logoutError(error.message));
    }
};

export const fetchCurrentUser = () => async (dispatch, getState) => {
    const {
        auth: { token: persistedToken },
    } = getState();

    if (!persistedToken) return;

    token.set(persistedToken);
    dispatch(authActions.getCurrentUserRequest());

    try {
        const { data } = await axios.get('/users/current');
        dispatch(authActions.getCurrentUserSuccess(data));
    } catch (error) {
        dispatch(authActions.getCurrentUserError(error.message));
    }
};
