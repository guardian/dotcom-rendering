import type { RequestHandler } from 'express';
import { makePrefetchHeader } from './lib/header';
import { renderComponent } from './render.component.app';

export const handleComponent: RequestHandler = ({ params }, res) => {
	const name = (params.name ?? [])[0];
	if (name !== 'banner' && name !== 'static-banner') {
		res.status(404).send('invalid name');
	} else {
		const { html, prefetchScripts } = renderComponent({ name });
		res.status(200)
			.set('Link', makePrefetchHeader(prefetchScripts))
			.send(html);
	}
};
