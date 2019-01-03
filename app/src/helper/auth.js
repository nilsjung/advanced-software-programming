export function signHeader(token) {
    return {
        'Content-Type': 'application/json',
        'X-Custom-Authorisation': token,
    };
}
