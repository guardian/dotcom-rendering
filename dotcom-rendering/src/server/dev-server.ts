// @ts-no-check
import type { NextFunction, Request, Response } from 'express';
import { serve as renderAMPArticle } from '../amp/server';
import {
	renderArticle,
	renderArticleJson,
	renderBlocks,
	renderFront,
	renderFrontJson,
	renderInteractive,
	renderKeyEvents,
} from '../web/server';

/** article URLs contain a part that looks like “2022/nov/25” */
const ARTICLE_URL = /\/\d{4}\/[a-z]{3}\/\d{2}\//;
/** fronts are a series of lowercase strings, dashes and forward slashes */
const FRONT_URL = /^\/[a-z-/]+/;

// see https://www.npmjs.com/package/webpack-hot-server-middleware
// for more info
export const devServer = () => {
	return (req: Request, res: Response, next: NextFunction): void => {
		switch (req.path) {
			case '/Article':
				return renderArticle(req, res);
			case '/ArticleJson':
				return renderArticleJson(req, res);
			case '/AMPArticle':
				return renderAMPArticle(req, res);
			case '/Interactive':
				return renderInteractive(req, res);
			case '/AMPInteractive':
				return renderAMPArticle(req, res);
			case '/Blocks':
				return renderBlocks(req, res);
			case '/KeyEvents':
				return renderKeyEvents(req, res);
			case '/Front':
				return renderFront(req, res);
			case '/FrontJSON':
				return renderFrontJson(req, res);
			default: {
				if (req.url.match(ARTICLE_URL)) {
					const url = new URL(
						req.url,
						'https://www.theguardian.com/',
					).toString();
					console.info('redirecting to Article:', url);
					return res.redirect(`/Article?url=${url}`);
				}

				if (req.url.match(FRONT_URL)) {
					const url = new URL(
						req.url,
						'https://www.theguardian.com/',
					).toString();
					console.info('redirecting to Front:', url);
					return res.redirect(`/Front?url=${url}`);
				}

				next();
			}
		}
	};
};
