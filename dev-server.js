/* eslint-disable global-require,import/no-extraneous-dependencies,no-console */

const path = require('path');
const express = require('express');
const fetch = require('node-fetch');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');
const inquirer = require('inquirer');
const chalk = require('chalk');

const { getSites, getPagesForSite, root } = require('./config');

const pickSite = async () => {
    const sites = await getSites();
    if (sites.length === 1) return sites[0];
    return inquirer
        .prompt([
            {
                type: 'list',
                message: 'Which site do you want to run?',
                choices: sites,
                name: 'site',
            },
        ])
        .then(({ site }) => {
            console.log(`Starting DEV server for ${chalk.cyan(site)}...`);
            return site;
        });
};

const go = async site => {
    const webpackConfig = await require('./webpack');
    const compiler = await webpack(webpackConfig);

    const app = express();

    app.use(
        '/static/:site',
        express.static(path.join(root, 'sites', site, 'static')),
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
        `/${site}/:page`,
        async (req, res, next) => {
            const { html, ...config } = await fetch(
                `${req.query.url ||
                    'https://www.theguardian.com/world/2013/jun/09/edward-snowden-nsa-whistleblower-surveillance'}.json?guui`,
            ).then(article => article.json());

            req.body = config;
            next();
        },
        webpackHotServerMiddleware(compiler, {
            chunkName: `${site}.server`,
        }),
    );

    app.get(`/${site}`, async (req, res) => {
        const pages = await getPagesForSite(site);
        const pageList = pages.map(
            page =>
                `<li><a href="${site}/${page}"><code>${page}</code></a></li>`,
        );
        res.send(`
        <!DOCTYPE html>
        <html>
        <body>
            <pre>Pages for ${site}:</pre>
            ${pageList.join('\n')}
        </body>
        </html>
        `);
    });

    app.get('*', (req, res) => {
        res.redirect(`/${site}`);
    });

    // eslint-disable-next-line no-unused-vars
    app.use((err, req, res, next) => {
        res.status(500).send(err.stack);
    });

    app.listen(3000);
};

pickSite().then(go);
