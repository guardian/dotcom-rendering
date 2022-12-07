import type { Handler } from 'express';
import { handleAMPArticle } from '../amp/server';
import {
	handleArticle,
	handleArticleJson,
	handleBlocks,
	handleFront,
	handleFrontJson,
	handleInteractive,
	handleKeyEvents,
	renderNewslettersPage,
} from '../web/server';
import { provideStaticDataMiddleware } from './dev-middleware/provideStaticNewslettersModel';

/** article URLs contain a part that looks like “2022/nov/25” */
const ARTICLE_URL = /\/\d{4}\/[a-z]{3}\/\d{2}\//;
/** fronts are a series of lowercase strings, dashes and forward slashes */
const FRONT_URL = /^\/[a-z-/]+/;

// see https://www.npmjs.com/package/webpack-hot-server-middleware
// for more info
export const devServer = (): Handler => {
	return (req, res, next) => {
		switch (req.path) {
			case '/Article':
				return handleArticle(req, res, next);
			case '/ArticleJson':
				return handleArticleJson(req, res, next);
			case '/AMPArticle':
				return handleAMPArticle(req, res, next);
			case '/Interactive':
				return handleInteractive(req, res, next);
			case '/AMPInteractive':
				return handleAMPArticle(req, res, next);
			case '/Blocks':
				return handleBlocks(req, res, next);
			case '/KeyEvents':
				return handleKeyEvents(req, res, next);
			case '/Front':
				return handleFront(req, res, next);
			case '/FrontJSON':
				return handleFrontJson(req, res, next);
			case '/email-newsletters':
				return provideStaticDataMiddleware(req, res, () => {
					renderNewslettersPage(req, res);
				});
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
