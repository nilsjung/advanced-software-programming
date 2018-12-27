import { onlinestatus } from '../config';

const initialState = {
    isAuthenticated: false,
    user: {
        userId: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        onlinestatus: onlinestatus.OFFLINE,
    },
    messages: [],
    currentMessage: '',
    isLoading: null,
    infoMessage: '',
    isSuccess: null,
    accessToken: '',
    chatrooms: [],
    currentChatroom: '',
};

export default initialState;
