import request from 'superagent';

export const REGISTER_USER = 'register-user';
export const IS_LOADING = 'is-loading';
export const REGISTRATION_SUCCESS = 'registration-success';
export const REGISTRATION_FAILED = 'registration-failed';


const HOST = 'http://localhost:5001/users';



export function registerUser(user) {

    return (dispatch) => {
        dispatch(isLoading({isLoading: true}))
        request
            .post(HOST)
            .set('Content-Type', 'application/json')
            .send(user)
            .then((res) => {
                dispatch(registrationSuccess({isSuccess: true, infoMessage: res.body.message}));
                dispatch(isLoading(false))
            })
            .catch((err) => {
                dispatch(registrationHasFailed({hasFailed: true}));
                dispatch(isLoading(false))
            })

    }
}

export function registrationHasFailed(payload) {
    return {
        type: REGISTRATION_FAILED,
        hasErrored: payload
    };
}

export function isLoading(payload) {
    return {
        type: IS_LOADING,
        isLoading: payload
    }
}

export function registrationSuccess({infoMessage, isSuccess}) {
    return {
        type: REGISTRATION_SUCCESS,
        isSuccess,
        infoMessage
    }
}