import request from 'superagent';

export const REGISTER_USER = 'register-user';
export const IS_LOADING = 'is-loading';

import { HOST } from './../config/';
import { showPopup, isSuccess, isLoading } from './helper';

const userEndpoint = HOST + 'user';

/**
 * registers a user at the server.
 *
 * @param {Object} user object with firstname, lastname, password and email as content.
 */
export function registerUser(user) {
    return (dispatch) => {
        dispatch(isLoading(true));
        request
            .post(userEndpoint)
            .set('Content-Type', 'application/json')
            .send(user)
            .then((res) => {
                if (res.status === 200) {
                    dispatch(isSuccess(true));
                }

                dispatch(showPopup(res.body.message));
                dispatch(isLoading(false));
            })
            .catch((err) => {
                dispatch(isSuccess(false));
                dispatch(showPopup('Error at registration: ' + err));
                dispatch(isLoading(false));
            });
    };
}
