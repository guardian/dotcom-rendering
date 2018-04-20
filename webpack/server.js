const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const getEntries = require('./server-entries');
const { dist } = require('../config');

const prod = process.env.NODE_ENV === 'production';

module.exports = async () => ({
    entry: await getEntries(),
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
    plugins: [
        prod &&
            new BundleAnalyzerPlugin({
                reportFilename: path.join(dist, 'server-bundles.html'),
                analyzerMode: 'static',
                openAnalyzer: false,
                logLevel: 'warn',
            }),
    ].filter(Boolean),
});
