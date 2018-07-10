const path = require('path');

module.exports = {
    mode: 'production',
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
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
};