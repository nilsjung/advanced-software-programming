/**
 * checks if a value is NOT undefined or null.
 *
 * @param {*} val the value to check
 * @returns true, if the value is defined, false otherwise.
 */
const defined = (val) => {
    if (val !== undefined && val !== null && val !== '') {
        return true;
    } else {
        return false;
    }
};

module.exports = defined;
