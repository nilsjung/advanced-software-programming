import * as actions from '../actions/register-actions';
import request from 'superagent';

const HOST = 'http://localhost:5001/users';



export function registrationHasFailed(state, action) {
    if (action.type === actions.REGISTRATION_FAILED) {
        return action.hasErrored;
    }

    return {...state};
}

export function isLoading(state, action) {
    if (action.type === actions.IS_LOADING) {
        return action.isLoading;
    }

    return {...state};
}

export function isSuccess(state, action) {
    if (action.type === actions.REGISTRATION_SUCCESS) {
        return {...state, infoMessage: action.message, isSuccess: true, user: action.user};
    }

    return {...state}
}

/**
 * Handle the register action
 * @param {Object} state
 * @param {Object} action
 */
export function registerReducer(state, action) {

    if (action.type === actions.REGISTER_USER) {
        const user = action.user;

        if (user) {
            const { email, firstname, lastname, password } = user;

            if (!(email && firstname && lastname && password)) {
                return { ...state, hasErrored: true, message: 'Missing Input Field'};
            }

            const newUser = { firstname: firstname, lastname: lastname, email: email, password: password }

            actions.isLoading(true);
            return request
                .post(HOST)
                .set('Content-Type', 'application/json')
                .send(newUser)
                .then((res) => {
                    console.log(res)
                    actions.registrationSuccess(res.body);
                })
                .catch(() => {
                    console.log('res, catch');
                    actions.registrationHasFailed(true);
                })
        }
    }

    return {...state}
}