const port = process.env.PORT || 3000;
const domain = process.env.SERVER_HOST || 'http://localhost';

/**
 * This is a privat api key for the yandex.
 * There are just limited free translations.
 * Don't use to many translation or it wont work after a while.
 * @author Marc Engelmann
 */
export const YANDEX = {
    url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
    apiKey: process.env.YANDEX_API_KEY,
};

export const DateFormat = process.env.DISPLAY_TIME_FORMAT || 'MM/DD/YY h:mm';
export const HOST = domain + ':' + port + '/api/';
export const WS = domain + ':' + port;

export const onlinestatus = {
    OFFLINE: 'offline',
    ONLINE: 'online',
};
