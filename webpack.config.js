var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './app/index.js'],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        alias: {
            '@': path.join(__dirname,"./app"),
        },
        extensions: ['', '.js', '.json'],
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js?$/,
                exclude: /(node_modules)/,
                query: {
                    presets: 'es2015'
                }
            },
            {
                loader: 'url-loader',
                test: /\.(png|jpg|jpeg|gif)$/,
                limit: 10000,
            },
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, ''),
        compress: true,
        port: 10086,
        host: 'localhost',
        disableHostCheck: true
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        colors: true
    },
}
