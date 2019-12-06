// ----- Imports ----- //

import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import express, { Response } from 'express';
import compression from 'compression';
import React from 'react';
import { renderToString } from 'react-dom/server';
import fetch, { Response as FetchResponse } from 'node-fetch';

import { fromUnsafe, Result, Ok, Err } from 'types/result';
import { Content } from 'capiThriftModels';
import Article from 'components/news/article';
import LiveblogArticle from 'components/liveblog/liveblogArticle';
import { getConfigValue } from 'server/ssmConfig';
import { Capi, parseCapi, capiEndpoint, parseCapiError } from 'capi';


// ----- Setup ----- //

const defaultId =
  'cities/2019/sep/13/reclaimed-lakes-and-giant-airports-how-mexico-city-might-have-looked';
const readFileP = promisify(fs.readFile);
const templateFile = './src/articleTemplate.html';


// ----- Functions ----- //

const id = <A>(a: A): A => a;

function getContent(capi: Capi): Result<string, Content> {

  const content = capi.response.content;
  const { fields, atoms } = content;

  if (fields.displayHint === 'immersive') {
    return new Err('Immersive displayHint is not yet supported');
  }

  if (atoms) {
    return new Err('Atoms not yet supported');
  }

  return new Ok(content);

}

const getArticleComponent = (imageSalt: string) =>
  function ArticleComponent(capi: Content): React.ReactElement {
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

const generateArticleHtml = (capiResponse: string, imageSalt: string) =>
  (data: string): Result<string, string> =>
    parseCapi(capiResponse)
      .andThen(capi => fromUnsafe(() => getContent(capi), 'Unexpected CAPI response structure'))
      .andThen(id)
      .map(getArticleComponent(imageSalt))
      .map(renderToString)
      .map(body => data.replace('<div id="root"></div>', `<div id="root">${body}</div>`))

async function readTemplate(): Promise<Result<string, string>> {
  try {
    const data = await readFileP(path.resolve(templateFile), 'utf8');
    return new Ok(data);
  } catch (_) {
    return new Err('Could not read template file');
  }
}

function renderArticle(template: Result<string, string>, imageSalt: string) {

  return async (capiResponse: FetchResponse): Promise<Result<string, string>> => {
    const capiData = await capiResponse.text();

    return template.andThen(generateArticleHtml(capiData, imageSalt));
  };

}

async function capiError(capiResponse: FetchResponse): Promise<string> {

  return parseCapiError(await capiResponse.text())
    .either(
      parseError => `Problem talking to CAPI. Received a ${capiResponse.status}, and I'm not sure why because: ${parseError}.`,
      capiError => `When I tried to talk to CAPI I received a ${capiResponse.status}. ${capiError}`,
    );

  }

function sendError(res: Response, message: string): void {
  console.error(message);
  res.status(500).end();
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

    switch (capiResponse.status) {
      case 200:

        (await renderArticle(template, imageSalt)(capiResponse)).either(
          err => sendError(res, `Failed to render the article because: ${err}`),
          html => res.send(html),
        );

        break;
      
      case 404:
        console.warn(`Request for a resource that CAPI does not recognise: ${req.params[0]}`);
        res.status(404).end();
        break;
      
      default:
        sendError(res, await capiError(capiResponse));
    }

  } catch (e) {
    sendError(res, `This error occurred, but I don't know why: ${e}`);
  }

});

app.listen(3040);
