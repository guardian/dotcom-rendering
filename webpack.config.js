// @flow
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
            h: './src/h.jsx',
        },
        output: {
            path: __dirname,
            filename: '[name].js',
            library: 'h',
            libraryTarget: 'commonjs2',
        },
        module: moduleConfig,
        resolve: resolveConfig,
    },
    {
        entry: {
            index: './src/index.jsx',
        },
        output: {
            path: __dirname,
            filename: '[name].js',
            libraryTarget: 'commonjs2',
        },
        module: moduleConfig,
        resolve: resolveConfig,
    },
];
