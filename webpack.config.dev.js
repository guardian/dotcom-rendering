// @flow
/* eslint-disable global-require,import/no-dynamic-require */

import { log } from 'util';
import webpack from 'webpack';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import chalk from 'chalk';

import demo from './util/demo/app.server';
import component from './util/demo/component.server';

export default {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        app: './util/demo/app.browser.js',
        component: './util/demo/component.browser.js',
    },
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
            app.get('/component/*', async (req, res) => {
                try {
                    res.send(component(req.params[0]));
                } catch (e) {
                    log(e);
                }
            });
        },
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin({
            compilationSuccessInfo: {
                messages: [
                    `DEV server running at ${chalk.blue.underline(
                        'http://localhost:3000',
                    )}`,
                ],
                notes: [
                    chalk.dim(
                        'http://localhost:3000/src/components/{MyComponentPath}',
                    ),
                ],
            },
        }),
        new webpack.NamedModulesPlugin(),
    ],
};
