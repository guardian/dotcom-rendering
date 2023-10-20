import type { Handler } from 'express';
import { handleAllEditorialNewslettersPage } from '../server/index.allEditorialNewslettersPage.web';
import { handleAMPArticle } from '../server/index.article.amp';
import {
	handleAppsArticle,
	handleAppsInteractive,
} from '../server/index.article.apps';
import {
	handleArticle,
	handleArticleJson,
	handleBlocks,
	handleInteractive,
	handleKeyEvents,
} from '../server/index.article.web';
import {
	handleFront,
	handleFrontJson,
	handleTagFront,
	handleTagFrontJson,
} from '../server/index.front.web';

/** article URLs contain a part that looks like “2022/nov/25” */
const ARTICLE_URL = /\/\d{4}\/[a-z]{3}\/\d{2}\//;
/** fronts are a series of lowercase strings, dashes and forward slashes */
const FRONT_URL = /^\/[a-z-/]+/;
/** This is imperfect, but covers *some* cases of tag fronts, consider expanding in the future */
const TAG_FRONT_URL = /^\/(tone|series|profile)\/[a-z-]+/;
/** assets are paths like /assets/index.xxx.js */
const ASSETS_URL = /^assets\/.+\.js/;

// see https://www.npmjs.com/package/webpack-hot-server-middleware
// for more info
export const devServer = (): Handler => {
	return (req, res, next) => {
		const path = req.path.split('/')[1];

		// handle urls with the ?url=… query param
		const sourceUrl = req.url.split('?url=')[1];
		if (path && sourceUrl) {
			return res.redirect(path + '/' + sourceUrl);
		}

		switch (path) {
			case 'Article':
				return handleArticle(req, res, next);
			case 'ArticleJson':
				return handleArticleJson(req, res, next);
			case 'AMPArticle':
				return handleAMPArticle(req, res, next);
			case 'Interactive':
				return handleInteractive(req, res, next);
			case 'AMPInteractive':
				return handleAMPArticle(req, res, next);
			case 'Blocks':
				return handleBlocks(req, res, next);
			case 'KeyEvents':
				return handleKeyEvents(req, res, next);
			case 'Front':
				return handleFront(req, res, next);
			case 'FrontJSON':
				return handleFrontJson(req, res, next);
			case 'TagFront':
				return handleTagFront(req, res, next);
			case 'TagFrontJSON':
				return handleTagFrontJson(req, res, next);
			case 'EmailNewsletters':
				return handleAllEditorialNewslettersPage(req, res, next);
			case 'AppsArticle':
				return handleAppsArticle(req, res, next);
			case 'AppsInteractive':
				return handleAppsInteractive(req, res, next);
			default: {
				// Do not redirect assets urls
				if (req.url.match(ASSETS_URL)) return next();

				if (req.url.match(ARTICLE_URL)) {
					const url = new URL(
						req.url,
						'https://www.theguardian.com/',
					).toString();
					console.info('redirecting to Article:', url);
					return res.redirect(`/Article/${url}`);
				}

				if (req.url.match(TAG_FRONT_URL)) {
					const url = new URL(
						req.url,
						'https://www.theguardian.com/',
					).toString();
					console.info('redirecting to Tag front:', url);
					return res.redirect(`/TagFront/${url}`);
				}

				if (req.url.match(FRONT_URL)) {
					const url = new URL(
						req.url,
						'https://www.theguardian.com/',
					).toString();
					console.info('redirecting to Front:', url);
					return res.redirect(`/Front/${url}`);
				}

				next();
			}
		}
	};
};
