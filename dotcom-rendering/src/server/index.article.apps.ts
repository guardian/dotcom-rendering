import type { RequestHandler } from 'express';
import { recordTypeAndPlatform } from '../server/lib/logging-store';
import { enhanceArticleType } from './index.article.web';
import { makePrefetchHeader } from './lib/header';
import { renderArticle } from './render.article.apps';

export const handleAppsArticle: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('article', 'apps');

	// TODO - add renderingTarget so that we can enhance
	// blocks specifically for Apps
	const article = enhanceArticleType(body);
	const { html, prefetchScripts } = renderArticle(article);

	// The Android app will cache these assets to enable offline reading
	res.set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
