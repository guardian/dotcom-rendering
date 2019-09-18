import path from 'path';
import fs from 'fs';
import express from 'express';
import compression from 'compression';

import React from 'react';
import { renderToString } from 'react-dom/server';
import fetch from 'node-fetch';

import Article from './dist/components/news/Article';

import { getConfigValue } from './src/utils/ssmConfig';
import { isFeature } from './src/utils/capi';
import { Capi } from './src/types/Capi'

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use("/public", express.static(path.resolve(__dirname, 'public')));
app.use(compression());

// TODO: request less data from capi
const capiEndpoint = (articleId: string, key: string) => `https://content.guardianapis.com/${articleId}?format=json&api-key=${key}&show-elements=all&show-atoms=all&show-fields=all&show-tags=all`;

app.get('/*', (req, res) => {
    try {
        fs.readFile(path.resolve('./src/html/articleTemplate.html'), 'utf8', (err, data) => {
            if (err) {
              console.error(err)
              return res.status(500).send('An error occurred')
            }

            const articleId = req.params[0] || 'cities/2019/sep/13/reclaimed-lakes-and-giant-airports-how-mexico-city-might-have-looked';

            getConfigValue<string>("capi.key")
              .then(key => fetch(capiEndpoint(articleId, key), {}))
              .then(resp => resp.json())
              .then(capi => res.send(generateArticleHtml(capi, data)))
              .catch(error => res.send(`<pre>${error}</pre>`))
          })
    } catch (e) {
        res.status(500).send(`<pre>${e.stack}</pre>`);
    }
});

const generateArticleHtml = (capi: Capi, data: string): string => {
    const { type, fields, elements, tags, atoms } = capi.response.content;

    if (type !== 'article') return `${type} type is not yet supported`;
    if (fields.displayHint === 'immersive') return `Immersive displayHint is not yet supported`;
    if (atoms) return `Atoms not yet supported`;

    const ArticleComponent = getArticleComponent(type);
    const mainImages = elements.filter(elem => elem.relation === 'main' && elem.type === 'image');
    const mainAssets = mainImages.length ? mainImages[0]['assets'] : null;
    const feature = isFeature(tags) || 'starRating' in fields;

    const articleProps: object = {
      ...fields,
      ...capi.response.content,
      feature,
      mainAssets
    };

    const body = renderToString(React.createElement(ArticleComponent, articleProps));

    return data.replace(
        '<div id="root"></div>',
        `<div id="root">${body}</div>`
      )
}

const getArticleComponent = (type: String): React.FunctionComponent<{}> => {
  switch(type) {
    case 'article':
      return Article;
    case 'liveblog':
      return Article;
    default:
      return () => React.createElement('p', null, `${type} not implemented yet`);
  }
}

app.use((err: any, req: any, res: any, next: any) => {
    res.status(500).send(`<pre>${err.stack}</pre>`);
});

app.listen(3040);
