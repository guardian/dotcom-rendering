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
    }),
);

app.use(
    webpackHotMiddleware(
        compiler.compilers.find(config => config.name === 'browser'),
    ),
);

require('@babel/register')({
    only: [/__tools__\/demo|src/],
});

app.get('/', async (req, res) => {
    try {
        res.send(`
        <html>
        <h3>pages</h3>
        <ul>
        ${fs
            .readdirSync(path.resolve(__dirname, '../src/pages'))
            .map(page => {
                const name = page.replace(/.js$/, '');
                return `<li><a href="/pages/${name.toLowerCase()}">${name}</a></li>`;
            })
            .join('')}
        </ul>
        <h3>components</h3>
        <ul>
        ${fs
            .readdirSync(path.resolve(__dirname, '../src/components'))
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

app.get(
    '/pages/*',
    webpackHotServerMiddleware(compiler, {
        chunkName: 'app',
    }),
);

app.get('/demo/*', async (req, res) => {
    const demo = require('./demo/demo.server').default;
    try {
        res.send(demo(req.params[0].split('/demo/')[0]));
    } catch (e) {
        log(e);
    }
});

app.get('/src/*', async (req, res) => {
    const src = require('./demo/src.server').default;
    try {
        res.send(src(req.params[0]));
    } catch (e) {
        log(e);
    }
});



// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(500).send(err.stack);
});

app.listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Rendering dev server listening on port 3000\n');
});
