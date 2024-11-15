import type { RequestHandler } from 'express';
import { validateAsEditionsCrosswordType } from '../model/validate';

export const handleEditionsCrossword: RequestHandler = ({ body }, res) => {
	const editionsCrosswords = validateAsEditionsCrosswordType(body);
	// const { html, prefetchScripts } = renderCrosswordHtml({
	// 	editionsCrosswords,
	// });
	console.log(editionsCrosswords);
	res.sendStatus(200);
	// res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
