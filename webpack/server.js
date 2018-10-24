const entryFile = require.resolve('@guardian/rendering/server.tsx');
const { siteName } = require('../config');

module.exports = () => ({
    entry: {
        [`${siteName}.server`]: entryFile,
    },
    output: {
        filename: `[name].js`,
        chunkFilename: `[name].js`,
        libraryTarget: 'commonjs2',
        pathinfo: true,
    },
    target: 'node',
    optimization: {
        minimize: false,
        namedModules: true,
        runtimeChunk: false,
    },
    externals: [
        require('webpack-node-externals')({
            whitelist: [/^@guardian/],
        }),
        (context, request, callback) =>
            /manifest\.json$/.test(request)
                ? callback(null, `commonjs ${request}`)
                : callback(),
    ],
});
