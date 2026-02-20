import type { RequestHandler } from 'express';
import { isThrasher, renderThrasher } from './render.thrasher.apps';

export const handleAppsThrasher: RequestHandler = ({ params }, res) => {
	const { name } = params;
	if (typeof name !== 'string') {
		res.status(400).send('Invalid thrasher name');
		return;
	}

	if (!isThrasher(name)) {
		res.status(404).send(`Invalid thrasher name: ${name}`);
		return;
	}
	const { html } = renderThrasher(name);
	res.status(200).send(html);
};
