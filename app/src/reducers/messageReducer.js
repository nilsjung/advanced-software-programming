import { UPDATE_MESSAGE, ADD_MESSAGE, ADD_RESPONSE} from '../actions/message-actions';


export function messagesReducer(currentMessages, action) {
    if (action.type === ADD_MESSAGE || action.type === ADD_RESPONSE) {
        console.log(action.type, action.message)
        console.log(currentMessages)
        let messages = currentMessages.map((message) => ({ ...message }));

        console.log(messages, action.message)
        messages.push({ ...action.message });
        return messages;
    }

    return currentMessages;
}

export function currentMessageReducer(currentMessage, action) {
    if (action.type === UPDATE_MESSAGE) {
        return action.message;
    } else if (action.type === ADD_MESSAGE) {
        return '';
    }

    return currentMessage;
}