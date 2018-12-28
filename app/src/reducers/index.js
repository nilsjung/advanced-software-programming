import {} from './registerReducer';

import { messagesReducer, updateMessageReducer } from './messageReducer';
import { setUserIdReducer, isLoginSuccessfullReducer } from './userReducer';

import {
    setInfoMessage,
    resetInfoMessage,
    setIsSuccess,
    setIsAuthenticated,
    setIsLoading,
} from './helperReducer';

import { SET_USER_ID, LOGOUT, USER_LOGIN } from '../actions/userActions';

import {
    UPDATE_MESSAGE,
    ADD_MESSAGE,
    ADD_RESPONSE,
    LOAD_HISTORY,
} from '../actions/messageActions';

import {
    SHOW_INFO_MESSAGE,
    RESET_INFO_MESSAGE,
    IS_SUCCESS,
    IS_AUTHENTICATED,
    IS_LOADING,
} from '../actions/helper';

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
        case IS_AUTHENTICATED:
            return setIsAuthenticated(state, action);

        case IS_LOADING:
            return setIsLoading(state, action);

        case USER_LOGIN:
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

        case IS_SUCCESS:
            return setIsSuccess(state, action);

        default:
            return { ...state };
    }
}
