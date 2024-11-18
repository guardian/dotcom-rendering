import type { RequestHandler } from 'express';
import { validateAsEditionsCrosswordType } from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { renderCrosswordHtml } from './render.editionsCrossword.web';

export const handleEditionsCrossword: RequestHandler = ({ body }, res) => {
	const editionsCrosswords = validateAsEditionsCrosswordType(body);

	const { html, prefetchScripts } = renderCrosswordHtml({
		editionsCrosswords,
	});

	console.log(editionsCrosswords);

	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
