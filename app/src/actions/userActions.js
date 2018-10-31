import request from 'superagent';
import {HOST} from '../config/';

const loginEndpoint = HOST + 'user';

export const USER_LOGIN = 'user-login';

// these should be generic for all request actions
export const FAILED = 'failed';
export const SUCCESS = 'success';
export const LOADING = 'laoding';

/**
 * logs in a user. on success redirect to chat.
 * on fail show an error message.
 *
 * @param {Object} user the user that tries to login
 */
export function login({email, password}) {
    return (dispatch) => {
        dispatch(isLoading({isLoading: true}));
        request
            .post(loginEndpoint)
            .set('Content-Type', 'application/json')
            .send({email, password})
            .then( res => {
                dispatch(hasSucceeded({isSuccess: true, infoMessage: res.body.message}));
                dispatch(isLoading(false));
            })
            .catch( err => {
                dispatch(hasSucceeded({isSuccess: false, infoMessage: res.body.error}));
                dispatch(isLoading(false))
            });
    }
}

export function isLoading(bool) {
    return {
        type: LOADING,
        isLoading: bool,
    }
}

export function hasSucceeded({isSuccess, infoMessage}) {
    return {
        type: SUCCESS,
        infoMessage,
        isSuccess,
    }
}