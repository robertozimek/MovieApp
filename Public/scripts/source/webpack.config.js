const webpack = require('webpack');
const path = require('path');

const config = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, '../'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};
module.exports = config;