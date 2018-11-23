export const SHOW_INFO_MESSAGE = 'show-info-message';
export const RESET_INFO_MESSAGE = 'reset-info-message';

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
        dispatch(setInfoMessage(message));
        setTimeout(() => {
            dispatch(resetInfoMessage());
        }, waitTime);
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
