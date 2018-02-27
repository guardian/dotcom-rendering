// @flow
/* eslint-disable global-require,import/no-dynamic-require */

const { log } = require('util');
const fs = require('fs');
const path = require('path');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const chalk = require('chalk');

require('@babel/register')({
    only: [/__tools__\/demo|src/],
});

module.exports = {
    browser: {
        devtool: 'cheap-module-eval-source-map',
        entry: {
            demo: './__tools__/demo/demo.browser.js',
            src: './__tools__/demo/src.browser.js',
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
                    const demo = require('../../__tools__/demo/demo.server')
                        .default;
                    try {
                        res.send(demo(req.params[0].split('/demo/')[0]));
                    } catch (e) {
                        log(e);
                    }
                });

                app.get('/src/*', async (req, res) => {
                    const src = require('../../__tools__/demo/src.server').default;
                    try {
                        res.send(src(req.params[0]));
                    } catch (e) {
                        log(e);
                    }
                });

                app.get('/pages/*', async (req, res) => {
                    const page = require('../../src/server').default;
                    const pageType = req.params[0].split('/pages/')[0];
                    const data = require(`../../.data/${pageType}`);

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
                        <h3>pages</h3>
                        <ul>
                        ${fs
                            .readdirSync(
                                path.resolve(__dirname, '../../src/pages'),
                            )
                            .map(page => {
                                const name = page.replace(/.js$/, '');
                                return `<li><a href="/pages/${name}">${name}</a></li>`;
                            })
                            .join('')}
                        </ul>
                        <h3>components</h3>
                        <ul>
                        ${fs
                            .readdirSync(
                                path.resolve(__dirname, '../../src/components'),
                            )
                            .filter(page => page.endsWith('.demo.js'))
                            .map(page => {
                                const name = page.replace(/.demo.js$/, '');
                                return `<li><a href="/demo/components/${name}">${name}</a></li>`;
                            })
                            .join('')}
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
                        )}`,
                    ],
                },
            }),
        ],
    },
    server: {},
};
