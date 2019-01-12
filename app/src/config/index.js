const domain = 'localhost';
const port = 5001;

/**
 * This is a privat api key for the yandex.
 * There are just limited free translations.
 * Don't use to many translation or it wont work after a while.
 * @author Marc Engelmann
 */
export const YANDEX = {
    url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
    apiKey:
        'trnsl.1.1.20190103T181139Z.7464426976138302.da0198e0cc346b526c18e9ffa40aa8144de2282d',
};

export const DateFormat = 'MM/DD/YY h:mm';
export const HOST = 'http://' + domain + ':' + port + '/api/';
export const WS = 'http://' + domain + ':' + port;

export const onlinestatus = {
    OFFLINE: 'offline',
    ONLINE: 'online',
};
