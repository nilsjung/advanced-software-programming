export const setInfoMessage = (state, action) => {
    return { ...state, infoMessage: action.infoMessage };
};

export const resetInfoMessage = (state, action) => {
    return { ...state, infoMessage: '', isSuccess: null };
};

export const setIsSuccess = (state, action) => {
    return { ...state, isSuccess: action.isSuccess };
};

export const setIsLoading = (state, action) => {
    return { ...state, isLoading: action.isLoading };
};

export const setIsAuthenticated = (state, action) => {
    return { ...state, isAuthenticated: action.isAuthenticated };
};
