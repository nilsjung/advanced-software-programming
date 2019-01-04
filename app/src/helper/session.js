import moment from 'moment';

const SESSION_COOKIE_NAME = 'chat-session';

export const getSessionToken = () => {
    const cookie = decodeURIComponent(document.cookie);
    let sessionToken = null;
    cookie.split(';').forEach((cookieString) => {
        const cookie = cookieString.split('=');
        const key = cookie[0].trim();
        const value = cookie[1].trim();
        if (key === SESSION_COOKIE_NAME) {
            sessionToken = value;
        }
    });

    return sessionToken;
};

export const writeSessionToken = (token) => {
    const expires = moment().add(1, 'days');
    document.cookie =
        SESSION_COOKIE_NAME +
        '=' +
        token +
        ';' +
        'expires=' +
        expires.format() +
        ';path=/';
};
