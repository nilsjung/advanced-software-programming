export const ADD_MESSAGE = 'addMessage';
export const UPDATE_MESSAGE = 'updateMessage';
export const ADD_RESPONSE = 'addResponse';

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