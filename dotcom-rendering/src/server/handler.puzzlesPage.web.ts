import type { RequestHandler } from 'express';
import { isPuzzlesHubV1Enabled } from '../lib/puzzlesHubVersionExperiment';
import { validateAsPuzzlesPageType } from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { renderPuzzlesPage } from './render.puzzlesPage.web';

export const handlePuzzlesPage: RequestHandler = ({ body }, res) => {
	const puzzlesPage = validateAsPuzzlesPageType(body);
	if (!isPuzzlesHubV1Enabled(puzzlesPage.config)) {
		res.sendStatus(404);
		return;
	}
	const { html, prefetchScripts } = renderPuzzlesPage({ puzzlesPage });
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
