import * as messageActions from './../actions/messageActions';

import { setUserId } from './../actions/userActions';
import { initSocket, socket } from './socket';

/**
 * Creates a connection to the server via ws.
 * Registers the 'start' and 'message' event
 *
 * @param {Object} store the initial store
 */
export default function(store) {
    initSocket();

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
