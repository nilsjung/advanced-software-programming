module.exports = {
    extends: ['eslint:recommended', 'plugin:node/recommended'],
    env: {
        browser: false,
        node: true,
        es6: true,
    },
    parserOptions: {
        acmaVersion: 8,
    },
};
