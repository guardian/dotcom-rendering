// @flow
/* eslint-disable global-require,import/no-dynamic-require */

const { log } = require('util');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const chalk = require('chalk');

require('@babel/register')({
    only: [/util|src/],
});

module.exports = {
    browser: {
        devtool: 'cheap-module-eval-source-map',
        entry: {
            demo: './util/demo/demo.browser.js',
            src: './util/demo/src.browser.js',
        },
        devServer: {
            publicPath: '/assets/javascript/',
            port: 3000,
            overlay: true,
            quiet: true,
            before(app) {
                // always serve the current version
                Object.keys(require.cache).forEach(
                    key => delete require.cache[key],
                );

                app.get('/demo/*', async (req, res) => {
                    const demo = require('./util/demo/demo.server').default;
                    try {
                        res.send(demo(req.params[0].split('/demo/')[0]));
                    } catch (e) {
                        log(e);
                    }
                });

                app.get('/src/*', async (req, res) => {
                    const src = require('./util/demo/src.server').default;
                    try {
                        res.send(src(req.params[0]));
                    } catch (e) {
                        log(e);
                    }
                });

                app.get('/', async (req, res) => {
                    const page = require('./src/app/server').default;
                    try {
                        res.send(page({ page: 'article' }));
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
                        )}\n    Currently serving a dummy article page`,
                    ],
                    notes: [
                        chalk.dim(
                            'To work on a specific componentent:\n    http://localhost:3000/demo/components/{MyComponent}',
                        ),
                    ],
                },
            }),
        ],
    },
    server: {},
};
