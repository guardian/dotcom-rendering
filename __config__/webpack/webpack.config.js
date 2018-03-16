// @flow
/* eslint-disable global-require,no-console,import/no-dynamic-require */

const webpack = require('webpack');
// https://github.com/survivejs/webpack-merge#smart-merging
const { smart: merge } = require('webpack-merge');

const { pages, injectPage } = require('./helpers');
const { dist } = require('./paths');

const config = ({ platform }) => ({
    name: platform,
    output: {
        path: dist,
        filename: `[name].${platform}.js`,
        chunkFilename: `[name].${platform}.js`,
        publicPath: '/assets/javascript/',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new webpack.ProvidePlugin({
            h: ['preact', 'h'],
        }),
    ],
    stats: 'errors-only',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { envName: `app:${platform}` },
                },
            },
        ],
    },
    resolve: {
        alias: {
            // for libs that expect React
            react: 'preact',
        },
    },
});

const envConfig = require(`./webpack.config.${process.env.NODE_ENV}`);

module.exports = [
    merge(
        config({ platform: 'server' }),
        {
            entry: {
                app: ['./src/server.js'],
            },
            target: 'node',
            externals: [require('webpack-node-externals')()],
            output: {
                libraryTarget: 'commonjs2',
                pathinfo: true,
            },
        },
        envConfig.server,
    ),
    merge(
        config({
            platform: 'browser',
        }),
        {
            entry: pages.reduce(
                (entries, page) => ({
                    [page]: injectPage(page),
                    ...entries,
                }),
                {},
            ),
        },
        envConfig.browser,
    ),
];
