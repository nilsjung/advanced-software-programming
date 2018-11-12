module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "plugins": ["mocha"],
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2016,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true
        },
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};