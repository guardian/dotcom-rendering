import type { RequestHandler } from 'express';
import { withoutV2PuzzleItems } from '../lib/puzzlesHubLayout';
import {
	isPuzzlesHubV1Enabled,
	isPuzzlesHubV2Enabled,
} from '../lib/puzzlesHubVersionExperiment';
import { getPuzzleConfig } from '../model/puzzles/puzzleConfigs';
import { validateAsPuzzlePageType } from '../model/validate.puzzlePage';
import { makePrefetchHeader } from './lib/header';
import { renderPuzzlePage } from './render.puzzlePage.web';

export const handlePuzzlePage: RequestHandler = ({ body }, res) => {
	const puzzlePage = validateAsPuzzlePageType(body);

	if (!isPuzzlesHubV1Enabled(puzzlePage.config)) {
		res.sendStatus(404);
		return;
	}

	const puzzleConfig = getPuzzleConfig(puzzlePage.slug);

	if (
		!puzzleConfig ||
		(puzzleConfig.iframe.provider === 'moviegrid' &&
			(!isPuzzlesHubV2Enabled(puzzlePage.config) ||
				!puzzlePage.instance.gameUrl?.trim()))
	) {
		res.sendStatus(404);
		return;
	}

	const { html, prefetchScripts } = renderPuzzlePage({
		puzzlePage: {
			...puzzlePage,
			puzzleConfig,
			instance: isPuzzlesHubV2Enabled(puzzlePage.config)
				? puzzlePage.instance
				: {
						...puzzlePage.instance,
						moreFromPuzzlesAndGames:
							puzzlePage.instance.moreFromPuzzlesAndGames &&
							withoutV2PuzzleItems(
								puzzlePage.instance.moreFromPuzzlesAndGames,
							),
					},
		},
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
