import * as actions from './actions/messageActions';

import {setUserId} from './actions/userActions';
import io from 'socket.io-client';

let socket = null;

/**
 * Adds the chat middleware to send messages via ws to the server.
 *
 * @param {Object} store the current store
 */
export function chatMiddleware(store) {
    return (next) => (action) => {
        if (socket && (action.type === actions.ADD_MESSAGE)) {
            console.log({emit: action.message});
            socket.emit('message', {message: action.message, user: action.message.user, token: store.getState().accessToken, chatroom: store.getState().currentChatroom});
        }
        return next(action);
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
        const user = {
            userId: data.userId,
        }
        store.dispatch(setUserId(user))
    })

    socket.on('message', (data) => {
        store.dispatch(actions.addResponse(data))
    });
}