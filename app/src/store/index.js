const initialState = {
    isAuthenticated: false,
    user: {
        userId: '',
        email: '',
        firstname: '',
        lastname: '',
        password: '',
    },
    messages: [],
    currentMessage: '',
    hasErrored: null,
    isLoading: null,
    infoMessage: '',
    isSuccess: null,
}

export default initialState;