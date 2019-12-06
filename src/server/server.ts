// ----- Imports ----- //

import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import express from 'express';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import fetch from 'node-fetch';

import { Result, Ok, Err } from 'types/result';
import { Content } from 'capiThriftModels';
import Article from 'components/news/article';
import LiveblogArticle from 'components/liveblog/liveblogArticle';
import { getConfigValue } from 'server/ssmConfig';
import { CapiError, capiEndpoint, getContent } from 'capi';


// ----- Setup ----- //

const defaultId =
  'cities/2019/sep/13/reclaimed-lakes-and-giant-airports-how-mexico-city-might-have-looked';
const readFileP = promisify(fs.readFile);
const templateFile = './src/articleTemplate.html';


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
      return React.createElement(Article, { capi, imageSalt });
    case 'liveblog':
      return React.createElement(
        LiveblogArticle,
        { capi, isLive: true, imageSalt }
      );
    default:
      return React.createElement('p', null, `${capi.type} not implemented yet`);
  }
}

async function readTemplate(): Promise<Result<string, string>> {
  try {
    const data = await readFileP(path.resolve(templateFile), 'utf8');
    return new Ok(data);
  } catch (_) {
    return new Err('Could not read template file');
  }
}


// ----- App ----- //

const app = express();

app.use(express.json({ limit: '50mb' }));
app.use('/public', express.static(path.resolve(__dirname, '../public')));
app.use('/assets', express.static(path.resolve(__dirname, '../dist/assets')));
app.use(compression());

app.get('/favicon.ico', (_, res) => res.status(404).end());

app.get('/*', async (req, res) => {

  try {

    const articleId = req.params[0] || defaultId;
    const template = await readTemplate();
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
          const html = renderToString(article);

          template
            .map(file => file.replace('<div id="root"></div>', `<div id="root">${html}</div>`))
            .map(document => res.send(document));
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

app.listen(3040);
