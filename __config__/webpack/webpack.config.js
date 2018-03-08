// @flow
/* eslint-disable global-require,no-console,import/no-dynamic-require */
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');
// https://github.com/survivejs/webpack-merge#smart-merging
const { smart: merge } = require('webpack-merge');

const dist = path.resolve(__dirname, '../../dist');

const config = ({ platform, page }) => {
    const entry =
        platform === 'server'
            ? {
                  app: [
                      'preact-emotion', // force preact-emotion into the vendor chunk
                      './src/server.js',
                  ],
              }
            : {
                  [page]: ['./src/browser.js'],
              };

    return {
        name: platform,
        entry,
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
                {
                    test: /browser\.(js|jsx)$/,
                    loader: 'string-replace-loader',
                    options: {
                        search: '__PAGE__ENTRY__POINT__',
                        replace: `pages/${page}.js`,
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
    };
};

const pages = fs
    .readdirSync(path.resolve(__dirname, '../../src/pages'))
    .map(filename => filename.split('.js')[0]);

const envConfig = require(`./webpack.config.${process.env.NODE_ENV}`)({
    dist,
    pages,
});

module.exports = [
    merge(
        config({ platform: 'server' }),
        {
            target: 'node',
            externals: [require('webpack-node-externals')()],
            output: {
                libraryTarget: 'commonjs2',
            },
        },
        envConfig.server,
    ),
    ...pages.map(page =>
        merge(
            config({
                platform: 'browser',
                page,
            }),
            envConfig.browser,
        ),
    ),
];
