import type { RequestHandler } from 'express';
import { enhanceArticleType } from '../lib/article';
import { recordTypeAndPlatform } from '../server/lib/logging-store';
import { makePrefetchHeader } from './lib/header';
import { renderArticle } from './render.article.apps';

export const handleAppsArticle: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('article', 'apps');

	const article = enhanceArticleType(body, 'Apps');
	const { html, prefetchScripts } = renderArticle(article);

	// The Android app will cache these assets to enable offline reading
	res.set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
