// @flow
/* eslint-disable no-console */
const path = require('path');

const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ReportBundleSize = require('../../__tools__/report-bundle-size');
const Progress = require('simple-progress-webpack-plugin');
const AssetsManifest = require('webpack-assets-manifest');

const { dist } = require('./paths');

const reportBundleSize = new ReportBundleSize({ configCount: 2 });

module.exports = {
    browser: {
        output: {
            filename: `[name].[chunkhash].js`,
            chunkFilename: `[name].[chunkhash].js`,
        },
        plugins: [
            new webpack.HashedModuleIdsPlugin(),
            new BundleAnalyzerPlugin({
                reportFilename: path.join(dist, 'browser-bundles.html'),
                analyzerMode: 'static',
                openAnalyzer: false,
                logLevel: 'warn',
            }),
            new AssetsManifest({ writeToDisk: true }),
            !process.env.CI &&
                new Progress({
                    format: 'compact',
                }),
            reportBundleSize,
        ].filter(Boolean),
    },
    server: {
        plugins: [
            reportBundleSize,
            new BundleAnalyzerPlugin({
                reportFilename: path.join(dist, 'server-bundle.html'),
                analyzerMode: 'static',
                openAnalyzer: false,
                logLevel: 'warn',
            }),
        ],
    },
};
