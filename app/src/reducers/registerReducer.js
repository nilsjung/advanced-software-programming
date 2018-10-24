import * as actions from '../actions/register-actions';


export function registrationHasFailed(state, action) {
    if (action.type === actions.REGISTRATION_FAILED) {
        console.log('reducer: registration failed')
        return {...state, hasErrored: action.hasFailed};
    }

    return {...state};
}

export function isLoading(state, action) {
    if (action.type === actions.IS_LOADING) {
        console.log('reducer. registration is laoding: ', action.isLoading)
        return {...state, isLoading: action.isLoading};
    }

    return {...state};
}

export function isSuccess(state, action) {
    if (action.type === actions.REGISTRATION_SUCCESS) {
        console.log('reducer: registration succeeded: ', action.isSuccess, action.infoMessage)
        return {...state, infoMessage: action.infoMessage, isSuccess: action.isSuccess, user: action.user};
    }

    return {...state}
}