import request from 'superagent';

export const REGISTER_USER = 'register-user';
export const IS_LOADING = 'is-loading';
export const REGISTRATION_SUCCESS = 'registration-success';
export const REGISTRATION_FAILED = 'registration-failed';

import { HOST } from './../config/';

const userEndpoint = HOST + 'user';

export function registerUser(user) {
    return (dispatch) => {
        dispatch(isLoading({ isLoading: true }));
        request
            .post(userEndpoint)
            .set('Content-Type', 'application/json')
            .send(user)
            .then((res) => {
                dispatch(
                    registrationIsSuccess({
                        isSuccess: true,
                        infoMessage: res.body.message,
                    })
                );
                dispatch(isLoading(false));
            })
            .catch((err) => {
                dispatch(
                    registrationIsSuccess({
                        isSuccess: false,
                        infoMessage: err,
                    })
                );
                dispatch(isLoading(false));
            });
    };
}

export function registrationIsSuccess(bool) {
    return {
        type: REGISTRATION_FAILED,
        isSuccess: bool,
    };
}

export function isLoading(bool) {
    return {
        type: IS_LOADING,
        isLoading: bool,
    };
}

export function registrationSuccess({ infoMessage, isSuccess }) {
    return {
        type: REGISTRATION_SUCCESS,
        isSuccess,
        infoMessage,
    };
}
