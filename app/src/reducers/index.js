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
    USERS,
    SELECT_USERS,
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
    switch (action.type) {
        case REGISTRATION_FAILED || REGISTRATION_SUCCESS:
            return registrationIsSuccess(state, action);

        case IS_LOADING:
            return registrationIsLoading(state, action);

        case LOADING:
            return loginIsLoadingReducer(state, action);

        case SUCCESS || FAILED:
            return isLoginSuccessfullReducer(state, action);

        case LOGOUT:
            return initialState;

        case ADD_MESSAGE || ADD_RESPONSE:
            return messagesReducer(state, action);

        case UPDATE_MESSAGE:
            return updateMessageReducer(state, action);

        case SET_USER_ID:
            return setUserIdReducer(state, action);

        case SHOW_INFO_MESSAGE:
            return setInfoMessage(state, action);

        case RESET_INFO_MESSAGE:
            return resetInfoMessage(state, action);

        case CHANGE_ROOM:
            return { ...state, currentChatroom: action.currentChatroom };

        case CREATE_CHATROOM:
            const newChatrooms = Object.create(state.chatrooms);
            newChatrooms.push(action.chatroom);
            return { ...state, chatrooms: newChatrooms };

        case LOAD_HISTORY:
            return { ...state, messages: action.chats };

        case USERS:
            const selectedUsers = action.users.map((user) => user.email);
            return {
                ...state,
                users: action.users,
                selectedUsers: selectedUsers,
            };
        case SELECT_USERS:
            return { ...state, selectedUsers: action.users };

        default:
            return { ...state };
    }
}
