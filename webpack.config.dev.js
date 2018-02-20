// @flow
/* eslint-disable global-require,import/no-dynamic-require */

const { log } = require('util');
const fs = require('fs');
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const chalk = require('chalk');

require('@babel/register')({
    only: [/__dev|src/],
});

module.exports = {
    browser: {
        devtool: 'cheap-module-eval-source-map',
        entry: {
            demo: './__dev/demo/demo.browser.js',
            src: './__dev/demo/src.browser.js',
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
                    const demo = require('./__dev/demo/demo.server').default;
                    try {
                        res.send(demo(req.params[0].split('/demo/')[0]));
                    } catch (e) {
                        log(e);
                    }
                });

                app.get('/src/*', async (req, res) => {
                    const src = require('./__dev/demo/src.server').default;
                    try {
                        res.send(src(req.params[0]));
                    } catch (e) {
                        log(e);
                    }
                });

                app.get('/pages/*', async (req, res) => {
                    const page = require('./src/app/server').default;
                    const pageType = req.params[0].split('/pages/')[0];
                    const data = require(`./__dev/data/${pageType}`).default;
                    try {
                        res.send(page(data));
                    } catch (e) {
                        log(e);
                    }
                });

                app.get('/', async (req, res) => {
                    try {
                        res.send(`
                        <html>
                        <ul>
                        ${fs
                            .readdirSync(
                                path.resolve(__dirname, 'src', 'pages'),
                            )
                            .map(
                                page =>
                                    `<a href="/pages/${page}">pages/${page}</a>`,
                            )}
                        </ul>
                        </html>
                        `);
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
                            'To demo/dev a specific component:\n    http://localhost:3000/demo/components/{MyComponent}',
                        ),
                    ],
                },
            }),
        ],
    },
    server: {},
};
