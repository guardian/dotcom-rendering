import type { RequestHandler } from 'express';
import { isPuzzlesHubAvailable } from '../lib/puzzlesHubAccess';
import { validateAsPuzzlesPageType } from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { renderPuzzlesPage } from './render.puzzlesPage.web';

export const handlePuzzlesPage: RequestHandler = ({ body }, res) => {
	const puzzlesPage = validateAsPuzzlesPageType(body);
	if (!isPuzzlesHubAvailable(puzzlesPage.config)) {
		res.sendStatus(404);
		return;
	}
	const { html, prefetchScripts } = renderPuzzlesPage({ puzzlesPage });
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
