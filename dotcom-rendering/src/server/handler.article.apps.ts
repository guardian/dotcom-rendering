import type { RequestHandler } from 'express';
import { enhanceArticleType } from '../lib/article';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderArticle } from './render.article.apps';

export const handleAppsArticle: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('article', 'apps');

	const article = enhanceArticleType(body, 'Apps');
	const html = renderArticle(article);

	// The Android app will cache these assets to enable offline reading
	res.send(html);
};

export const handleAppsInteractive: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('interactive', 'app');

	const article = enhanceArticleType(body, 'Apps');
	const html = renderArticle(article);

	res.status(200).send(html);
};
