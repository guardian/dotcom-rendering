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
        devtool: 'source-map',
        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.HashedModuleIdsPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                parallel: true,
            }),
            new BundleAnalyzerPlugin({
                reportFilename: path.join(dist, 'browser-stats.html'),
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
        devtool: 'source-map',
        plugins: [
            reportBundleSize,
            new BundleAnalyzerPlugin({
                reportFilename: path.join(dist, 'server-stats.html'),
                analyzerMode: 'static',
                openAnalyzer: false,
                logLevel: 'warn',
            }),
        ],
    },
};
