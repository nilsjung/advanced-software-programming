export const REGISTER = 'register';

export function registerUser(payload) {
    return {
        type: REGISTER,
        payload: payload
    }
}