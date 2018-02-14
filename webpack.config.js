// @flow
/* eslint-disable global-require,no-console */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const Progress = require('simple-progress-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const babelLoader = env => ({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: { envName: env },
    },
});

const baseConfig = {
    output: {
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    },
    stats: 'errors-only',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new webpack.NamedModulesPlugin(),
        production &&
            new Progress({
                format: 'compact',
            }),
    ].filter(Boolean),
};

const envConfig = production
    ? require('./webpack.config.prod')({
          dist: baseConfig.output.path,
          bundleName: 'app.browser.js',
      })
    : require('./webpack.config.dev');

const serverConfig = () =>
    merge.smart(
        baseConfig,
        {
            entry: {
                'app.server': './src/app/index.server.js',
            },
            module: {
                rules: [babelLoader('app:server')],
            },
            target: 'node',
            externals: [require('webpack-node-externals')()],
        },
        envConfig.server,
    );

const browserConfig = () =>
    merge.smart(
        baseConfig,
        {
            entry: {
                'app.browser': './src/app/index.browser.js',
            },
            module: {
                rules: [babelLoader('app:browser')],
            },
        },
        envConfig.browser,
    );

module.exports = ({ browser = false, server = false } = {}) => {
    if (browser) return browserConfig();
    if (server) return serverConfig();
    return [browserConfig(), serverConfig()];
};
