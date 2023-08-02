import type { Handler, MiddlewareHandler } from 'hono';
import { handleAllEditorialNewslettersPage } from '../server/index.allEditorialNewslettersPage.web';
import { handleAMPArticle } from '../server/index.article.amp';
import { handleAppsArticle } from '../server/index.article.apps';
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
export const devServer = (): MiddlewareHandler => (context, next) => {
	const path = context.req.path.split('/')[1];

	// handle urls with the ?url=… query param
	const sourceUrl = context.req.url.split('?url=')[1];
	if (path && sourceUrl) {
		return context.redirect(path + '/' + sourceUrl);
	}

	switch (path) {
		case 'Article':
			return handleArticle(context, next);
		case 'ArticleJson':
			return handleArticleJson(context, next);
		case 'AMPArticle':
			return handleAMPArticle(context, next);
		case 'Interactive':
			return handleInteractive(context, next);
		case 'AMPInteractive':
			return handleAMPArticle(context, next);
		case 'Blocks':
			return handleBlocks(context, next);
		case 'KeyEvents':
			return handleKeyEvents(context, next);
		case 'Front':
			return handleFront(context, next);
		case 'FrontJSON':
			return handleFrontJson(context, next);
		case 'TagFront':
			return handleTagFront(context, next);
		case 'TagFrontJSON':
			return handleTagFrontJson(context, next);
		// case 'EmailNewsletters':
		// 	return handleAllEditorialNewslettersPage(context,next);
		// case 'AppsArticle':
		// 	return handleAppsArticle(context,next);
		default: {
			// Do not redirect assets urls
			if (context.req.url.match(ASSETS_URL)) return next();

			if (context.req.url.match(ARTICLE_URL)) {
				const url = new URL(
					context.req.url,
					'https://www.theguardian.com/',
				).toString();
				console.info('redirecting to Article:', url);
				return context.redirect(`/Article/${url}`);
			}

			if (context.req.url.match(TAG_FRONT_URL)) {
				const url = new URL(
					context.req.url,
					'https://www.theguardian.com/',
				).toString();
				console.info('redirecting to Tag front:', url);
				return context.redirect(`/TagFront/${url}`);
			}

			if (context.req.url.match(FRONT_URL)) {
				const url = new URL(
					context.req.url,
					'https://www.theguardian.com/',
				).toString();
				console.info('redirecting to Front:', url);
				return context.redirect(`/Front/${url}`);
			}

			return next();
		}
	}
};
