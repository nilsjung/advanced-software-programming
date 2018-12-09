export const deleteChatroomReducer = (state, action) => {
    return {
        ...state,
        isSuccess: action.isSuccess,
        infoMessage: action.infoMessage,
    };
};

export const createChatroomReducer = (state, action) => {
    const newChatrooms = Object.create(state.chatrooms);
    newChatrooms.push(action.chatroom);
    return { ...state, chatrooms: newChatrooms };
};
