// ----- Imports ----- //

import path from 'path';
import express from 'express';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import fetch from 'node-fetch';

import { Content } from 'capiThriftModels';
import { getConfigValue } from 'server/ssmConfig';
import { Pillar, pillarFromString } from 'pillar';
import { CapiError, capiEndpoint, getContent } from 'capi';

import Article from 'components/news/article';
import LiveblogArticle from 'components/liveblog/liveblogArticle';
import OpinionArticle from 'components/opinion/opinionArticle';

// ----- Setup ----- //

const defaultId =
  'cities/2019/sep/13/reclaimed-lakes-and-giant-airports-how-mexico-city-might-have-looked';

// ----- Functions ----- //

const enum Support {
  Supported,
  Unsupported,
}

type Supported = {
  kind: Support.Supported;
} | {
  kind: Support.Unsupported;
  reason: string;
}

function checkSupport(content: Content): Supported {

  const { fields, atoms } = content;

  if (fields.displayHint === 'immersive') {
    return { kind: Support.Unsupported, reason: 'The article contains an immersive displayHint' };
  }

  if (atoms) {
    return { kind: Support.Unsupported, reason: 'The article contains atoms' };
  }

  return { kind: Support.Supported };

}

function getArticleComponent(imageSalt: string, capi: Content): React.ReactElement {
  switch (capi.type) {
    case 'article':
        const ArticleComponent = (pillarFromString(capi.pillarId) === Pillar.opinion)
            ? OpinionArticle
            : Article

        return React.createElement(ArticleComponent, { capi, imageSalt });
    case 'liveblog':
      return React.createElement(
        LiveblogArticle,
        { capi, isLive: true, imageSalt }
      );
    default:
      return React.createElement('p', null, `${capi.type} not implemented yet`);
  }
}

// ----- App ----- //

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use('/public', express.static(path.resolve(__dirname, '../public')));
app.use('/assets', express.static(path.resolve(__dirname, '../dist/assets')));
app.use(compression());

app.get('/healthcheck', (_req, res) => {
  res.send("Ok");
});

app.get('/favicon.ico', (_, res) => res.status(404).end());

app.get('/*', async (req, res) => {

  try {

    const articleId = req.params[0] || defaultId;
    const key = await getConfigValue<string>("capi.key");
    const imageSalt = await getConfigValue<string>('apis.img.salt');
    const capiResponse = await fetch(capiEndpoint(articleId, key));

    getContent(capiResponse.status, articleId, await capiResponse.text()).either(
      error => {

        if (error.status === CapiError.NotFound) {

          console.warn(error.message);
          res.sendStatus(404);

        } else {

          console.error(error.message);
          res.sendStatus(500);

        }

      },
      content => {
        const support = checkSupport(content);

        if (support.kind === Support.Supported) {
          const article = getArticleComponent(imageSalt, content);
          const template = ArticleContainer(content, article);
          const html = renderToString(template);
          res.write('<!DOCTYPE html>');
          res.write(html);
          res.end();
        } else {
          console.warn(`I can\'t render that type of content yet! ${support.reason}`);
          res.sendStatus(415);
        }
      }
    )

  } catch (e) {
    console.error(`This error occurred, but I don't know why: ${e}`);
    res.sendStatus(500);
  }

});

const port = 3040;
app.listen(port, () => console.log(`apps-rendering listening on port ${port}!`));
