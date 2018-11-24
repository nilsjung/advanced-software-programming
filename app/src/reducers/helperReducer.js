export const setInfoMessage = (state, action) => {
    return { ...state, infoMessage: action.infoMessage };
};

export const resetInfoMessage = (state, action) => {
    return { ...state, infoMessage: '', isSuccess: null };
};
