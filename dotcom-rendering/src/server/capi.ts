import type { Request, RequestHandler, Response } from 'express';

const CAPI_URL = 'https://content.guardianapis.com';
const API_KEY = process.env.API_KEY ?? '';

export const capiPreviewRequest: RequestHandler = (
	req: Request,
	res: Response,
): void => {
	const articlePath = req.path.split('/Preview')[1];
	const url = `${CAPI_URL}/${articlePath}?api-key=${API_KEY}&show-fields=thumbnail`;

	fetch(url)
		.then((response) => response.json())
		.then((json) => {
			res.status(200).send(json);
		})
		.catch((err) => res.status(500).send(err));
};
