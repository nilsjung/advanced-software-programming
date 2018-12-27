import io from 'socket.io-client';
import { WS } from './../config/';

export let socket = null;

export const initSocket = () => {
    socket = io.connect(WS);
};
