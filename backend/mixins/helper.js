module.exports = (val) => {
    if (val !== undefined && val !== null && val !== '') {
        return true;
    } else {
        return false;
    }
}