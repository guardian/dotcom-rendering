//@flow
const path = require('path');

module.exports = {
    entry: './src/h.jsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'h.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};
