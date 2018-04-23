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

const prod = process.env.NODE_ENV === 'production';
const dev = process.env.NODE_ENV === 'development';

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
    const name =
        process.env.NODE_ENV === 'production'
            ? `[name].[chunkhash].js`
            : `[name].js`;

    const entries = await getEntries();

    return {
        entry:
            process.env.NODE_ENV === 'development'
                ? hotReload(entries)
                : entries,
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
            prod && new AssetsManifest({ writeToDisk: true }),
            dev && new webpack.HotModuleReplacementPlugin(),
            dev && new webpack.NamedModulesPlugin(),
            dev && friendlyErrorsWebpackPlugin,
        ].filter(Boolean),
    };
};
