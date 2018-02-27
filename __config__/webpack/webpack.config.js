// @flow
/* eslint-disable global-require,no-console */
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

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
        path: path.join(__dirname, 'dist'),
    },
    stats: 'errors-only',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        new webpack.NamedModulesPlugin(),
    ],
};

const envConfig = production
    ? require('./webpack.config.prod')({
          dist: baseConfig.output.path,
          bundleName: 'app.browser.js',
      })
    : require('./webpack.config.dev');

const platformConfig = platform =>
    merge.smart(
        {
            entry: { app: `./src/${platform}.js` },
            output: {
                filename: `[name].${platform}.js`,
                chunkFilename: `[name].${platform}.js`,
            },
            module: {
                rules: [babelLoader(`app:${platform}`)],
            },
        },
        envConfig[platform],
    );

const browserConfig = merge.smart(baseConfig, platformConfig('browser'));
const serverConfig = merge.smart(
    baseConfig,
    {
        target: 'node',
        externals: [require('webpack-node-externals')()],
    },
    platformConfig('server'),
);

module.exports = ({ browser = false, server = false } = {}) => {
    if (browser) return browserConfig;
    if (server) return serverConfig;
    return [browserConfig, serverConfig];
};
