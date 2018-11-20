export const ADD_MESSAGE = 'addMessage';
export const UPDATE_MESSAGE = 'updateMessage';
export const ADD_RESPONSE = 'addResponse';
export const LOAD_HISTORY = 'loadHistory';

export function addMessage(message) {
    console.log(message);
    return {
        type: ADD_MESSAGE,
        message: message,
    }
}

export function loadChatHistory({chats}) {
    return {
        type: LOAD_HISTORY,
        chats
    }
}

export function updateMessage(message) {
    return {
        type: UPDATE_MESSAGE,
        message
    }
}

export function addResponse({message, user}) {
    return {
        type: ADD_RESPONSE,
        message,
        user,
    }
}