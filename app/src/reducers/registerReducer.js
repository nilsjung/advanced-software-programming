export function registrationIsLoading(state, action) {
    return {...state, isLoading: action.isLoading};
}

export function registrationIsSuccess(state, action) {
    return {...state, infoMessage: action.infoMessage, isSuccess: action.isSuccess};
}