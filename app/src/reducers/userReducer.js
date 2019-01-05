import { onlinestatus } from '../config';

export function loadUserReducer(state, action) {
    const users = action.users.filter(
        (user) => user.email !== state.user.email
    );
    const selectedUsers = users.map((user) => user.email);
    return { ...state, users: users, selectedUsers: selectedUsers };
}

export function isLoginSuccessfullReducer(state, action) {
    const { user, accessToken } = action;
    return {
        ...state,
        user: { ...state.user, ...user },
        accessToken,
    };
}

export function updateUserReducer(state, action) {
    const { user } = action;
    return { ...state, user: { ...state.user, ...user } };
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
