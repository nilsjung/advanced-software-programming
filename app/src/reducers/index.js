
import {combineReducers} from 'redux';
import { SET_USER_ID } from '../actions/message-actions';
import {registerReducer} from './registerReducer'
import {messagesReducer, currentMessageReducer} from './messageReducer';


/**
 * This is the main reducer. delegates the work to the specialized sub-reducer.
 *
 * TODO: improve structure
 *
 * @param {Object} initialState The initial state
 */
export default function (initialState) {
    function messages(currentMessages = initialState.messages, action) {
        return messagesReducer(currentMessages, action);
    }

    function currentMessage(currentMessage = initialState.currentMessage, action) {
        return currentMessageReducer(currentMessage, action);
    }

    function userId(currentUserId = initialState.userId, action) {
        if (action.type === SET_USER_ID) {
            return action.userId;
        }
        return  currentUserId;
    }

    function registerUser(state = initialState, action) {
        return registerReducer(state, action);
    }

    return combineReducers({userId, currentMessage, messages, registerUser});
}