const { log } = require('util');
const fs = require('fs');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
// const webpackConfig = {
//     entry: {
//         'app.browser': ['webpack-hot-middleware/client'],
//     },
//     output: {
//         publicPath: '/dist/',
//     },
//     plugins: [
//         new webpack.HotModuleReplacementPlugin(),
//     ],
// };

// const compiler = webpack(webpackConfig);
const app = express();

// app.use(
//     webpackDevMiddleware(compiler, {
//         publicPath: webpackConfig.output.publicPath,
//         noInfo: true,
//     })
// );

// app.use(webpackHotMiddleware(compiler));

require('@babel/register')({
    only: [/__tools__\/demo|src/],
});

app.get('/', async (req, res) => {
    delete require.cache[require.resolve('../dist/app.server')];

    try {
        res.send(`
        <html>
        <h3>pages</h3>
        <ul>
        ${fs
            .readdirSync(
                path.resolve(__dirname, '../src/pages'),
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
                path.resolve(__dirname, '../src/components'),
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

app.get('/pages/*', async (req, res) => {
    const page = require('../src/server').default;
    const pageType = req.params[0].split('/pages/')[0];
    const data = require(`../.data/${pageType}`);

    try {
        res.send(await page(data));
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