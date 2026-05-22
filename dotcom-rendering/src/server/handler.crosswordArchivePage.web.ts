import type { RequestHandler } from 'express';
import { validateAsCrosswordArchivePageType } from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { renderCrosswordArchivePage } from './render.crosswordArchivePage.web';

export const handleCrosswordArchivePage: RequestHandler = ({ body }, res) => {
	const archivePage = validateAsCrosswordArchivePageType(body);
	const { html, prefetchScripts } = renderCrosswordArchivePage({
		archivePage,
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
