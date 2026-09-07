import type { RequestHandler } from 'express';
import { isGamePageEnabled } from '../lib/gamePageExperiment';
import { getGameConfig } from '../model/games/gameConfigs';
import { validateAsGamePageType } from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { renderGamePage } from './render.gamePage.web';

export const handleGamePage: RequestHandler = ({ body }, res) => {
	const gamePage = validateAsGamePageType(body);

	if (!isGamePageEnabled(gamePage.config)) {
		res.sendStatus(404);
		return;
	}

	const gameConfig = getGameConfig(gamePage.slug);

	if (!gameConfig) {
		res.sendStatus(404);
		return;
	}

	const { html, prefetchScripts } = renderGamePage({
		gamePage: { ...gamePage, gameConfig },
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
