import type { RequestHandler } from 'express';
import { renderComponent } from './render.component.web';

export const handleComponent: RequestHandler = ({ body, params }, res) => {
	const name = (params.name ?? [])[0];
	if (name !== 'gutter' && name !== 'banner') {
		res.status(404).send('invalid name');
	} else {
		const html = renderComponent({ name });
		res.status(200).send(html);
	}
};
