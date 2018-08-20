/* eslint-disable global-require,import/no-extraneous-dependencies,no-console */

const path = require('path');
const express = require('express');
const fetch = require('node-fetch');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const { siteName, getPagesForSite, root } = require('./config');

const go = async () => {
    const webpackConfig = await require('./webpack');
    const compiler = await webpack(webpackConfig);

    const app = express();

    app.use(
        `/static/${siteName}`,
        express.static(path.join(root, siteName, 'static')),
    );

    app.use(
        webpackDevMiddleware(compiler, {
            serverSideRender: true,
            logLevel: 'silent',
            publicPath: '/assets/javascript/',
            ignored: [/node_modules([\\]+|\/)+(?!@guardian)/],
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
        `/${siteName}/:page`,
        async (req, res, next) => {
            const { html, ...config } = await fetch(
                `${req.query.url ||
                    'https://www.theguardian.com/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software'}.json?guui`,
            ).then(article => article.json());

            req.body = config;
            next();
        },
        webpackHotServerMiddleware(compiler, {
            chunkName: `${siteName}.server`,
        }),
    );

    app.get(`/${siteName}`, async (req, res) => {
        const pages = await getPagesForSite();
        const pageList = pages.map(
            page =>
                `<li><a href="${siteName}/${page}"><code>${page}</code></a></li>`,
        );
        res.send(`
        <!DOCTYPE html>
        <html>
        <body>
            <pre>Pages for ${siteName}:</pre>
            ${pageList.join('\n')}
        </body>
        </html>
        `);
    });

    app.get('*', (req, res) => {
        res.redirect(`/${siteName}`);
    });

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        res.status(500).send(err.stack);
    });

    app.listen(3000);
};

go();
