/*
 * Created by @tranphuquy19 on 10/12/2019
 * Email: tranphuquy19@gmail.com
 */

import User from "../models/userModel";
import {USER_LOGIN_FACEBOOK, USER_LOGIN_PASS, USER_LOGOUT} from "../commons/type";
import apiCaller from "../commons/apiCaller";

const loginPass = (user) => {
    return dispatch => {
        const response = apiAuthLogin(user);
        dispatch({type: USER_LOGIN_PASS, payload: response})
    }
}

const apiAuthLogin = async (user) => {
    const response = await apiCaller('auth/login', 'POST', user);
    response ? storedUser(response.data) : storedUser(User);
    return response;
}

const apiAuthLoginFb = async (fbToken) => {
    const response = await apiCaller('auth/facebook-auth-callback', 'POST', {access_token: fbToken});
    response ? storedUser(response.data) : storedUser(User);
    return response;
}

const loginFb = (fbToken) => {
    return dispatch => {
        const response = apiAuthLoginFb(fbToken);
        dispatch({type: USER_LOGIN_FACEBOOK, payload: response})
    }
}

const logout = () => {
    return async dispatch => {
        localLogout();
        dispatch({type: USER_LOGOUT});
    }
}

const localLogout = () => {
    localStorage.setItem('user', JSON.stringify(User));
}

let storedUser = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
}

export {
    loginPass,
    loginFb,
    logout,
    apiAuthLogin,
    apiAuthLoginFb,
    localLogout
}
