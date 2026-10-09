import type { RequestHandler } from 'express';
import { validateAsFEShell } from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { renderShell } from './render.shell.web';

export const handleShell: RequestHandler = ({ body }, res) => {
	const frontendData = validateAsFEShell(body);
	const { html, prefetchScripts } = renderShell(frontendData);

	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
