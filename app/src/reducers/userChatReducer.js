export const updateUserChatsReducer = (state, action) => {
    return { ...state, userchats: action.userchats };
};

export const createUserChatReducer = (state, action) => {
    const newChatrooms = Array.from(state.userchats);
    newChatrooms.push(action.userchat);
    return { ...state, userchats: newChatrooms };
};
