// @flow
/* eslint-disable no-console */
const path = require('path');

const webpack = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Progress = require('simple-progress-webpack-plugin');

module.exports = ({ dist, bundleName }) => ({
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
        }),
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
        new Progress({
            format: 'compact',
        }),
    ],
});
