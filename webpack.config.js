var path = require('path');
var webpack = require('webpack');

var resolve = function(name) {return path.join(__dirname, name) }

module.exports = {
    entry: ['./app/index.js'],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve: {
        alias: {
            '@': resolve("./app"),
            'store': resolve("./app/store")
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
