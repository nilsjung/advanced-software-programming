
import {combineReducers} from 'redux';
import { SET_USER_ID } from '../actions/message-actions';
import { isLoading, registrationHasFailed, isSuccess} from './registerReducer'
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

    function userId(currentUserId = initialState.user.userId, action) {
        if (action.type === SET_USER_ID) {
            return action.userId;
        }
        return  currentUserId;
    }

    function registrationFailed(state = initialState, action) {
        return registrationHasFailed(state, action);
    }

    function registrationSucceed(state = initialState, action) {
        return isSuccess(state, action);
    }

    function registerUserIsLoading (state = initialState, action) {
        return isLoading(state, action);
    }

    return combineReducers({ userId, currentMessage, messages, registerUserIsLoading, registrationFailed, registrationSucceed});
}