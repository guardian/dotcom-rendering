import type { RequestHandler } from 'express';
import { isPuzzlesHubEnabled } from '../lib/puzzlesHubExperiment';
import { getPuzzleConfig } from '../model/puzzles/puzzleConfigs';
import { validateAsPuzzlePageType } from '../model/validate.puzzlePage';
import { makePrefetchHeader } from './lib/header';
import { renderPuzzlePage } from './render.puzzlePage.web';

export const handlePuzzlePage: RequestHandler = ({ body }, res) => {
	const puzzlePage = validateAsPuzzlePageType(body);

	if (!isPuzzlesHubEnabled(puzzlePage.config.serverSideABTests)) {
		res.sendStatus(404);
		return;
	}

	const puzzleConfig = getPuzzleConfig(puzzlePage.slug);

	if (!puzzleConfig) {
		res.sendStatus(404);
		return;
	}

	const { html, prefetchScripts } = renderPuzzlePage({
		puzzlePage: { ...puzzlePage, puzzleConfig },
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
