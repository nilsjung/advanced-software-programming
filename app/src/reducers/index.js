import {
    registrationIsLoading,
    registrationIsSuccess,
} from './registerReducer';
import { messagesReducer, updateMessageReducer } from './messageReducer';
import {
    setUserIdReducer,
    loginIsLoadingReducer,
    isLoginSuccessfullReducer,
} from './userReducer';
import { setInfoMessage, resetInfoMessage } from './helperReducer';

import {
    SET_USER_ID,
    FAILED,
    SUCCESS,
    LOADING,
    LOGOUT,
} from '../actions/userActions';
import {
    UPDATE_MESSAGE,
    ADD_MESSAGE,
    ADD_RESPONSE,
    LOAD_HISTORY,
} from '../actions/messageActions';
import {
    REGISTRATION_FAILED,
    REGISTRATION_SUCCESS,
    IS_LOADING,
} from '../actions/registerActions';
import { SHOW_INFO_MESSAGE, RESET_INFO_MESSAGE } from '../actions/helperAction';
import { CHANGE_ROOM, CREATE_CHATROOM } from '../actions/chatroomActions';

import initialState from '../store/';

/**
 * This is the main reducer. delegates the work to the specialized sub-reducer.
 */
export default function(state = initialState, action) {
    // registration reducer
    if (
        action.type === REGISTRATION_FAILED ||
        action.type === REGISTRATION_SUCCESS
    ) {
        return registrationIsSuccess(state, action);
    } else if (action.type === IS_LOADING) {
        return registrationIsLoading(state, action);

        // user login
    } else if (action.type === LOADING) {
        return loginIsLoadingReducer(state, action);
    } else if (action.type === SUCCESS || action.type === FAILED) {
        return isLoginSuccessfullReducer(state, action);
    } else if (action.type === LOGOUT) {
        return initialState;
        // message reducer
    } else if (action.type === ADD_MESSAGE || action.type === ADD_RESPONSE) {
        return messagesReducer(state, action);
    } else if (action.type === UPDATE_MESSAGE) {
        return updateMessageReducer(state, action);

        // user reducer
    } else if (action.type === SET_USER_ID) {
        return setUserIdReducer(state, action);

        // logging reducer
    } else if (action.type === SHOW_INFO_MESSAGE) {
        return setInfoMessage(state, action);
    } else if (action.type === RESET_INFO_MESSAGE) {
        return resetInfoMessage(state, action);
    }
    //chatroom reducer
    else if (action.type === CHANGE_ROOM) {
        return { ...state, currentChatroom: action.currentChatroom };
    } else if (action.type === CREATE_CHATROOM) {
        const newChatrooms = Object.create(state.chatrooms);
        newChatrooms.push(action.chatroom);
        return { ...state, chatrooms: newChatrooms };
    } else if (action.type === LOAD_HISTORY) {
        return { ...state, messages: action.chats };
    }
    return { ...state };
}
