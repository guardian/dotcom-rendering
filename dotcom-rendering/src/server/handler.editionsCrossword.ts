import type { RequestHandler } from 'express';
import { enhanceArticleType } from '../types/article';
import { makePrefetchHeader } from './lib/header';
import { renderCrosswordHtml } from './render.editionsCrossword.web';

export const handleEditionsCrossword: RequestHandler = ({ body }, res) => {
	const article = enhanceArticleType(body, 'Web');
	const { html, prefetchScripts } = renderCrosswordHtml({
		article,
	});

	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
