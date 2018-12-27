import * as messageActions from './actions/messageActions';

import io from 'socket.io-client';

import { setUserId } from './actions/userActions';
import { WS } from './config/';

let socket = null;

/**
 * Adds the chat middleware to send messages via ws to the server.
 *
 * @param {Object} store the current store
 */
export function chatMiddleware(store) {
    return (next) => (action) => {
        if (socket && action.type === messageActions.ADD_MESSAGE) {
            socket.emit('message', {
                message: action.message,
                user: action.message.user,
                token: store.getState().accessToken,
                chatroom: store.getState().currentChatroom,
            });
        }
        return next(action);
    };
}

/**
 * Creates a connection to the server via ws.
 *
 *
 * @param {Object} store the current store
 */
export default function(store) {
    socket = io.connect(WS);

    socket.on('start', (data) => {
        const user = {
            userId: data.userId,
        };
        store.dispatch(setUserId(user));
    });

    socket.on('message', (data) => {
        store.dispatch(messageActions.addResponse(data));
    });
}
