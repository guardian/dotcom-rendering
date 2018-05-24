const webpack = require('webpack');
const AssetsManifest = require('webpack-assets-manifest');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const chalk = require('chalk');
const getEntries = require('./browser-entries');

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

const hotReload = entries =>
    Object.entries(entries).reduce(
        (hotReloadEntries, [entry, bundles]) => ({
            [entry]: [
                'webpack-hot-middleware/client?name=browser&overlayWarnings=true',
                ...bundles,
            ],
            ...hotReloadEntries,
        }),
        {},
    );

module.exports = async () => {
    const name = PROD
        ? `javascript/[name].[chunkhash].js`
        : `javascript/[name].js`;
    const entries = await getEntries();

    return {
        entry: DEV ? hotReload(entries) : entries,
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
};
