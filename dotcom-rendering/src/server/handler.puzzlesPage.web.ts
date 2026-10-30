import type { RequestHandler } from 'express';
import { withoutV2Puzzles } from '../lib/puzzlesHubLayout';
import {
	isPuzzlesHubV1Enabled,
	isPuzzlesHubV2Enabled,
} from '../lib/puzzlesHubVersionExperiment';
import { validateAsPuzzlesPageType } from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { renderPuzzlesPage } from './render.puzzlesPage.web';

export const handlePuzzlesPage: RequestHandler = ({ body }, res) => {
	const puzzlesPage = validateAsPuzzlesPageType(body);
	if (!isPuzzlesHubV1Enabled(puzzlesPage.config)) {
		res.sendStatus(404);
		return;
	}
	const { html, prefetchScripts } = renderPuzzlesPage({
		puzzlesPage: isPuzzlesHubV2Enabled(puzzlesPage.config)
			? puzzlesPage
			: { ...puzzlesPage, layout: withoutV2Puzzles(puzzlesPage.layout) },
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
