//@flow
const path = require('path');

module.exports = [
    {
        entry: {
            h: './src/h.jsx',
        },
        output: {
            path: __dirname,
            filename: '[name].js',
            library: 'h',
            libraryTarget: 'commonjs2',
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
    },
    {
        entry: {
            index: './src/index.js',
        },
        output: {
            path: __dirname,
            filename: '[name].js',
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
    }
];
