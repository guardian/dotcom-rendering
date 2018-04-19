const webpack = require('webpack');
const AssetsManifest = require('webpack-assets-manifest');
const getEntries = require('./browser-entries');

const prod = process.env.NODE_ENV === 'production';
const dev = process.env.NODE_ENV === 'development';

const hotReload = entries =>
    Object.entries(entries).reduce(
        (hotReloadEntries, [entry, bundles]) => ({
            [entry]: ['webpack-hot-middleware/client', ...bundles],
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
        ].filter(Boolean),
    };
};
