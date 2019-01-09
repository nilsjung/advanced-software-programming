export const SHOW_INFO_MESSAGE = 'show-info-message';
export const RESET_INFO_MESSAGE = 'reset-info-message';
export const IS_SUCCESS = 'is-success';
export const IS_LOADING = 'is-loading';

export const isLoading = (bool) => {
    return {
        type: IS_LOADING,
        isLoading: bool,
    };
};

export const showPopup = (message, time = 3000) => {
    let waitTime = time;

    // round display time into seconds
    if (time < 10) {
        waitTime = time * 1000;
    } else if (time < 100) {
        waitTime = time * 100;
    } else if (time < 1000) {
        waitTime = time * 10;
    }

    return (dispatch) => {
        if (message) {
            dispatch(setInfoMessage(message));
        }

        setTimeout(() => {
            dispatch(resetInfoMessage());
        }, waitTime);
    };
};

export const isSuccess = (isSuccess) => {
    return {
        type: IS_SUCCESS,
        isSuccess,
    };
};

export const setInfoMessage = (msg) => {
    return {
        type: SHOW_INFO_MESSAGE,
        infoMessage: msg,
    };
};

export const resetInfoMessage = () => {
    return {
        type: RESET_INFO_MESSAGE,
    };
};
