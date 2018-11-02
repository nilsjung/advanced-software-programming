
export function setUserIdReducer(state, action) {
    let user = action.user

    return {...state, user};
}

export function isLoginSuccessfullReducer(state, action) {
    const { isSuccess, infoMessage, user } = action
    return {...state, isSuccess, infoMessage, isAuthenticated: isSuccess, user}
}

export function loginIsLoadingReducer(state, action) {
    const { isLoading } = action;
    return {...state, isLoading};
}