// @flow
/* eslint-disable global-require */
import path from 'path';
import webpackMerge from 'webpack-merge';

const baseConfig = {
    entry: {
        app: './index.browser.js',
        'app.server': './index.server.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        forceEnv: 'production',
                    },
                },
            },
        ],
    },
    stats: {
        assets: false,
        cached: false,
        cachedAssets: false,
        children: false,
        chunks: false,
        chunkModules: false,
        chunkOrigins: false,
        depth: false,
        entrypoints: false,
        exclude: [],
        hash: false,
        modules: false,
        moduleTrace: false,
        performance: false,
        providedExports: false,
        publicPath: false,
        reasons: false,
        source: false,
        timings: false,
        version: false,

        // show these...
        colors: true,
        errors: true,
        errorDetails: true,
        warnings: true,
    },
};

module.exports = (env: { prod?: boolean, dev?: boolean } = { prod: true }) =>
    webpackMerge.smart(
        baseConfig,
        env.prod
            ? require('./webpack.config.prod')({ dist: baseConfig.output.path })
            : require('./webpack.config.dev')({ stats: baseConfig.stats }),
    );
