
export const SET_USER_ID = 'setUserId';

export function setUserId(user) {
    return {
        type: SET_USER_ID,
        user: user,
    }
}