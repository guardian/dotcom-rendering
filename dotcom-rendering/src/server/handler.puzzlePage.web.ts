import type { RequestHandler } from 'express';
import { getPuzzleConfig } from '../model/puzzles/puzzleConfigs';
import { validateAsPuzzlePageType } from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { renderPuzzlePage } from './render.puzzlePage.web';

export const handlePuzzlePage: RequestHandler = ({ body }, res) => {
	const puzzlePage = validateAsPuzzlePageType(body);

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
