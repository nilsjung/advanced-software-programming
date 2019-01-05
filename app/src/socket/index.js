import * as messageActions from './../actions/messageActions';

import { setUserId } from './../actions/userActions';
import { initSocket, socket } from './socket';
import { getSessionToken } from '../helper/session';

/**
 * Creates a connection to the server via ws.
 *
 *
 * @param {Object} store the current store
 */
export default function(store) {
    // search for cookie and submit token to server
    initSocket(getSessionToken());

    socket.on('start', (data) => {});

    socket.on('message', (data) => {
        store.dispatch(messageActions.addResponse(data));
    });
}
