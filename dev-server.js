/* eslint-disable global-require,import/no-extraneous-dependencies */

const { log } = require('util');

const path = require('path');
const express = require('express');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const { getPages } = require('./config');

(async () => {
    const webpackConfig = await require('./webpack')();

    const fetch = require('node-fetch');

    const compiler = webpack(webpackConfig);
    const app = express();

    // const getRemoteData = express.Router();
    // getRemoteData.get('/:site/:page', (req, res, next) => {
    //     async (req, res, next) => {
    //         const { html, ...config } = await fetch(
    //             `${req.query.url ||
    //                 'https://www.theguardian.com/world/2013/jun/09/edward-snowden-nsa-whistleblower-surveillance'}.json?guui`,
    //         ).then(article => article.json());

    //         req.body = config;
    //         next();
    //     }
    // });

    app.use(
        '/static',
        express.static(path.join(__dirname, '..', 'src', 'static')),
    );

    app.use(
        webpackDevMiddleware(compiler, {
            serverSideRender: true,
            logLevel: 'silent',
            publicPath: '/assets/javascript/',
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

    app.get(
        '/:site/:page',
        () => async (req, res, next) => {
            const { html, ...config } = await fetch(
                `${req.query.url ||
                    'https://www.theguardian.com/world/2013/jun/09/edward-snowden-nsa-whistleblower-surveillance'}.json?guui`,
            ).then(article => article.json());

            req.body = config;
            next();
        },
        webpackHotServerMiddleware(compiler, {
            chunkName: 'server',
        }),
    );

    app.get('/', () => async (req, res) => {
        try {
            const pages = await getPages();
            res.send(`
        <!DOCTYPE html>
        <html>
        <body>
            <ul>
            ${pages
                .map(page => {
                    const target = page.replace(/sites\/|pages\/|.js$/g, '');
                    return `<li><a href="${target}">${target}</a></li>`;
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

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        res.status(500).send(err.stack);
    });

    app.listen(3000);
})();
