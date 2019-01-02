import io from 'socket.io-client';
import { WS } from './../config/';

export let socket = null;

export const initSocket = () => {
    socket = io.connect(WS);
};

export function disconnect() {
    if (socket !== null) {
        socket.emit('disconnect');
    }
}
