// import {browserHistory} from
import * as messageActions from './../actions/messageActions';

import { initSocket, socket } from './socket';
import { getSessionToken } from '../helper/session';
import { getChatrooms } from '../actions/chatroomActions';
import { getUserChats } from '../actions/userChatActions';
import { userLogin, setOnlineStatus } from '../actions/userActions';
import { isAuthenticated } from '../actions/helper';
import { onlinestatus } from '../config';

/**
 * Creates a connection to the server via ws.
 *
 *
 * @param {Object} store the current store
 */
export default function(store) {
    // search for cookie and submit token to server
    const token = getSessionToken();
    initSocket(token);

    socket.on('start', (data) => {
        // token was found.
        if (data.user) {
            store.dispatch(userLogin({ user: data.user, accessToken: token }));
            store.dispatch(setOnlineStatus(data.user, onlinestatus.ONLINE));
            store.dispatch(isAuthenticated(true));
            store.dispatch(getChatrooms({ token }));
            store.dispatch(getUserChats);
        }
    });

    socket.on('message', (data) => {
        store.dispatch(messageActions.addResponse(data));
    });
}
