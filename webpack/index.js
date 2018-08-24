const path = require('path');
const webpack = require('webpack');
const { smart: merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ReportBundleSize = require('../lib/report-bundle-size');
const Progress = require('../lib/webpack-progress');
const { root, dist, siteName, getPagesForSite } = require('../config');

const PROD = process.env.NODE_ENV === 'production';

const reportBundleSize = new ReportBundleSize();
const progress = new Progress();

const common = ({ platform, page = '' }) => ({
    name: platform,
    mode: process.env.NODE_ENV,
    output: {
        publicPath: '/assets/',
        path: dist,
    },
    stats: 'errors-only',
    devtool:
        process.env.NODE_ENV === 'production'
            ? 'sourcemap'
            : 'cheap-module-eval-source-map',
    module: {
        rules: [
            {
                test: /\.[j|t]sx*$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'string-replace-loader',
                        options: {
                            multiple: [
                                {
                                    search: '__PAGE__',
                                    replace: page,
                                    flags: 'g',
                                },
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader'],
            },
            {
                test: /\.svg$/,
                use: ['desvg-loader/react', 'svg-loader'],
            },
            {
                // make sure webpack tree-shakes this stuff
                // https://webpack.js.org/guides/tree-shaking/#mark-the-file-as-side-effect-free
                include: [
                    path.resolve(root, 'packages', 'guui'),
                    path.resolve(root, 'packages', 'pasteup'),
                ],
                sideEffects: false,
            },
        ],
    },
    plugins: [
        new webpack.ProvidePlugin({
            React: 'react',
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
        !process.env.TEAMCITY && progress(`${siteName}.${platform}.${page}`),
        PROD && !process.env.HIDE_BUNDLES && reportBundleSize,
        PROD &&
            new BundleAnalyzerPlugin({
                reportFilename: path.join(dist, `${platform}-bundles.html`),
                analyzerMode: 'static',
                openAnalyzer: false,
                logLevel: 'warn',
            }),
    ].filter(Boolean),
});

module.exports = getPagesForSite()
    .then(pages => [
        // server bundle config
        merge(
            require(`./server`)(),
            common({
                platform: 'server',
            }),
        ),

        // browser bundle configs
        ...pages.map(page =>
            merge(
                require(`./browser`)({ page }),
                common({
                    platform: 'browser',
                    page,
                }),
            ),
        ),
    ])
    // flatten the nested page configs:
    // [site, [page1]] => [site, page1]
    .then(configs => [].concat(...configs));
