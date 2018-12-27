import * as messageActions from './../actions/messageActions';

import { socket } from './socket';

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
