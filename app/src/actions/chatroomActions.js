import request from 'superagent';
import { HOST } from '../config/';
import { loadChatHistory } from './messageActions';
import { showPopup, isSuccess } from './helperAction';

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
            .catch((err) => {
                dispatch(showPopup('Can not load chatrooms: ' + err));
            });
    };
}

export function createChatroom({ chatroom, token }) {
    return (dispatch) => {
        request
            .post(chatroomEndpoint)
            .set({ 'Content-Type': 'application/json', Authorization: token })
            .send({ chatroom })
            .then((err, res) => {
                console.log(err);
                dispatch(createdChatroom({ chatroom: res.body.chatroom }));
                dispatch(showPopup(res.body.message));
                dispatch(isSuccess(true));
            })
            .catch((err) => {
                dispatch(isSuccess(false));
                dispatch(
                    showPopup(
                        'An error occured while creating a chatroom: ' +
                            err.response
                    )
                );
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
                dispatch(isSuccess(true));
                dispatch(changedChatroom(room));
            })
            .catch((err) => {
                dispatch(isSuccess(false));
                dispatch(showPopup('Error while changing room: ' + err));
            });
    };
}

function changedChatroom(room) {
    return {
        type: CHANGE_ROOM,
        currentChatroom: room,
    };
}

function createdChatroom({ chatroom }) {
    return {
        type: CREATE_CHATROOM,
        chatroom: chatroom,
    };
}
