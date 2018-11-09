import { registrationIsLoading, registrationHasFailed, registrationIsSuccess} from './registerReducer'
import { messagesReducer, addMessageReducer, updateMessageReducer} from './messageReducer';
import {setUserIdReducer, loginIsLoadingReducer, isLoginSuccessfullReducer} from './userReducer';

import { SET_USER_ID, FAILED, SUCCESS, LOADING } from '../actions/userActions';
import { UPDATE_MESSAGE, ADD_MESSAGE, ADD_RESPONSE } from '../actions/messageActions';
import { REGISTRATION_FAILED, REGISTRATION_SUCCESS, IS_LOADING } from '../actions/registerActions';



import initialState from '../store/';

/**
 * This is the main reducer. delegates the work to the specialized sub-reducer.
 */
export default function (state = initialState, action) {

    // registration reducer
    if (action.type === REGISTRATION_FAILED) {
        return registrationHasFailed(state, action);
    } else if (action.type === IS_LOADING) {
        return registrationIsLoading(state, action);
    } else if (action.type === REGISTRATION_SUCCESS) {
        return registrationIsSuccess(state, action)

        // user login
    } else if (action.type === LOADING) {
        return  loginIsLoadingReducer(state, action);

    } else if (action.type === SUCCESS || action.type === FAILED) {
        return isLoginSuccessfullReducer(state, action);

        // message reducer
    } else if (action.type === ADD_MESSAGE || action.type === ADD_RESPONSE) {
        return messagesReducer(state, action)

    } else if (action.type === UPDATE_MESSAGE) {
        return updateMessageReducer(state, action)
    } else if (action.type === ADD_MESSAGE) {
        return addMessageReducer(state, action)

        // user reducer
    } else if (action.type === SET_USER_ID) {
        return setUserIdReducer(state, action);
    }

    return {...state};

}