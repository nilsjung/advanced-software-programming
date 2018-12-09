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
import {
    CHANGE_ROOM,
    CREATE_CHATROOM,
    DELETE_CHATROOM,
} from '../actions/chatroomActions';

import initialState from '../store/';
import {
    deleteChatroomReducer,
    createChatroomReducer,
} from './chatroomReducer';

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
            return createChatroomReducer(state, action);

        case DELETE_CHATROOM:
            return deleteChatroomReducer(state, action);

        case LOAD_HISTORY:
            return { ...state, messages: action.chats };

        default:
            return { ...state };
    }
}
