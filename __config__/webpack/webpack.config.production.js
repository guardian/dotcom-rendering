// @flow
/* eslint-disable no-console */
const path = require('path');

const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ReportBundleSize = require('../../__tools__/report-bundle-size');
const Progress = require('simple-progress-webpack-plugin');

module.exports = ({ dist }) => ({
    browser: {
        devtool: 'source-map',
        plugins: [
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: module =>
                    module.context && module.context.includes('node_modules'),
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                parallel: true,
            }),
            new BundleAnalyzerPlugin({
                reportFilename: path.join(dist, `app.browser.stats.html`),
                analyzerMode: 'static',
                openAnalyzer: false,
                logLevel: 'warn',
            }),
            new Progress({
                format: 'compact',
            }),
            new ReportBundleSize(),
        ].filter(Boolean),
    },
    server: {},
});
