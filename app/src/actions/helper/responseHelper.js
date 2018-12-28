export const signHeader = (token) => {
    return {
        'Content-Type': 'application/json',
        'X-Custom-Authorisation': token,
    };
};

export const getResponseError = (err) => {
    return err.response.body.message || err.message;
};
