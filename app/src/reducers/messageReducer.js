/**
 * adds the new message to the store. updates the current message field.
 *
 * @param {*} state
 * @param {*} action
 */
export function messagesReducer(state, action) {
    let messages = state.messages.map((message) => ({ ...message }));
    messages.push({ ...action.message });

    return { ...state, messages, currentMessage: '' };
}

/**
 * updates the current message.
 *
 * **TODO** make current message to component state of message input.
 * @param {*} state
 * @param {*} action
 */
export function updateMessageReducer(state, action) {
    return { ...state, currentMessage: action.message };
}
