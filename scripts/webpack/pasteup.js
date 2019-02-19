const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        breakpoints: './packages/pasteup/breakpoints.ts',
        typography: './packages/pasteup/typography.ts',
        mixins: './packages/pasteup/mixins.ts',
        palette: './packages/pasteup/palette.ts',
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
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
};
