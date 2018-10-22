import { REGISTER } from '../actions/register-actions';

/**
 * Handle the register action
 * @param {Object} state
 * @param {Object} action
 */
export function registerReducer(state, action) {

    if (action.type === REGISTER) {
        const user = action.payload;
        if (user) {
            const { email, firstname, lastname } = user;

            if (!(email && firstname && lastname)) {
                return { ...state, success: false }
            }
        }
        return {...state}
    }

    return {...state}
}