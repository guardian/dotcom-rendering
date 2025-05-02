import type { RequestHandler } from 'express';
import { makePrefetchHeader } from './lib/header';
import { renderCrosswordHtml } from './render.editionsCrossword';

export const handleEditionsCrossword: RequestHandler = ({ body }, res) => {
	const editionsCrosswords = body;
	const { html, prefetchScripts } = renderCrosswordHtml({
		editionsCrosswords,
	});

	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
