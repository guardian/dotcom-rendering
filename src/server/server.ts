// ----- Imports ----- //

import path from 'path';
import express, {NextFunction, Request, Response as ExpressResponse} from 'express';
import compression from 'compression';
import { renderToString } from 'react-dom/server';
import bodyParser from 'body-parser';
import {
  BufferedTransport,
  CompactProtocol
} from '@creditkarma/thrift-server-core'
import fetch from 'node-fetch';

import { Response as CapiResponse } from 'mapiThriftModels/Response';
import { Content as MapiContent, IContent as Content } from 'mapiThriftModels/Content';
import { getConfigValue } from 'server/ssmConfig';
import { CapiError, capiEndpoint, getContent } from 'capi';
import Page from 'components/shared/page';
import { ErrorResponse } from 'mapiThriftModels';
import { logger } from 'logger';
import {App, Stack, Stage} from "./appIdentity";

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

function getPrefetchHeader(resources: string[]): string {
  return resources.reduce((linkHeader, resource) => linkHeader + `<${resource}>; rel=prefetch,`, '');
}

function checkSupport({ atoms }: Content): Supported {
  if (atoms) {
    return { kind: Support.Unsupported, reason: 'The article contains atoms' };
  }

  return { kind: Support.Supported };
}

async function serveArticlePost(
    { body }: Request,
    res: ExpressResponse,
    next: NextFunction
): Promise<void> {
  try {
      const transport = new BufferedTransport(body);
      const protocol = new CompactProtocol(transport);
      const content: MapiContent = MapiContent.read(protocol);
      const support = checkSupport(content);
      const imageSalt = await getConfigValue<string>('apis.img.salt');

    if (support.kind === Support.Supported) {
      const { resources, element } = Page({ content, imageSalt });
      const html = renderToString(element);
      res.set('Link', getPrefetchHeader(resources));
      res.write('<!DOCTYPE html>');
      res.write(html);
      res.end();
    } else {
      logger.warn(`I can\'t render that type of content yet! ${support.reason}`);
      res.sendStatus(415);
    }
  } catch (e) {
    logger.error(`This error occurred, but I don't know why: ${e}`);
    next(e);
  }
}

async function serveArticle(req: Request, res: ExpressResponse): Promise<void> {
  try {
    const articleId = req.params[0] || defaultId;
    const key = await getConfigValue<string>("capi.key");
    const imageSalt = await getConfigValue<string>('apis.img.salt');
    const capiResponse = await fetch(capiEndpoint(articleId, key));
    const buffer = await capiResponse.buffer();
    const transport = new BufferedTransport(buffer);
    const protocol = new CompactProtocol(transport);

    if (capiResponse.status === 200) {
      const response: CapiResponse = CapiResponse.read(protocol);

      if (response.content) {
        getContent(capiResponse.status, articleId, response.content).either(
          error => {
            if (error.status === CapiError.NotFound) {
              logger.warn(error.message);
              res.sendStatus(404);
            } else {
              logger.error(error.message);
              res.sendStatus(500);
            }
          },
          content => {
            const support = checkSupport(content);

            if (support.kind === Support.Supported) {
              const { resources, element } = Page({ content, imageSalt });
              res.set('Link', getPrefetchHeader(resources));
              res.write('<!DOCTYPE html>');
              res.write(renderToString(element));
              res.end();
            } else {
              logger.warn(`I can\'t render that type of content yet! ${support.reason}`);
              res.sendStatus(415);
            }
          }
        )
      }
    } else {
      const response: ErrorResponse = ErrorResponse.read(protocol);
      logger.error(`I received a ${capiResponse.status} code from CAPI with the message: ${response.message}`);
      res.sendStatus(500);
    }
  } catch (e) {
    logger.error(`This error occurred, but I don't know why: ${e}`);
    res.sendStatus(500);
  }
}

// ----- App ----- //
logger.info(`Starting ${App} in ${Stage} for the stack ${Stack}`);
if (process.env.NODE_ENV === "production") {
  logger.info("Node is running in production mode")
}
const app = express();
app.use(bodyParser.raw({limit: '50mb'}));

app.all('*', (request, response, next) => {
  const start = Date.now();
  response.once('finish', () => {
    const duration = Date.now() - start;
    logger.info(`HTTP ${request.method} ${request.path} returned ${response.statusCode} in ${duration}ms`)
  });

  next();
});

app.use('/public', express.static(path.resolve(__dirname, '../public')));
app.use('/assets', express.static(path.resolve(__dirname, '../dist/assets')));
app.use(compression());

app.get('/healthcheck', (_req, res) => res.send("Ok"));

app.get('/favicon.ico', (_, res) => res.status(404).end());

app.get('/*', bodyParser.raw(), serveArticle);

app.post('/article', bodyParser.raw(), serveArticlePost);

const port = 3040;
app.listen(port, () => {
  logger.info(`Server listening on port ${port}!`);
  if (process.env.NODE_ENV !== "production") {
    logger.info(`Webpack dev server is listening on port 8080`);
  }
});
