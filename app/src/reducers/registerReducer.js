export function registrationIsLoading(state, action) {
    return { ...state, isLoading: action.isLoading };
}
