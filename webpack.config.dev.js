// @flow
/* eslint-disable global-require,import/no-dynamic-require */

import { log } from 'util';

import demo from './util/dev.server';

const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

export default {
    // devtool: 'cheap-module-eval-source-map',
    entry: './util/dev.browser.js',
    devServer: {
        publicPath: '/assets/javascript/',
        port: 3000,
        overlay: true,
        quiet: true,
        before(app: any) {
            app.get('/src/*', async (req, res) => {
                try {
                    // make sure each reload is a fresh rendering
                    Object.keys(require.cache).forEach(
                        key => delete require.cache[key],
                    );
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
    ],
};
