import request from 'superagent';
import { HOST } from '../config/';
import { loadChatHistory } from './messageActions';

const chatroomEndpoint = HOST + 'chatroom/';

export const CHANGE_ROOM = 'changeRoom';
export const CREATE_CHATROOM = 'createChatroom';

export function getChatroom({ chatroom, token }) {
    return (dispatch) => {
        request
            .get(chatroomEndpoint + chatroom)
            .set({ 'Content-Type': 'application/json', Authorization: token })
            .then((result) =>
                dispatch(loadChatHistory({ chatroom: result.chats }))
            )
            .catch((err) => console.log(err));
    };
}

export function createChatroom({ chatroom, user, token }) {
    const users = [];
    users.push(user);
    console.log(user);
    return (dispatch) => {
        request
            .post(chatroomEndpoint)
            .set({ 'Content-Type': 'application/json', Authorization: token })
            .send({ chatroom, users })
            .then((res) => {
                console.log(res);
                dispatch(createdChatroom(res.body.chatroom));
            })
            .catch((err) => {
                //todo: add error dispatching
            });
    };
}

export function createUserChat({ chatroom, users, token }) {
    console.log(users);
    return (dispatch) => {
        request
            .post(chatroomEndpoint)
            .set({ 'Content-Type': 'application/json', Authorization: token })
            .send({ chatroom, users })
            .then((res) => {
                dispatch(createdChatroom(res.body.chatroom));
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function changeChatroom(room, token) {
    return (dispatch) => {
        request
            .get(chatroomEndpoint + room)
            .set({ 'Content-Type': 'application/json', Authorization: token })
            .then((result) => {
                dispatch(loadChatHistory({ chats: result.body.chats }));
                dispatch(changedChatroom(room));
            })
            .catch((err) => console.log(err));
    };
}

function changedChatroom(room) {
    return {
        type: CHANGE_ROOM,
        currentChatroom: room,
    };
}

function createdChatroom(chatroom) {
    console.log(chatroom);
    return {
        type: CREATE_CHATROOM,
        chatroom: chatroom,
    };
}
