import request from 'superagent';
import {HOST} from '../config/';

const loginEndpoint = HOST + 'user/login';

export const USER_LOGIN = 'user-login';

// these should be generic for all request actions
export const FAILED = 'failed';
export const SUCCESS = 'success';
export const LOADING = 'laoding';
export const SET_USER_ID = 'set-user-id';

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
    }
}

/**
 * logs in a user. on success redirect to chat.
 * on fail show an error message.
 *
 * @param {Object} user the user that tries to login
 */
export function login({email, password}) {
    return (dispatch) => {
        dispatch(isLoading(true));
        request
            .post(loginEndpoint)
            .set('Content-Type', 'application/json')
            .send({email, password})
            .then( res => {
                console.log(res)
                dispatch(hasSucceeded({isSuccess: true, infoMessage: res.body.message, user: res.body.user}));
                dispatch(isLoading(false));
            })
            .catch( err => {
                console.log(err)
                dispatch(hasSucceeded({isSuccess: false, infoMessage: err}));
                dispatch(isLoading(false));
            });
    }
}

export function isLoading(bool) {
    return {
        type: LOADING,
        isLoading: bool,
    }
}

export function hasSucceeded({isSuccess, infoMessage, user}) {
    return {
        type: SUCCESS,
        infoMessage,
        isSuccess,
        user,
    }
}