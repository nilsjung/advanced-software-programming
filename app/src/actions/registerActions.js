import request from 'superagent';

export const REGISTER_USER = 'register-user';
export const IS_LOADING = 'is-loading';

import { HOST } from './../config/';
import { showPopup, isSuccess, isLoading } from './helperAction';

const userEndpoint = HOST + 'user';

export function registerUser(user) {
    return (dispatch) => {
        dispatch(isLoading({ isLoading: true }));
        request
            .post(userEndpoint)
            .set('Content-Type', 'application/json')
            .send(user)
            .then((res) => {
                dispatch(isSuccess(true));
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
