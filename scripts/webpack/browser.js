const webpack = require('webpack');
const AssetsManifest = require('webpack-assets-manifest');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const chalk = require('chalk');
const { siteName } = require('../frontend/config');

const friendlyErrorsWebpackPlugin = new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
        messages: [
            `DEV server running at ${chalk.blue.underline(
                'http://localhost:3030',
            )}`,
        ],
    },
});

const PROD = process.env.NODE_ENV === 'production';
const DEV = process.env.NODE_ENV === 'development';

const name = PROD ? `[name].[chunkhash].js` : `[name].js`;

// used to stop multiple compilers overwriting other compiler's data
const manifestData = {};

module.exports = ({ page }) => ({
    entry: {
        [`${siteName}.${page.toLowerCase()}`]: [
            DEV &&
                'webpack-hot-middleware/client?name=browser&overlayWarnings=true',
            './packages/frontend/web/browser/boot.ts',
        ].filter(Boolean),
    },
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
        PROD &&
            new AssetsManifest({
                writeToDisk: true,
                assets: manifestData,
            }),
        DEV && new webpack.HotModuleReplacementPlugin(),
        DEV && new webpack.NamedModulesPlugin(),
        DEV && friendlyErrorsWebpackPlugin,
    ].filter(Boolean),
});
