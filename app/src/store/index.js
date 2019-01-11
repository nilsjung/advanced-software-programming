const initialState = {
    isAuthenticated: false,
    user: {
        userId: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        onlinestatus: '',
    },
    messages: [],
    currentMessage: '',
    isLoading: null,
    infoMessage: '',
    isSuccess: null,
    accessToken: '',
    chatrooms: [],
    userchats: [],
    currentChatroom: '',
    users: [],
    selectedUsers: [],
};

export default initialState;
