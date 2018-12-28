const { siteName } = require('../frontend/config');

module.exports = () => ({
    entry: {
        [`${siteName}.server`]: './packages/frontend/app/server.ts',
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
