export const deleteChatroomReducer = (state, action) => {
    return {
        ...state,
        chatrooms: action.chatrooms,
    };
};

export const createChatroomReducer = (state, action) => {
    const newChatrooms = Object.create(state.chatrooms);
    newChatrooms.push(action.chatroom);
    return { ...state, chatrooms: newChatrooms };
};

export const createUserChatReducer = (state, action) => {
    const newChatrooms = Array.from(state.userchats);
    newChatrooms.push(action.userchat);
    return { ...state, userchats: newChatrooms };
};
