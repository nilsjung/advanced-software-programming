
export function setUserIdReducer(state, action) {
    let user = action.user

    return {...state, user};
}