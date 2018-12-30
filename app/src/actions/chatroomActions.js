import request from 'superagent';
import { HOST } from '../config/';
import { loadChatHistory } from './messageActions';
import { showPopup, isSuccess } from './helperAction';
import { signHeader } from '../helper/auth';
import { createChatId } from '../helper/chat';

const chatroomEndpoint = HOST + 'chatroom/';
const userChatEndpoint = HOST + 'userchat/';

export const CHANGE_ROOM = 'change-chatroom';
export const CREATE_CHATROOM = 'create-chatroom';
export const UPDATE_CHATROOMS = 'update-chatrooms';
export const DELETE_CHATROOM = 'delete-chatroom';
export const CREATE_USERCHAT = 'create-userchat';

const getResponseError = (err) => {
    return err.message || err.response.body.message;
};

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

export function createUserChat({ users, token }) {
    const chatId = createChatId(users);
    return (dispatch) => {
        request
            .post(userChatEndpoint)
            .set(signHeader(token))
            .send({ users, chatId })
            .then((res) => {
                dispatch(createdUserChat({ userchat: res.body.userchat }));
            })
            .catch((err) => {});
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

export function openUserChat(id, chats) {
    return (dispatch) => {
        dispatch(loadChatHistory({ chats: chats }));
        dispatch(isSuccess(true));
        dispatch(changedChatroom(id));
    };
}

function changedChatroom(room) {
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

function createdUserChat({ userchat }) {
    return {
        type: CREATE_USERCHAT,
        userchat: userchat,
    };
}
