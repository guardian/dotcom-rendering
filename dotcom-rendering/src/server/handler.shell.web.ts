import type { RequestHandler } from 'express';
import { validateAsFEShell } from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { renderShell } from './render.shell.web';

export const handleShell: RequestHandler = ({ params, body }, res) => {
	const { name } = params;
	if (typeof name !== 'string') {
		res.status(400).send('Invalid site name');
		return;
	}

	const frontendData = validateAsFEShell(body);
	const { html, prefetchScripts } = renderShell(frontendData, name);

	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
