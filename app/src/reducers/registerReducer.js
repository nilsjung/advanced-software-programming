import * as actions from '../actions/registerActions';


export function registrationHasFailed(state, action) {
    return {...state, hasErrored: action.hasFailed};
}

export function registrationIsLoading(state, action) {
    return {...state, isLoading: action.isLoading};
}

export function registrationIsSuccess(state, action) {
    return {...state, infoMessage: action.infoMessage, isSuccess: action.isSuccess, user: action.user};
}