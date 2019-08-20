import path from 'path';
import fs from 'fs';
import express from 'express';
import compression from 'compression';

import React from 'react';
import { renderToString } from 'react-dom/server';

import HeaderImageCaption from './dist/HeaderImageCaption';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'))
app.use(compression());

app.get('/', (req, res) => {
    try {
        fs.readFile(path.resolve('./src/html/articleTemplate.html'), 'utf8', (err, data) => {
            if (err) {
              console.error(err)
              return res.status(500).send('An error occurred')
            }
            
            const body = renderToString(React.createElement(HeaderImageCaption));

            return res.send(
              data.replace(
                '<div id="root"></div>',
                `<div id="root">${body}</div>`
              )
            )
          })
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
});

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).send(`<pre>${err.stack}</pre>`);
});

app.listen(3040);
