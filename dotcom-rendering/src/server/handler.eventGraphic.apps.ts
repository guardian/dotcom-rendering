import type { RequestHandler } from 'express';
import type { FEAppComponentEventGraphic } from '../frontend/feAppComponentEventGraphic';
import { isEditionId } from '../lib/edition';
import { validateAsFEAppComponentEventGraphic } from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { isEventGraphic, renderEventGraphic } from './render.eventGraphic.apps';

export const handleAppsEventGraphic: RequestHandler = (
	{ params, body },
	res,
) => {
	// const name = Array.isArray(params.name)
	// 	? params.name.join('/')
	// 	: params.name;
	console.log('marjan');
	// if (typeof name !== 'string') {
	// 	res.status(400).send('Invalid event graphic name');
	// 	return;
	// }

	// if (!isEventGraphic(name)) {
	// 	res.status(404).send(`Invalid event graphic name: ${name}`);
	// 	return;
	// }
	const data: FEAppComponentEventGraphic =
		validateAsFEAppComponentEventGraphic(body);
	const editionId = isEditionId(data.config.edition)
		? data.config.edition
		: 'UK';
	const { html, prefetchScripts } = renderEventGraphic(data, editionId);
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
