// @flow
/* eslint-disable no-console */
const path = require('path');

const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ReportBundleSize = require('./__util/report-bundle-size');
const Progress = require('simple-progress-webpack-plugin');

module.exports = ({ dist, bundleName }) => ({
    browser: {
        devtool: 'source-map',
        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                parallel: true,
            }),
            new BundleAnalyzerPlugin({
                reportFilename: path.join(
                    dist,
                    `${bundleName.replace(/.js/, '')}.stats.html`,
                ),
                analyzerMode: 'static',
                openAnalyzer: false,
                logLevel: 'warn',
            }),

            !process.env.CI &&
                new Progress({
                    format: 'compact',
                }),
            !process.env.CI && new ReportBundleSize(),
        ].filter(Boolean),
    },
    server: {},
});
