// @flow
/* eslint-disable no-console */
import path from 'path';
import { readdirSync, readFileSync } from 'fs';

import webpack from 'webpack';
import WebpackOnBuildPlugin from 'on-build-webpack';
import filesizegzip from 'filesizegzip';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

module.exports = ({ dist }: { dist: string }) => ({
    browser: {
        devtool: 'source-map',
        plugins: [
            new WebpackOnBuildPlugin(() => {
                readdirSync(path.join(__dirname, 'dist'))
                    .filter(
                        file =>
                            !file.endsWith('.map') && file.includes('browser'),
                    )
                    .forEach(file => {
                        console.log(
                            `${file} ${filesizegzip(
                                readFileSync(path.join(dist, file), 'utf8'),
                                true,
                            )}`,
                        );
                    });
            }),
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
                defaultSizes: 'gzip',
                reportFilename: path.join(dist, 'ui.bundle.browser.stats.html'),
                analyzerMode: 'static',
                openAnalyzer: false,
            }),
        ],
    },
    server: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.optimize.OccurrenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: true,
                mangle: false,
                beautify: true,
                comments: true,
            }),
        ],
    },
});
