import { RequestHandler } from 'express';

const getStack = (e: unknown): string =>
	e instanceof Error ? e.stack ?? 'No error stack' : 'Unknown error';

export const handleAppsArticle: RequestHandler = (_req, res) => {
	try {
		res.status(200).send('<pre>Not supported</pre>');
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}`);
	}
};
