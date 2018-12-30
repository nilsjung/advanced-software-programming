export function setUserIdReducer(state, action) {
    let user = action.user;

    return { ...state, user };
}

export function isLoginSuccessfullReducer(state, action) {
    const { user, accessToken, chatrooms, userchats } = action;
    const copiedState = Object.create(state);
    const newUser = copiedState.user;
    newUser.email = user.email;
    newUser.firstname = user.firstname;
    newUser.lastname = user.lastname;
    return {
        ...state,
        user: newUser,
        accessToken,
        chatrooms,
        userchats,
    };
}

export function loginIsLoadingReducer(state, action) {
    const { isLoading } = action;
    return { ...state, isLoading };
}
