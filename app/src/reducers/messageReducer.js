export function messagesReducer(state, action) {
    let messages = state.messages.map((message) => ({ ...message }));
    messages.push({ ...action.message });

    return {...state, messages};

}

export function addMessageReducer(state, action) {
    return {...state, currentMessage: ''}
}

export function updateMessageReducer(state, action) {
    return {...state, currentMessage: action.message}
}