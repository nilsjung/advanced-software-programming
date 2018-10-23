export const REGISTER_USER = 'register-user';
export const IS_LOADING = 'is-loading';
export const REGISTRATION_SUCCESS = 'registration-success';
export const REGISTRATION_FAILED = 'registration-failed';



export function registerUser(payload) {
    return {
        type: REGISTER_USER,
        user: payload
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

export function registrationSuccess(reqBody) {
    return {
        type: REGISTRATION_SUCCESS,
        reqBody
    }
}