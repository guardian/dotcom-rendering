import path from 'path';
import fs from 'fs';
import express from 'express';
import compression from 'compression';

import React from 'react';
import { renderToString } from 'react-dom/server';
import fetch from 'node-fetch';

import Article from './dist/components/news/Article';

import { getConfigValue } from './src/utils/ssmConfig';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use("/public", express.static(path.resolve(__dirname, 'public')));
app.use(compression());

const capiEndpoint = (articleId, key) => `https://content.guardianapis.com/${articleId}?format=json&api-key=${key}&show-elements=all&show-atoms=all&show-rights=all&show-fields=all&show-tags=all&show-blocks=all&show-references=all`;

app.get('/*', (req, res) => {
    try {
        fs.readFile(path.resolve('./src/html/articleTemplate.html'), 'utf8', (err, data) => {
            if (err) {
              console.error(err)
              return res.status(500).send('An error occurred')
            }

            const articleId = req.params[0] || 'world/2019/sep/03/hong-kong-protests-carrie-lam-denies-she-considered-resigning';

            getConfigValue<string>("capi.key")
              .then(key => fetch(capiEndpoint(articleId, key)))
              .then(resp => resp.json())
              .then(capi => {
                const { type, fields, elements } = capi.response.content;
                const mainAssets = elements.filter(elem => elem.relation === 'main' && elem.type === 'image')[0]['assets'];
                if (type !== 'article') return res.send(`${type} type is not yet supported`);
                const articleProps = {
                  ...fields,
                  ...capi.response.content,
                  feature: false,
                  mainAssets
                };
                const body = renderToString(React.createElement(Article, articleProps));
                return res.send(
                  data.replace(
                    '<div id="root"></div>',
                    `<div id="root">${body}</div>`
                  )
                )
              })
              .catch(error => res.send(error))
          })
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
});

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).send(`<pre>${err.stack}</pre>`);
});

app.listen(3040);
