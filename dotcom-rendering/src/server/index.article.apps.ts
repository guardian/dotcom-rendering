import type { RequestHandler } from 'express';
import {
	recordTimeStart,
	recordTimeStop,
	recordTypeAndPlatform,
} from '../server/lib/logging-store';
import { enhanceArticleType } from './index.article.web';
import { makePrefetchHeader } from './lib/header';
import { renderArticle } from './render.article.apps';

export const handleAppsArticle: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('article', 'apps');
	recordTimeStart('enhance');
	const article = enhanceArticleType(body);
	recordTimeStop('enhance');
	recordTimeStart('render');
	const { html, clientScripts } = renderArticle(article);
	recordTimeStop('render');

	// The Android app will cache these assets to enable offline reading
	res.set('Link', makePrefetchHeader(clientScripts)).send(html);
};
