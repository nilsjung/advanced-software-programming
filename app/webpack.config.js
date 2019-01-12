/**
 * This is the webpack configuration file
 *
 * tasks:
 * - linting files with esling
 * - compile js/es6
 * - compile sass
 *
 *  TODO: generate fav-icon / compress images / load web fonts / linting files with esling
 */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/** set all the environment variables to pipe into the app */
const ENVIRONMENT = {
    PORT: JSON.stringify(process.env.PORT),
    SERVER_HOST: JSON.stringify(process.env.SERVER_HOST),
    YANDEX_API_KEY: JSON.stringify(process.env.YANDEX_API_KEY),
    DISPLAY_TIME_FORMAT: JSON.stringify(process.env.DISPLAY_TIME_FORMAT),
};

module.exports = {
    mode: 'development',
    entry: {
        app: __dirname + '/src/index.js',
    },

    output: {
        path: __dirname + '/www',
        filename: 'bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                    },
                ],
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function() {
                                return [
                                    require('precss'),
                                    require('autoprefixer'),
                                ];
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/',
                            publicFolder: '../',
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpeg)$/,
                loader: 'url-loader',
            },
        ],
    },

    resolve: {
        extensions: ['.jsx', '.js'],
    },

    plugins: [
        new HtmlWebpackPlugin({ template: __dirname + '/public/index.html' }),
        new CleanWebpackPlugin(['www']),
        new webpack.DefinePlugin({
            process: {
                env: ENVIRONMENT,
            },
        }),
    ],

    devServer: {
        port: process.env.APP_PORT || '3000',
        historyApiFallback: true,
        hot: true,
    },

    devtool: 'inline-source-map',
};
