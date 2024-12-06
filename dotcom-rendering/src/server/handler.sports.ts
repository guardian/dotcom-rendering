import type { RequestHandler } from 'express';
import { validateAsSports } from '../model/validate';
import { renderSportsHtml } from './render.sports.web';
import { makePrefetchHeader } from './lib/header';

export const handleSports: RequestHandler = ({ body }, res) => {
	console.log(`marji: `);
	const matchList = validateAsSports(body);
	console.log(matchList);

	const { html, prefetchScripts } = renderSportsHtml({
		sports: matchList,
	});

	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
