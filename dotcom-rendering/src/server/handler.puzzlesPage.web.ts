import type { RequestHandler } from 'express';
import { validateAsPuzzlesPageType } from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { renderPuzzlesPage } from './render.puzzlesPage.web';

export const handlePuzzlesPage: RequestHandler = ({ body }, res) => {
	const puzzlesPage = validateAsPuzzlesPageType(body);
	const { html, prefetchScripts } = renderPuzzlesPage({
		puzzlesPage,
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
