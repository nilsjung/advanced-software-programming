import request from 'superagent';
import { HOST } from '../config/';
import {
    showPopup,
    isLoading,
    isSuccess,
    isAuthenticated,
} from './helperAction';

import { socket } from './../socket/socket';
import { onlinestatus } from './../config';

const loginEndpoint = HOST + 'user/login';
const chatroomEndpoint = HOST + 'chatroom';

export const USER_LOGIN = 'user-login';

// these should be generic for all request actions
export const FAILED = 'failed';
export const SET_USER_ID = 'set-user-id';
export const LOGOUT = 'logout';
export const SET_ONLINESTATUS = 'set-onlinestatus';

/**
 * Register a new client on the websocket
 *
 * @param {Object} user the user to register
 *
 */
export function setUserId(user) {
    return {
        type: SET_USER_ID,
        user,
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

        const requests = [];
        requests.push(
            request
                .post(loginEndpoint)
                .set('Content-Type', 'application/json')
                .send({ email, password })
                .catch((err) => {
                    dispatch(showPopup('Error while login: ' + err.message));
                    dispatch(isSuccess(false));
                    dispatch(isLoading(false));
                })
        );
        requests.push(
            request
                .get(chatroomEndpoint)
                .set({ 'Content-Type': 'application/json' })
        );

        Promise.all(requests).then((result) => {
            const loginResult = result[0].body;
            const chatroomResult = result[1].body;
            dispatch(
                userLogin({
                    user: loginResult.user,
                    accessToken: loginResult.token,
                    chatrooms: chatroomResult.chatrooms,
                })
            );
            dispatch(setOnlineStatus(loginResult.user, onlinestatus.ONLINE));
            dispatch(isSuccess(true));
            dispatch(isAuthenticated(true));
            dispatch(showPopup(loginResult.message)); // show the popup for default seconds
            dispatch(isLoading(false));
        });
    };
}

export function logout() {
    return {
        type: LOGOUT,
    };
}

export function userLogin({ user, accessToken, chatrooms }) {
    return {
        type: USER_LOGIN,
        user,
        accessToken,
        chatrooms,
    };
}

export const setOnlineStatus = (user, status) => {
    socket.emit('onlinestatus', user, status);
    return {
        type: SET_ONLINESTATUS,
        onlinestatus: status,
    };
};
