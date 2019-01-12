/**
 *
 * @param {string} token jwt to authenticat at the backend
 * @returns the http header for the authentication at the backend
 */
export function signHeader(token) {
    return {
        'Content-Type': 'application/json',
        'X-Custom-Authorisation': token,
    };
}
