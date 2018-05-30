const webpack = require('webpack');
const AssetsManifest = require('webpack-assets-manifest');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const chalk = require('chalk');

const friendlyErrorsWebpackPlugin = new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
        messages: [
            `DEV server running at ${chalk.blue.underline(
                'http://localhost:3000',
            )}`,
        ],
    },
});

const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';

const name = PROD ? `[name].[chunkhash].js` : `[name].js`;

module.exports = {
    output: {
        filename: name,
        chunkFilename: name,
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /node_modules/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
    plugins: [
        PROD && new AssetsManifest({ writeToDisk: true }),
        DEV && new webpack.HotModuleReplacementPlugin(),
        DEV && new webpack.NamedModulesPlugin(),
        DEV && friendlyErrorsWebpackPlugin,
    ].filter(Boolean),
};
