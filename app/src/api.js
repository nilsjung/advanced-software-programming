import * as messageActions from './actions/messageActions';
import * as chatroomActions from './actions/chatroomActions';

import { setUserId } from './actions/userActions';
import io from 'socket.io-client';

let socket = null;

/**
 * Adds the chat middleware to send messages via ws to the server.
 *
 * @param {Object} store the current store
 */
export function chatMiddleware(store) {
    return (next) => (action) => {
        if (socket && action.type === chatroomActions.CHANGE_ROOM) {
            socket.emit('joinChatroom', {
                chatroom: action.currentChatroom,
            });
        }
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

export function disconnect(store) {
    if (socket !== null) {
        socket.emit('disconnect');
    }
}

/**
 * Creates a connection to the server via ws.
 *
 * TODO save host as env or global var
 *
 * @param {Object} store the current store
 */
export default function(store) {
    socket = io.connect('http://localhost:5001');

    socket.on('start', (data) => {
        console.log('start');
        const user = {
            userId: data.userId,
        };
        store.dispatch(setUserId(user));
    });

    socket.on('message', (data) => {
        console.log('message', { data });
        store.dispatch(messageActions.addResponse(data));
    });
}
