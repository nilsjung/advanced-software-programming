import request from 'superagent';
import { signHeader } from '../helper/auth';
import { createChatId } from '../helper/chat';
import {
    changedChatroom,
    CREATE_USERCHAT,
    UPDATE_USER_CHAT,
    userChatEndpoint,
} from './chatroomActions';
import { isSuccess, showPopup, getResponseError } from './helper';
import { loadChatHistory } from './messageActions';

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

export function getUserChats({ token }) {
    return (dispatch) => {
        request
            .get(userChatEndpoint)
            .set(signHeader(token))
            .then((result) => {
                dispatch(updateUserChats(result.body.chats));
                dispatch(isSuccess(true));
            })
            .catch((err) => {
                dispatch(isSuccess(false));
                dispatch(showPopup(getResponseError(err)));
            });
    };
}

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

function createdUserChat({ userchat }) {
    return {
        type: CREATE_USERCHAT,
        userchat: userchat,
    };
}

function updateUserChats(userchats) {
    return {
        type: UPDATE_USER_CHAT,
        userchats: userchats,
    };
}
