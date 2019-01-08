import request from 'superagent';
import { HOST } from '../config/';
import {
    showPopup,
    isLoading,
    isSuccess,
    isAuthenticated,
    getResponseError,
} from './helper';

import { writeSessionToken } from '../helper/session';

const loginEndpoint = HOST + 'user/login';
const userEndpoint = HOST + 'user/';

import { signHeader } from '../helper/auth';
import { socket } from './../socket/socket';
import { onlinestatus } from './../config';
import { getChatrooms } from './chatroomActions';
import { getUserChats } from './userChatActions';

export const USER_LOGIN = 'user-login';
export const LOGOUT = 'logout';
export const UPDATE_USER = 'user-update';

export const SET_ONLINESTATUS = 'set-onlinestatus';
export const LOAD_USERS = 'load_users';
export const SELECT_USERS = 'select_users';

export function getUsers(token) {
    return (dispatch) => {
        request
            .get(userEndpoint)
            .set(signHeader(token))
            .then((result) => {
                dispatch(loadUsers(result.body));
            })
            .catch((err) => {
                dispatch(getResponseError(err));
            });
    };
}

/**
 * logs in a user. on success redirect to chat.
 * on fail show an error message.
 *
 * @param {Object} user the user that tries to login
 */
export function login({ email, password }) {
    return (dispatch) => {
        dispatch(isLoading(true));
        request
            .post(loginEndpoint)
            .set('Content-Type', 'application/json')
            .send({ email, password })
            .then((result) => {
                const { user, token, message } = result.body;
                dispatch(
                    userLogin({
                        user: user,
                        accessToken: token,
                    })
                );
                writeSessionToken(token);
                dispatch(getChatrooms({ token: token }));
                dispatch(getUserChats({ token: token }));
                dispatch(setOnlineStatus(user, onlinestatus.ONLINE));
                dispatch(isSuccess(true));
                dispatch(isAuthenticated(true));
                dispatch(showPopup(message)); // show the popup for default seconds
                dispatch(isLoading(false));
            })
            .catch((err) => {
                dispatch(showPopup(getResponseError(err)));
                dispatch(isSuccess(false));
                dispatch(isLoading(false));
            });
    };
}

export function updateUserProfileAction(user, token) {
    return (dispatch) => {
        dispatch(isLoading(true));
        request
            .post(userEndpoint + user._id)
            .set(signHeader(token))
            .send(user)
            .then((result) => {
                dispatch(isLoading(false));
                dispatch(isSuccess(true));
                dispatch(showPopup(result.body.message));
                dispatch(userUpdate(result.body.user));
            })
            .catch((err) => {
                dispatch(isLoading(false));
                dispatch(isSuccess(false));
                dispatch(showPopup(getResponseError(err)));
            });
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}

function loadUsers(users) {
    return {
        type: LOAD_USERS,
        users: users,
    };
}

export function selectUsers(users) {
    return {
        type: SELECT_USERS,
        users: users,
    };
}

export function userLogin({ user, accessToken }) {
    return {
        type: USER_LOGIN,
        user,
        accessToken,
    };
}

export function userUpdate(user) {
    return {
        type: UPDATE_USER,
        user,
    };
}

export const setOnlineStatus = (user, status) => {
    socket.emit('onlinestatus', user, status);
    return {
        type: SET_ONLINESTATUS,
        onlinestatus: status,
    };
};
