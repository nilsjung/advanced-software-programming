export const IS_AUTHENTICATED = 'is-authenticated';

export const isAuthenticated = (bool) => {
    return {
        type: IS_AUTHENTICATED,
        isAuthenticated: bool,
    };
};
