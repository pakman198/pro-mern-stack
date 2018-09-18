const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        // the key will be the file name. 
        // if entry is a string instead of an object, the name by default is main
        app: './src/App.js'
    },
    output: {
        path: path.resolve(__dirname, 'static'),
        filename: '[name].bundle.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                  test: /[\\/]node_modules[\\/](react|react-dom|whatwg-fetch)[\\/]/,
                  name: 'vendor',
                  chunks: 'all',
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    devServer: {
        port: 8000,
        contentBase: 'static',
        proxy: {
            '/api/*' : {
                target: 'http://localhost:3000'
            }
        }
    }
}