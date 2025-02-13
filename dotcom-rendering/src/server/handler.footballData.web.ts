import type { RequestHandler } from 'express';
import type { FEFootballDataPage } from '../feFootballDataPage';
import { makePrefetchHeader } from './lib/header';
import { renderFootballDataPage } from './render.footballData.web';

export const handleFootballDataPage: RequestHandler = ({ body }, res) => {
	const footballData = body as FEFootballDataPage;
	const { html, prefetchScripts } = renderFootballDataPage(footballData);
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
