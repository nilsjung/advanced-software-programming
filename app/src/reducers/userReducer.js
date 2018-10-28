
export function setUserIdReducer(state, action) {
    let user = {...state.user};
    user.userId = action.userId;

    return {...state, user};
}