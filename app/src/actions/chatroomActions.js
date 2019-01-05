import request from 'superagent';
import { HOST } from '../config/';
import { signHeader } from '../helper/auth';
import { isSuccess, showPopup, getResponseError } from './helper';
import { loadChatHistory } from './messageActions';

const chatroomEndpoint = HOST + 'chatroom/';
export const userChatEndpoint = HOST + 'userchat/';

export const CHANGE_ROOM = 'change-chatroom';
export const CREATE_CHATROOM = 'create-chatroom';
export const UPDATE_CHATROOMS = 'update-chatrooms';
export const DELETE_CHATROOM = 'delete-chatroom';
export const CREATE_USERCHAT = 'create-userchat';
export const UPDATE_USER_CHAT = 'update-userchat';

export function getChatrooms({ token }) {
    return (dispatch) => {
        request
            .get(chatroomEndpoint)
            .set(signHeader(token))
            .then((result) => {
                dispatch(updateChatrooms(result.body.chatrooms));
                dispatch(isSuccess(true));
            })
            .catch((err) => {
                dispatch(isSuccess(false));
                dispatch(showPopup(getResponseError(err)));
            });
    };
}

export function getChatroom({ chatroom, token }) {
    return (dispatch) => {
        request
            .get(chatroomEndpoint + chatroom)
            .set(signHeader(token))
            .then((result) =>
                dispatch(loadChatHistory({ chatroom: result.chats }))
            )
            .catch((err) => {
                dispatch(showPopup(getResponseError(err)));
            });
    };
}

export function deleteChatroom({ chatroom, token }) {
    return (dispatch) => {
        request
            .del(chatroomEndpoint + chatroom)
            .set(signHeader(token))
            .then((res) => {
                dispatch(deletedChatroom({ chatrooms: res.body.chatrooms }));
                dispatch(isSuccess(true));
                dispatch(showPopup(res.body.message));
            })
            .catch((err) => {
                dispatch(isSuccess(false));
                dispatch(showPopup(getResponseError(err)));
            });
    };
}

export function addUserToChatroom({ chatroom, token, userid }) {
    return (dispatch) => {
        request
            .post(chatroomEndpoint + chatroom + '/user')
            .set(signHeader(token))
            .send({ userid: userid })
            .then((res) => {
                dispatch(isSuccess(true));
                dispatch(showPopup(res.body.message));
            })
            .catch((err) => {
                dispatch(isSuccess(false));
                dispatch(showPopup(getResponseError(err)));
            });
    };
}

export function createChatroom({ chatroom, user, token }) {
    const users = [];
    users.push(user);
    return (dispatch) => {
        request
            .post(chatroomEndpoint)
            .set(signHeader(token))
            .send({ chatroom, users })
            .then((res) => {
                dispatch(createdChatroom({ chatroom: res.body.chatroom }));
                dispatch(showPopup(res.body.message));
                dispatch(isSuccess(true));
            })
            .catch((err) => {
                dispatch(isSuccess(false));
                dispatch(showPopup(getResponseError(err)));
            });
    };
}

export function changeChatroom(room, token) {
    return (dispatch) => {
        request
            .get(chatroomEndpoint + room)
            .set(signHeader(token))
            .then((result) => {
                dispatch(loadChatHistory({ chats: result.body.chats }));
                dispatch(isSuccess(true));
                dispatch(changedChatroom(room));
            })
            .catch((err) => {
                dispatch(isSuccess(false));
                dispatch(showPopup(getResponseError(err)));
            });
    };
}

function updateChatrooms(chatrooms) {
    return {
        type: UPDATE_CHATROOMS,
        chatrooms: chatrooms,
    };
}

export function changedChatroom(room) {
    return {
        type: CHANGE_ROOM,
        currentChatroom: room,
    };
}

function deletedChatroom({ chatrooms }) {
    return {
        type: DELETE_CHATROOM,
        chatrooms,
    };
}

function createdChatroom({ chatroom }) {
    return {
        type: CREATE_CHATROOM,
        chatroom: chatroom,
    };
}
