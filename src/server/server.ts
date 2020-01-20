// ----- Imports ----- //

import path from 'path';
import express, { Request, Response as ExpressResponse } from 'express';
import compression from 'compression';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import fetch, { Response } from 'node-fetch';
import bodyParser from 'body-parser';
import {
  BufferedTransport,
  CompactProtocol
} from '@creditkarma/thrift-server-core'

import { Content } from 'mapiThriftModels/Content';
import { getConfigValue } from 'server/ssmConfig';
import { CapiError, capiEndpoint, getContent } from 'capi';
import Page from 'components/shared/page';

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

  const { atoms } = content;

  if (atoms) {
    return { kind: Support.Unsupported, reason: 'The article contains atoms' };
  }

  return { kind: Support.Supported };

}

async function parseMapiError(mapiResponse: Response): Promise<string> {
  try {
    const mapiMsg = (await mapiResponse.json())?.errorMessage;
    return mapiMsg ? `the following message: ${mapiMsg}` : 'no error message';
  } catch (_) {
    return 'a message that I didn\'t understand';
  }
}

const mapiError = async (mapiResponse: Response): Promise<string> =>
  `MAPI wasn't happy about that request, it returned ${mapiResponse.status}, with ${await parseMapiError(mapiResponse)}`;

async function serveArticlePost({ body }: Request, res: ExpressResponse): Promise<void> {
  try {
    const transport = new BufferedTransport(body);
    const protocol = new CompactProtocol(transport);
    const content: Content = Content.read(protocol);

    const support = checkSupport(content);
    const imageSalt = await getConfigValue<string>('apis.img.salt');

    if (support.kind === Support.Supported) {
      const page = h(Page, { content, imageSalt });
      const html = renderToString(page);
      res.write('<!DOCTYPE html>');
      res.write(html);
      res.end();
    } else {
      console.warn(`I can\'t render that type of content yet! ${support.reason}`);
      res.sendStatus(415);
    }
  } catch (e) {
    console.error(`This error occurred, but I don't know why: ${e}`);
    res.sendStatus(500);
  }
}

async function serveArticle(req: Request, res: ExpressResponse): Promise<void> {
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
          const page = h(Page, { content, imageSalt });

          res.write('<!DOCTYPE html>');
          res.write(renderToString(page));
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
}

async function queryMapi(req: Request, res: ExpressResponse): Promise<void> {
  const url = new URL(req.originalUrl, 'https://mobile.code.dev-guardianapis.com');

    console.log(`I'm asking MAPI for this: ${url.href}...`);
    const mapiResponse = await fetch(url.href);

    if (mapiResponse.ok) {
      res.type('json');
      mapiResponse.body.pipe(res);

      console.log('...and I\'ve passed on the response that MAPI gave me');
    } else {
      console.warn(await mapiError(mapiResponse));
      res.sendStatus(400);
    }
}


// ----- App ----- //

const app = express();

app.use('/public', express.static(path.resolve(__dirname, '../public')));
app.use('/assets', express.static(path.resolve(__dirname, '../dist/assets')));
app.use(compression());

app.get('/healthcheck', (_req, res) => {
  res.send("Ok");
});

app.get('/favicon.ico', (_, res) => res.status(404).end());

app.get('/*', async (req, res) => {
  if (req.query.a !== undefined) {
    serveArticle(req, res);
  } else {
    queryMapi(req, res);
  }
});

app.post('/article', bodyParser.raw(), serveArticlePost);

const port = 3040;
app.listen(port, () => console.log(`Server listening on port ${port}!\nWebpack dev server listening on port 8080!`));
