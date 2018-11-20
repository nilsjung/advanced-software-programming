import request from 'superagent';
import {HOST} from '../config/';

const loginEndpoint = HOST + 'chatroom/';

export const CHANGE_ROOM = 'changeRoom';
export const CREATE_CHATROOM = 'createChatroom';


export function createChatroom({chatroom, token}) {
    console.log(token)
    return (dispatch) => {
        request
            .post(loginEndpoint)
            .set({'Content-Type': 'application/json', 'Authorization': token})
            .send({chatroom})
            .then( res => {
                console.log(res)
                dispatch(createdChatroom({chatroom: res.body.chatroom}));
            })
            .catch( err => {
                console.log(err)
                //todo: add error dispatching
            });
    }
}

export function changeChatroom(room) {
    return (dispatch) => {
        dispatch(changedChatroom(room));
    }
}

function changedChatroom(room) {
    return {
        type: CHANGE_ROOM,
        currentChatroom: room,
    }
}

function createdChatroom({chatroom}) {
    return {
        type: CREATE_CHATROOM,
        chatroom: chatroom
    }
}
