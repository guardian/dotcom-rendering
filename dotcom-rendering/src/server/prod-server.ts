import compression from 'compression';
import type { Request, Response } from 'express';
import express from 'express';
import responseTime from 'response-time';
import {
	render as renderAMPArticle,
	renderPerfTest as renderAMPArticlePerfTest,
} from '../amp/server';
import type { FEArticleType } from '../types/frontend';
import {
	renderArticle,
	renderArticleJson,
	renderPerfTest as renderArticlePerfTest,
	renderBlocks,
	renderFront,
	renderFrontJson,
	renderInteractive,
	renderKeyEvents,
} from '../web/server';
import { recordBaselineCloudWatchMetrics } from './lib/aws/metrics-baseline';
import { getContentFromURLMiddleware } from './lib/get-content-from-url';
import { logger } from './lib/logging';

// Middleware to track route performance using 'response-time' lib
// Usage: app.post('/Article', logRenderTime, renderArticle);
const logRenderTime = responseTime(
	(req: Request, _: Response, time: number) => {
		const body: FEArticleType = req.body;
		logger.info({
			pageId: body.pageId,
			renderTime: time,
		});
	},
);

export const prodServer = (): void => {
	logger.info('dotcom-rendering is GO.');

	const app = express();

	app.use(express.json({ limit: '50mb' }));
	app.use(compression());

	app.get('/_healthcheck', (req: Request, res: Response) => {
		res.status(200).send('OKAY');
	});

	// if running prod server locally, serve local assets
	if (!process.env.GU_PUBLIC) {
		app.use('/static/frontend', express.static(__dirname));

		app.use('/assets', express.static(__dirname));
	}

	app.post('/Article', logRenderTime, renderArticle);
	app.post('/AMPArticle', logRenderTime, renderAMPArticle);
	app.post('/Interactive', logRenderTime, renderInteractive);
	app.post('/AMPInteractive', logRenderTime, renderAMPArticle);
	app.post('/Blocks', logRenderTime, renderBlocks);
	app.post('/KeyEvents', logRenderTime, renderKeyEvents);
	app.post('/Front', logRenderTime, renderFront);
	app.post('/FrontJSON', logRenderTime, renderFrontJson);

	// These GET's are for checking any given URL directly from PROD
	app.get(
		'/Article',
		logRenderTime,
		getContentFromURLMiddleware,
		async (req: Request, res: Response) => {
			// Eg. http://localhost:9000/Article?url=https://www.theguardian.com/commentisfree/...
			try {
				return renderArticle(req, res);
			} catch (error) {
				console.error(error);
			}
		},
	);

	app.get(
		'/AMPArticle',
		logRenderTime,
		getContentFromURLMiddleware,
		async (req: Request, res: Response) => {
			// Eg. http://localhost:9000/AMPArticle?url=https://www.theguardian.com/commentisfree/...
			try {
				return renderAMPArticle(req, res);
			} catch (error) {
				console.error(error);
			}
		},
	);

	app.get(
		'/Front',
		logRenderTime,
		// TODO: ensure getContentFromURLMiddleware supports fronts
		getContentFromURLMiddleware,
		async (req: Request, res: Response) => {
			// Eg. http://localhost:9000/Front?url=https://www.theguardian.com/uk/sport
			try {
				return renderFront(req, res);
			} catch (error) {
				console.error(error);
			}
		},
	);

	app.get(
		'/FrontJSON',
		logRenderTime,
		// TODO: ensure getContentFromURLMiddleware supports fronts
		getContentFromURLMiddleware,
		async (req: Request, res: Response) => {
			// Eg. http://localhost:9000/FrontJSON?url=https://www.theguardian.com/uk/sport
			try {
				return renderFrontJson(req, res);
			} catch (error) {
				console.error(error);
			}
		},
	);

	app.use('/ArticlePerfTest', renderArticlePerfTest);
	app.use('/AMPArticlePerfTest', renderAMPArticlePerfTest);
	app.use('/ArticleJson', renderArticleJson);

	app.get('/', (req: Request, res: Response) => {
		try {
			res.send(`
                <!DOCTYPE html>
                <html>
                <body>
                    <ul>
                        <li><a href="/Article">Article</a></li>
                        <li><a href="/AMPArticle">⚡️Article</a></li>
                        <li><a href="/ArticlePerfTest">⚡Article (perf test example)</a></li>
                        <li><a href="/AMPArticlePerfTest">⚡️Article (perf test example)</a></li>
                    </ul>
                    <ul>
                        <li><a href="/ArticlePerfTest">⚡Article (perf test example)</a></li>
                        <li><a href="/AMPArticlePerfTest">⚡️Article (perf test example)</a></li>
                    </ul>
                </body>
                </html>
            `);
		} catch (e) {
			const message =
				e instanceof Error
					? e.stack ?? 'Unknown stack'
					: 'Unknown error';
			res.status(500).send(`<pre>${message}</pre>`);
		}
	});

	// express requires all 4 args here:
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	app.use((e: any, req: any, res: Response, next: any) => {
		const message =
			e instanceof Error ? e.stack ?? 'Unknown stack' : 'Unknown error';
		res.status(500).send(`<pre>${message}</pre>`);
	});

	if (process.env.DISABLE_LOGGING_AND_METRICS !== 'true') {
		setInterval(() => {
			recordBaselineCloudWatchMetrics();
		}, 10 * 1000);
	}

	const port = process.env.PORT || 9000;
	app.listen(port);

	console.log(`Started production server on port ${port}\nready`);
};
