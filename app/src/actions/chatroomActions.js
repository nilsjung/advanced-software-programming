import request from 'superagent';
import { HOST } from '../config/';
import { loadChatHistory } from './messageActions';

const chatroomEndpoint = HOST + 'chatroom/';

export const CHANGE_ROOM = 'changeRoom';
export const CREATE_CHATROOM = 'createChatroom';
export const DELETE_CHATROOM = 'delete-chatroom';

const signedHeader = (token) => {
    return {
        'Content-Type': 'application/json',
        'X-Custom-Authorisation': token,
    };
};

export function getChatroom({ chatroom, token }) {
    return (dispatch) => {
        request
            .get(chatroomEndpoint + chatroom)
            .set(signedHeader(token))
            .then((result) =>
                dispatch(loadChatHistory({ chatroom: result.chats }))
            )
            .catch((err) => console.log(err));
    };
}

export function deleteChatroom({ chatroom, token }) {
    return (dispatch) => {
        request
            .del(chatroomEndpoint + chatroom)
            .set(signedHeader(token))
            .then((res) => {
                dispatch(
                    deletedChatroom({
                        infoMessage: res.body.message,
                        isSuccess: true,
                    })
                );
            })
            .catch((err) => {
                dispatch(
                    deletedChatroom({
                        infoMessage: err.message,
                        isSuccess: false,
                    })
                );
            });
    };
}

export function createChatroom({ chatroom, token }) {
    return (dispatch) => {
        request
            .post(chatroomEndpoint)
            .set(signedHeader(token))
            .send({ chatroom })
            .then((res) => {
                dispatch(createdChatroom({ chatroom: res.body.chatroom }));
            })
            .catch((err) => {
                console.log(err);

                //todo: add error dispatching
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

function deletedChatroom({ infoMessage, isSuccess }) {
    return {
        type: DELETE_CHATROOM,
        infoMessage,
        isSuccess,
    };
}

function createdChatroom({ chatroom }) {
    return {
        type: CREATE_CHATROOM,
        chatroom: chatroom,
    };
}
