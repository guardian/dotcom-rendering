// @flow
const path = require('path');

const moduleConfig = {
    rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        },
    ],
};

const resolveConfig = {
    alias: {
        // some libs expect react, this stops them bundling it
        react: 'preact',
    },
    extensions: ['.js', '.jsx'],
};

module.exports = [
    {
        entry: {
            index: './src/index.jsx',
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js',
            libraryTarget: 'commonjs2',
        },
        module: moduleConfig,
        resolve: resolveConfig,
    },
];
