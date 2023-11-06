import type { RequestHandler } from 'express';
import { enhanceArticleType } from '../lib/article';
import { makePrefetchHeader } from './lib/header';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderArticle } from './render.article.apps';

export const handleAppsArticle: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('article', 'apps');

	const article = enhanceArticleType(body, 'Apps');
	const { html, prefetchScripts } = renderArticle(article);

	// The Android app will cache these assets to enable offline reading
	res.set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};

export const handleAppsInteractive: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('interactive', 'app');

	const article = enhanceArticleType(body, 'Apps');
	const { html, prefetchScripts } = renderArticle(article);

	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
