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

    app.get(
        '/AMPArticle',
        async (req, res, next) => {
            try {
                const [article, epicContent] = await Promise.all([
                    fetch(
                        `${req.query.url ||
                            'http://localhost:9000/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software'}.json?guui`,
                    ),
                    fetch(
                        `https://interactive.guim.co.uk/docsdata/1fy0JolB1bf1IEFLHGHfUYWx-niad7vR9K954OpTOvjE.json`,
                    ), // epic content url
                ]);

                const articleJson = await article.json();

                const epicJson = await epicContent.json();

                const articleAndEpic = {
                    ...articleJson,
                    ...{ epic: epicJson.sheets.control },
                };

                req.body = articleAndEpic;

                next();
            } catch (err) {
                return err;
            }
        },
        webpackHotServerMiddleware(compiler, {
            chunkName: `${siteName}.server`,
            serverRendererOptions: { amp: true },
        }),
    );

    app.get('/', (req, res) => {
        res.send(`
            <!DOCTYPE html>
            <html>
            <body>
                <ul>
                    <li><a href="/Article">Article</a></li>
                    <li><a href="/AMPArticle">⚡️Article</a></li>
                </ul>
            </body>
            </html>
        `);
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
