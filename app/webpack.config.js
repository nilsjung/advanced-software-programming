/**
 * This is the webpack configuration file
 *
 * tasks:
 * - linting files with eslint
 * - compile js/es6
 * - compile sass
 *
 *  TODO: generate fav-icon / compress images / load web fonts
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: __dirname + '/src/index.js',
    },

    output: {
        path: __dirname + '/www',
        filename: 'bundle.js',
    },

    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: 'eslint-loader',
                options: {
                    path: __dirname + '/node_modules/.bin/eslint'
                },
            }, {
                loader: 'babel-loader'
            }],
        },{
            test: /\.(scss)$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'postcss-loader',
                options: {
                    plugins: function() {
                        return [
                            require('precss'),
                            require('autoprefixer'),
                        ]
                    }
                },
            }, {
                loader: 'sass-loader',
            }]
        }],
    },

    resolve: {
        extensions: ['.jsx', '.js'],
    },

    plugins: [
        new HtmlWebpackPlugin({ template: __dirname + '/public/index.html'}),
        new CleanWebpackPlugin(['www']),
    ],

    devServer: {
        port: '3000',
    },

    devtool: 'source-map'
}