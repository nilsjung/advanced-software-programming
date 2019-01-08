import io from 'socket.io-client';
import { WS } from './../config/';

export let socket = null;

export const initSocket = (token = null) => {
    socket = io.connect(
        WS,
        { query: 'token=' + token }
    );
};

export function disconnect() {
    if (socket !== null) {
        socket.emit('disconnect');
    }
}
