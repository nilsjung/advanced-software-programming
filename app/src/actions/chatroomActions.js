import request from 'superagent';
import { HOST } from '../config/';
import { loadChatHistory } from './messageActions';
import { showPopup, isSuccess } from './helper';
import { signHeader } from '../helper/auth';
import { createChatId } from '../helper/chat';

const chatroomEndpoint = HOST + 'chatroom/';
const userChatEndpoint = HOST + 'userchat/';

export const CHANGE_ROOM = 'change-chatroom';
export const CREATE_CHATROOM = 'create-chatroom';
export const UPDATE_CHATROOMS = 'update-chatrooms';
export const DELETE_CHATROOM = 'delete-chatroom';
export const CREATE_USERCHAT = 'create-userchat';

/**
 * This unzips the error message from the current response error
 * TODO: remove this function. it is also defined in `actions/helper/responseHelper.js`
 *
 * @param {Object} err The http response error
 * @returns the error message string recieved from the server
 */
const getResponseError = (err) => {
    return err.message || err.response.body.message;
};

/**
 * Recieves the chatrooms stored on the server
 *
 * @param {Object} param0 containing the token
 */
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

/**
 * recieves the chatroom information for one chatroom by the given chatroom-name
 * @param {Object} param0 containing the chatroom to recieve and the json web token
 */
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

/**
 * delete the given chatroom on the server.
 * dispatches the result array of chatrooms to the store
 *
 * @param {Object} param0
 */
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

/**
 * adds a user to a chatroom as member
 *
 * @param {Object} param0 object containing the chatroom, token and userid
 */
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

/**
 * creates a chatroom and dispatches the result chatroom to the store.
 *
 * @param {*} param0 object containing the chatroom, user and token
 */
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

/**
 * creates a user chat on the server and dispatches the result to the sotre.
 *
 * TODO extract userchats
 *
 * @param {*} param0 object containing users and the token
 */
export function createUserChat({ users, token }) {
    const chatId = createChatId(users);
    return (dispatch) => {
        request
            .post(userChatEndpoint)
            .set(signHeader(token))
            .send({ users, chatId })
            .then((res) => {
                dispatch(createdUserChat({ userchat: res.body.userchat }));
                dispatch(openUserChat(chatId, []));
                dispatch(isSuccess(true));
            })
            .catch((err) => {
                dispatch(isSuccess(false));
                dispatch(showPopup(getResponseError(err)));
            });
    };
}

/**
 * Changes the messages of the chatroom to display
 *
 * // TODO make consistent parameter with other actions
 * @param {Object} room
 * @param {string} token
 */
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

/**
 * Loads the history for the userchat to display.
 *
 * @param {string} id the user id
 * @param {string} token jwt
 */
export function openUserChat(id, token) {
    return (dispatch) => {
        request
            .get(userChatEndpoint + id)
            .set(signHeader(token))
            .then((result) => {
                dispatch(loadChatHistory({ chats: result.body.chats }));
                dispatch(isSuccess(true));
                dispatch(changedChatroom(id));
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
