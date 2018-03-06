// @flow
/* eslint-disable global-require,import/no-extraneous-dependencies */

const { log } = require('util');
const fs = require('fs');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const webpackConfig = require('../__config__/webpack/webpack.config')();

const compiler = webpack(webpackConfig);
const app = express();

app.use(
    webpackDevMiddleware(compiler, {
        serverSideRender: true,
        logLevel: 'silent',
    }),
);

app.use(
    webpackHotMiddleware(
        compiler.compilers.find(config => config.name === 'browser'),
        {
            // https://www.npmjs.com/package/friendly-errors-webpack-plugin#turn-off-errors
            log: () => {},
        },
    ),
);

app.get('/', (req, res) => {
    try {
        res.send(`
        <!DOCTYPE html>
        <html>
        <body>
            <ul>
            ${fs
                .readdirSync(path.resolve(__dirname, '../src/pages'))
                .map(page => {
                    const name = page.replace(/.js$/, '');
                    return `<li><a href="/pages/${name.toLowerCase()}">${name}</a></li>`;
                })
                .join('')}
            </ul>
        </body>
        </html>
        `);
    } catch (e) {
        log(e);
    }
});

app.get(
    '/pages/:page',
    webpackHotServerMiddleware(compiler, {
        chunkName: 'app',
    }),
);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(500).send(err.stack);
});

app.listen(3000);
