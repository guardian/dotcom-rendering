const path = require('path');
const express = require('express');
const fetch = require('node-fetch');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const { siteName, root } = require('./config');

const go = async () => {
    const webpackConfig = await require('../webpack/frontend');
    const compiler = await webpack(webpackConfig);

    const app = express();

    app.use(
        `/static/${siteName}`,
        express.static(path.join(root, 'packages', siteName, 'static')),
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
                // tslint:disable-next-line:no-empty
                log: () => {},
            },
        ),
    );

    app.get(
        '/Article',
        async (req, res, next) => {
            try {
                const url = new URL(
                    req.query.url ||
                        'https://www.theguardian.com/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
                );
                const { html, ...config } = await fetch(
                    // Reconstruct the parsed url adding .json?dcr which we need to force dcr to return json
                    `${url.origin}${url.pathname}.json?dcr=true${url.search}`,
                ).then(article => article.json());

                req.body = config;
                next();
            } catch (error) {
                // eslint-disable-next-line @typescript-eslint/tslint/config
                console.error(error);
            }
        },
        webpackHotServerMiddleware(compiler, {
            chunkName: `${siteName}.server`,
        }),
    );

    app.get(
        '/AMPArticle',
        async (req, res, next) => {
            try {
                const url = new URL(
                    req.query.url ||
                        'https://www.theguardian.com/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
                );
                const { html, ...config } = await fetch(
                    // Reconstruct the parsed url adding .json?dcr which we need to force dcr to return json
                    `${url.origin}${url.pathname}.json?dcr=true${url.search}`,
                ).then(article => article.json());

                req.body = config;
                next();
            } catch (error) {
                // eslint-disable-next-line @typescript-eslint/tslint/config
                console.error(error);
            }
        },
        webpackHotServerMiddleware(compiler, {
            chunkName: `${siteName}.server`,
            serverRendererOptions: { amp: true },
        }),
    );

    app.get('/', function(req, res) {
        res.sendFile(
            path.join(root, 'scripts', 'frontend', 'landing', 'index.html'),
        );
    });

    app.get('*', (req, res) => {
        res.redirect('/');
    });

    app.use((err, req, res, next) => {
        res.status(500).send(err.stack);
    });

    app.listen(3030);
};

go();
