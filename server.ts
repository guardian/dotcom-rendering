import path from 'path';
import fs from 'fs';
import express from 'express';
import compression from 'compression';

import React from 'react';
import { renderToString } from 'react-dom/server';
import fetch from 'node-fetch';

import Article from './src/components/news/Article';

import { getConfigValue } from './src/utils/ssmConfig';
import { isFeature } from './src/utils/capi';
import { Capi } from './src/types/Capi'

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use("/public", express.static(path.resolve(__dirname, '../public')));
app.use(compression());

// TODO: request less data from capi
const capiEndpoint = (articleId: string, key: string): string => `https://content.guardianapis.com/${articleId}?format=json&api-key=${key}&show-elements=all&show-atoms=all&show-fields=all&show-tags=all`;

const generateArticleHtml = (capi: Capi, data: string): string => {
  const { type, fields, elements, tags, atoms, webPublicationDate } = capi.response.content;

  if (fields.displayHint === 'immersive') return `Immersive displayHint is not yet supported`;
  if (atoms) return `Atoms not yet supported`;

  const mainImages = elements.filter(elem => elem.relation === 'main' && elem.type === 'image');
  const mainAssets = mainImages.length ? mainImages[0]['assets'] : null;
  const feature = isFeature(tags) || 'starRating' in fields;

  const articleProps = {
    ...fields,
    ...capi.response.content,
    webPublicationDate,
    feature,
    mainAssets
  };

  const getArticleComponent = (type: string): React.ReactElement => {
    switch(type) {
      case 'article':
        return React.createElement(Article, articleProps); 
      case 'liveblog':
        return React.createElement(Article, articleProps); 
      default:
        return React.createElement('p', null, `${type} not implemented yet`);
    }
  }

  const body = renderToString(getArticleComponent(type));

  return data.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div>`
    )
}

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

app.listen(3040);
