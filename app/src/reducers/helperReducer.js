/**
 * Sets the popup info message
 *
 * @param {*} state
 * @param {*} action
 */
export const setInfoMessage = (state, action) => {
    return { ...state, infoMessage: action.infoMessage };
};

/**
 * reset the state of success and the message field
 * @param {*} state
 * @param {*} action
 */
export const resetInfoMessage = (state, action) => {
    return { ...state, infoMessage: '', isSuccess: null };
};

/**
 * sets the state of success
 * @param {*} state
 * @param {*} action
 */
export const setIsSuccess = (state, action) => {
    return { ...state, isSuccess: action.isSuccess };
};

/**
 * sets the state of loading
 * @param {*} state
 * @param {*} action
 */
export const setIsLoading = (state, action) => {
    return { ...state, isLoading: action.isLoading };
};

/**
 * set the information, wether a user is authenticated or not.
 * @param {*} state
 * @param {*} action
 */
export const setIsAuthenticated = (state, action) => {
    return { ...state, isAuthenticated: action.isAuthenticated };
};
