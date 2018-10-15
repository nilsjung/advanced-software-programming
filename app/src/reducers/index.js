
import {combineReducers} from 'redux';
import { UPDATE_MESSAGE, ADD_MESSAGE, ADD_RESPONSE, SET_USER_ID } from '../actions/message-actions';

export default function (initialState) {
    function messages(currentMessages=initialState.messages, action) {
        if (action.type === ADD_MESSAGE || action.type === ADD_RESPONSE) {
            console.log(action.type, action.message)
            console.log(currentMessages)
            let messages = currentMessages.map((message) => Object.assign({}, message));

            console.log(messages, action.message)
            messages.push(Object.assign({}, action.message));
            return messages;
        }

        return currentMessages;
    }

    function currentMessage(currentMessage=initialState.currentMessage, action) {
        if (action.type === UPDATE_MESSAGE) {
            return action.message;
        } else if (action.type === ADD_MESSAGE) {
            return '';
        }

        return currentMessage;
    }

    function userId(currentUserId=initialState.userId, action) {
        if (action.type === SET_USER_ID) {
            return action.userId;
        }
        return  currentUserId;
    }

    return combineReducers({userId, currentMessage, messages});
}