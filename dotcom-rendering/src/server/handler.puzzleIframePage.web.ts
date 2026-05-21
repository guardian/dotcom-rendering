import type { RequestHandler } from 'express';
import { validateAsPuzzleIframePageType } from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { renderPuzzleIframePage } from './render.puzzleIframePage.web';

export const handlePuzzleIframePage: RequestHandler = ({ body }, res) => {
	const puzzlePage = validateAsPuzzleIframePageType(body);
	const { html, prefetchScripts } = renderPuzzleIframePage({
		puzzlePage,
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
