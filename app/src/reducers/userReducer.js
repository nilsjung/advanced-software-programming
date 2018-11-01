
export function setUserIdReducer(state, action) {
    let user = action.user

    return {...state, user};
}

export function isLoginSuccessfullReducer(state, {isSuccess, infoMessage}) {
    return {...state, isSuccess, infoMessage}
}

export function loginIsLoadingReducer(state, {isLoading}) {
    return {...state, isLoading};
}