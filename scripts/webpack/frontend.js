const path = require('path');
const webpack = require('webpack');
const {
    promisify,
    inspect
} = require('util');
const glob = promisify(require('glob'));
const {
    smart: merge
} = require('webpack-merge');
const {
    BundleAnalyzerPlugin
} = require('webpack-bundle-analyzer');
const ReportBundleSize = require('./plugins/report-bundle-size');
const {
    root,
    dist,
    siteName
} = require('../frontend/config');

const PROD = process.env.NODE_ENV === 'production';

const commonConfigs = ({
    platform
}) => ({
    name: platform,
    mode: process.env.NODE_ENV,
    output: {
        publicPath: '/assets/',
        path: dist,
    },
    stats: 'errors-only',
    devtool: process.env.NODE_ENV === 'production' ?
        'sourcemap' : 'cheap-module-eval-source-map',
    resolve: {
        alias: {
            '@root': path.resolve(__dirname, '.'),
            '@frontend': path.resolve(__dirname, 'src'),
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        PROD && !process.env.HIDE_BUNDLES && new ReportBundleSize(),
        PROD &&
        new BundleAnalyzerPlugin({
            reportFilename: path.join(dist, `${platform}-bundles.html`),
            analyzerMode: 'static',
            openAnalyzer: false,
            logLevel: 'warn',
        }),
        // https://www.freecodecamp.org/forum/t/algorithm-falsy-bouncer-help-with-how-filter-boolean-works/25089/7
        // [...].filter(Boolean) why it is used
    ].filter(Boolean),
});

const page = 'Article'; // TODO: remove
module.exports = [
    // server bundle config
    merge(
        commonConfigs({
            platform: 'server',
        }),
        require(`./server`)(),
    ),
    // browser bundle configs
    merge(
        commonConfigs({
            platform: 'browser',
        }),
        require(`./browser`)({
            page,
            isLegacyJS: false,
        }),
    ),
    // TODO: ignore static files for legacy compliation
    merge(
        commonConfigs({
            platform: 'browser.legacy',
        }),
        require(`./browser`)({
            page,
            isLegacyJS: true,
        }),
    ),
];
