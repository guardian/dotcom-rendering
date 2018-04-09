// @flow

const path = require('path');
const express = require('express');
// eslint-disable-next-line import/no-unresolved
const pagesMiddleware = require('../dist/server').default;
const { dist } = require('../__config__/webpack/paths');

const app = express();

app.use(express.json({ limit: '50mb' }));

app.use('/static', express.static(path.join(__dirname, '..', 'src', 'static')));
app.use('/assets/javascript', express.static(dist));

app.use('/pages/:page', [pagesMiddleware()]);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    res.status(500).send(err.stack);
});

app.listen(9000);
