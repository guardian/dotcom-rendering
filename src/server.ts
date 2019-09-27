import path from 'path';
import fs from 'fs';
import express from 'express';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import fetch from 'node-fetch';

import Article, { ArticleProps } from 'components/news/Article';
import LiveblogArticle from 'components/liveblog/LiveblogArticle';

import { getPillarStyles } from 'styles';

import { getConfigValue } from 'utils/ssmConfig';
import { isFeature, parseCapi } from 'utils/capi';
import { fromUnsafe, Result, Ok, Err } from 'types/Result';
import { Tag } from 'types/Capi';

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use("/public", express.static(path.resolve(__dirname, '../public')));
app.use(compression());

// TODO: request less data from capi
const capiEndpoint = (articleId: string, key: string): string =>
  `https://content.guardianapis.com/${articleId}?format=json&api-key=${key}&show-elements=all&show-atoms=all&show-fields=all&show-tags=all&show-blocks=all`;

interface CapiFields {
  type: string;
  articleProps: ArticleProps;
};

const id = <A>(a: A): A => a;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkForUnsupportedContent(capi: any): Result<string, void> {

  const { fields, atoms } = capi.response.content;

  if (fields.displayHint === 'immersive') {
    return new Err('Immersive displayHint is not yet supported');
  }

  if (atoms) {
    return new Err('Atoms not yet supported');
  }

  return new Ok(undefined);

}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const capiFields = (capi: any): Result<string, CapiFields> =>
  fromUnsafe(() => {

    const { type, fields, elements, tags, webPublicationDate, pillarId } = capi.response.content;
    const bodyElements = capi.response.content.blocks.body[0].elements;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mainImages = elements.filter((elem: any) => elem.relation === 'main' && elem.type === 'image');
    const mainAssets = mainImages.length ? mainImages[0]['assets'] : null;
    const feature = isFeature(tags) || 'starRating' in fields;
    const pillarStyles = getPillarStyles(pillarId);
    const contributors = tags.filter((tag: Tag) => tag.type === 'contributor');
    const [series] = tags.filter((tag: Tag) => tag.type === 'series');

    return {
      type,
      articleProps: {
        ...fields,
        ...capi.response.content,
        webPublicationDate,
        feature,
        mainAssets,
        bodyElements,
        pillarStyles,
        contributors,
        series
      },
    };
  }, 'Unexpected CAPI response structure');


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fieldsFromCapi(capi: any): Result<string, CapiFields> {

  return fromUnsafe(() => checkForUnsupportedContent(capi), 'Unexpected CAPI response structure')
    .andThen(id)
    .andThen(() => capiFields(capi));

}

const getArticleComponent = (capiFields: CapiFields): React.ReactElement => {
  switch (capiFields.type) {
    case 'article':
      return React.createElement(Article, capiFields.articleProps);
    case 'liveblog':
      return React.createElement(LiveblogArticle, {...capiFields.articleProps, isLive: true});
    default:
      return React.createElement('p', null, `${capiFields.type} not implemented yet`);
  }
}

const generateArticleHtml = (capiResponse: string, data: string): string =>
  parseCapi(capiResponse)
    .andThen(fieldsFromCapi)
    .map(getArticleComponent)
    .map(renderToString)
    .map(body => data.replace('<div id="root"></div>', `<div id="root">${body}</div>`))
    .either(id, id);

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
        .then(resp => resp.text())
        .then(capi => res.send(generateArticleHtml(capi, data)))
        .catch(error => res.send(`<pre>${error}</pre>`))
    })
  } catch (e) {
    res.status(500).send(`<pre>${e.stack}</pre>`);
  }
});

app.listen(3040);
