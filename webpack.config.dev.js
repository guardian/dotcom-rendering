// @flow
/* eslint-disable global-require,import/no-dynamic-require */

import { log } from 'util';
import webpack from 'webpack';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

import demo from './util/demo/index.server';

export default {
    devtool: 'cheap-module-eval-source-map',
    entry: './util/demo/index.browser.js',
    devServer: {
        publicPath: '/assets/javascript/',
        port: 3000,
        overlay: true,
        quiet: true,
        before(app: any) {
            app.get('/src/*', async (req, res) => {
                try {
                    res.send(demo(req.params[0]));
                } catch (e) {
                    log(e);
                }
            });
        },
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: ['Running in DEV mode at http://localhost:3000'],
            },
        }),
        new webpack.NamedModulesPlugin(),
    ],
};
