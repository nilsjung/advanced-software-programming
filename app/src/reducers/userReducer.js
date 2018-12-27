export function setUserIdReducer(state, action) {
    let user = action.user;

    return { ...state, user };
}

export function isLoginSuccessfullReducer(state, action) {
    const { user, accessToken, chatrooms } = action;
    return {
        ...state,
        user,
        accessToken,
        chatrooms,
    };
}

export function loginIsLoadingReducer(state, action) {
    const { isLoading } = action;
    return { ...state, isLoading };
}

export function setOnlineStatusReducer(state, action) {
    return {
        ...state,
        user: { ...state.user, onlinestatus: action.onlinestatus },
    };
}
