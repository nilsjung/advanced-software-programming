module.exports = {
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    plugins: ['react'],
    parser: 'babel-eslint',
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    rules: {
        'react/prop-types': 0,
    },
};
