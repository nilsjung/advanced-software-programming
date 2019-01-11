import { onlinestatus } from '../config';

export function setUserIdReducer(state, action) {
    let user = action.user;

    return { ...state, user };
}

export function isLoginSuccessfullReducer(state, action) {
    const { user, accessToken, chatrooms, userchats } = action;
    return {
        ...state,
        user: { ...user },
        accessToken,
        chatrooms,
        userchats,
    };
}

export function updateUserReducer(state, action) {
    const { user } = action;
    return { ...state, user: { ...user, onlinestatus: onlinestatus.ONLINE } };
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
