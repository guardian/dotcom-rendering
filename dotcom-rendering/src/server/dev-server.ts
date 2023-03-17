import type { Handler } from 'express';
import { handleAMPArticle } from '../amp/server';
import { handleAppsArticle } from '../apps/server';
import {
	handleWebArticle,
	handleWebArticleJson,
	handleWebBlocks,
	handleWebFront,
	handleWebFrontJson,
	handleWebInteractive,
	handleWebKeyEvents,
} from '../web/server';

/** article URLs contain a part that looks like “2022/nov/25” */
const ARTICLE_URL = /\/\d{4}\/[a-z]{3}\/\d{2}\//;
/** fronts are a series of lowercase strings, dashes and forward slashes */
const FRONT_URL = /^\/[a-z-/]+/;
/** assets are paths like /assets/index.xxx.js */
const ASSETS_URL = /^assets\/.+\.js/;

// see https://www.npmjs.com/package/webpack-hot-server-middleware
// for more info
export const devServer = (): Handler => {
	return (req, res, next) => {
		const path = req.path.split('/').slice(1, 3).join('/');

		// handle urls with the ?url=… query param
		const sourceUrl = req.url.split('?url=')[1];
		if (path && sourceUrl) {
			return res.redirect(path + '/' + sourceUrl);
		}

		console.log(path);

		switch (path) {
			case 'Article/web':
				return handleWebArticle(req, res, next);
			case 'Article/apps':
				return handleAppsArticle(req, res, next);
			case 'Article/amp':
				return handleAMPArticle(req, res, next);
			case 'Interactive/web':
				return handleWebInteractive(req, res, next);
			case 'Interactive/amp':
				return handleAMPArticle(req, res, next);
			case 'Front/web':
				return handleWebFront(req, res, next);
			case 'FrontJSON/web':
				return handleWebFrontJson(req, res, next);
			case 'ArticleJSON/web':
				return handleWebArticleJson(req, res, next);
			case 'KeyEvents/web':
				return handleWebKeyEvents(req, res, next);
			case 'Blocks/web':
				return handleWebBlocks(req, res, next);

			/**
			 * @deprecated
			 * These old dev-server endpoints should be removed after XX/XX/23, once people
			 * have gotten used to the new endpoints
			 */
			case 'Article':
				return res.redirect(
					req.url.replace('/Article', '/Article/web'),
				);
			case 'ArticleJson':
				return res.redirect(
					req.url.replace('/ArticleJson', '/ArticleJson/web'),
				);
			case 'AMPArticle':
				return res.redirect(
					req.url.replace('/AMPArticle', '/Article/amp'),
				);
			case 'Interactive':
				return res.redirect(
					req.url.replace('/Interactive', '/Interactive/web'),
				);
			case 'AMPInteractive':
				return res.redirect(
					req.url.replace('/AMPInteractive', '/Interactive/amp'),
				);
			case 'Blocks':
				return res.redirect(req.url.replace('/Blocks', '/Blocks/web/'));
			case 'KeyEvents':
				return res.redirect(
					req.url.replace('/KeyEvents', '/KeyEvents/web'),
				);
			case 'Front':
				return res.redirect(req.url.replace('/Front', '/Front/web'));
			case 'FrontJSON':
				return res.redirect(
					req.url.replace('/FrontJSON', '/FrontJSON/web'),
				);
			case 'AppsArticle':
				return res.redirect(
					req.url.replace('/AppsArticle', '/Article/apps'),
				);
			/**
			 * Catch defaults & enable navigation on the dev-server
			 */
			default: {
				// Do not redirect assets urls
				if (req.url.match(ASSETS_URL)) return next();

				if (req.url.match(ARTICLE_URL)) {
					const url = new URL(
						req.url,
						'https://www.theguardian.com/',
					).toString();
					console.info('redirecting to Article:', url);
					return res.redirect(`/web/Article/${url}`); // TODO: Should web be the default here?
				}

				if (req.url.match(FRONT_URL)) {
					const url = new URL(
						req.url,
						'https://www.theguardian.com/',
					).toString();
					console.info('redirecting to Front:', url);
					return res.redirect(`/web/Front/${url}`);
				}

				next();
			}
		}
	};
};
