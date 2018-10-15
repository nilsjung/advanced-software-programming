export const ADD_MESSAGE = 'addMessage';
export const UPDATE_MESSAGE = 'updateMessage';
export const ADD_RESPONSE = 'addResponse';
export const SET_USER_ID = 'setUserId';

export function addMessage(message) {
    return {
        type: ADD_MESSAGE,
        message
    }
}

export function updateMessage(message) {
    return {
        type: UPDATE_MESSAGE,
        message
    }
}

export function addResponse(message) {
    return {
        type: ADD_RESPONSE,
        message
    }
}

export function setUserId(userId) {
    return {
        type: SET_USER_ID,
        userId,
    }
}