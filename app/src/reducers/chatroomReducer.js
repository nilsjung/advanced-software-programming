/**
 * update the chatroom after deletion.
 * **TODO:** replace this with the `updateChatroomReducer`
 *
 * @param {*} state
 * @param {*} action
 */
export const deleteChatroomReducer = (state, action) => {
    return {
        ...state,
        chatrooms: action.chatrooms,
    };
};

/**
 * adds a new chatroom to the store
 * @param {*} state
 * @param {*} action
 */
export const createChatroomReducer = (state, action) => {
    const newChatrooms = Object.create(state.chatrooms);
    newChatrooms.push(action.chatroom);
    return { ...state, chatrooms: newChatrooms };
};

/**
 * adds a new userchat to the store
 * @param {*} state
 * @param {*} action
 */
export const createUserChatReducer = (state, action) => {
    const newChatrooms = Array.from(state.userchats);
    newChatrooms.push(action.userchat);
    return { ...state, userchats: newChatrooms };
};

/**
 * updates the chatrooms after manipulating with information from the server.
 * @param {*} state
 * @param {*} action
 */
export const updateChatroomsReducer = (state, action) => {
    return { ...state, chatrooms: action.chatrooms };
};
