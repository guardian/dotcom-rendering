const path = require('path');
const webpack = require('webpack');

const rootConfig = {
    entry: {
        document: './packages/guui/document.js',
        grid: './packages/guui/grid.js',
        htmlTemplate: './packages/guui/htmlTemplate.js',
        index: './packages/guui/index.js',
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '..', 'packages', 'guui', 'dist'),
        library: 'guui',
        libraryTarget: 'commonjs2',
    },
};

module.exports = {
    mode: 'production',
    ...rootConfig,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
    plugins: [
        new webpack.IgnorePlugin(/.\/manifest.json/),
    ]
};