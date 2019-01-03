export const getResponseError = (err) => {
    return err.response.body.message || err.message;
};
