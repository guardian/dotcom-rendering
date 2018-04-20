const webpack = require('webpack');
const { smart: merge } = require('webpack-merge');

const common = ({ platform }) => ({
    name: platform,
    mode: process.env.NODE_ENV,
    output: {
        publicPath: '/assets/javascript/',
        path: require('../config').dist,
    },
    devtool:
        process.env.NODE_ENV === 'production'
            ? 'sourcemap'
            : 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: ['desvg-loader/preact', 'svg-loader'],
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            h: ['preact', 'h'],
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    resolve: {
        alias: {
            // for libs that expect React
            react: 'preact',
        },
    },
});

module.exports = Promise.all(
    ['browser', 'server'].map(async platform =>
        merge(
            common({
                platform,
            }),
            await require(`./${platform}`)(),
        ),
    ),
);
