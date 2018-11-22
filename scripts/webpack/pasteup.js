const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        breakpoints: './packages/pasteup/breakpoints.js',
        fonts: './packages/pasteup/fonts.js',
        mixins: './packages/pasteup/mixins.js',
        palette: './packages/pasteup/palette.js',
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, '..', '..', 'packages', 'pasteup', 'dist'),
        library: 'pasteup',
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
