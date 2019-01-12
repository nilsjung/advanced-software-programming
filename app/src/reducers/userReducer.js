/**
 * Define the user reducer to manipulate the store
 */

import { onlinestatus } from '../config';

/**
 * set the user id (deprecated)
 *
 * @param {*} state
 * @param {*} action
 */
export function setUserIdReducer(state, action) {
    let user = action.user;

    return { ...state, user };
}

/**
 * Log in a user by setting the access token and the user information.
 * Furthermore the chats are loaded.
 *
 * @param {*} state
 * @param {*} action
 */
export function isLoginSuccessfullReducer(state, action) {
    const { user, accessToken, chatrooms, userchats } = action;
    return {
        ...state,
        user: { ...user },
        accessToken,
        chatrooms,
        userchats,
    };
}

/**
 * update the user information after settings manipulation.
 * Also add the userstatus to the store.
 *
 * @param {*} state
 * @param {*} action
 */
export function updateUserReducer(state, action) {
    const { user } = action;
    return { ...state, user: { ...user, onlinestatus: onlinestatus.ONLINE } };
}

/**
 * Set the onlinestatus of the user
 *
 * @param {*} state
 * @param {*} action
 */
export function setOnlineStatusReducer(state, action) {
    return {
        ...state,
        user: { ...state.user, onlinestatus: action.onlinestatus },
    };
}
