// @flow
/* eslint-disable global-require,no-console */
import path from 'path';
import webpackMerge from 'webpack-merge';

console.log(''); // just a spacer for console sweetness

const baseConfig = {
    output: {
        path: path.join(__dirname, 'dist'),
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

const browserConfig = {
    entry: './index.browser.js',
    output: {
        filename: 'app.browser.js',
    },
    target: 'web',
};

const serverConfig = {
    entry: './index.server.js',
    output: {
        filename: 'app.server.js',
    },
    target: 'node',
};

module.exports = (env: { prod?: boolean, dev?: boolean } = { prod: true }) => {
    const envConfig = env.prod
        ? require('./webpack.config.prod')({
              dist: baseConfig.output.path,
              bundleName: browserConfig.output.filename,
          })
        : require('./webpack.config.dev')({ stats: baseConfig.stats });

    const config = webpackMerge.multiple(
        {
            browser: webpackMerge.smart(baseConfig, browserConfig),
            server: webpackMerge.smart(baseConfig, serverConfig),
        },
        envConfig,
    );

    return config;
};
