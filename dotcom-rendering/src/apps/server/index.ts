import { RequestHandler } from 'express';
import { enhanceArticleType } from '../../web/server';
import { articleToHtml } from './articleToHtml';

const getStack = (e: unknown): string =>
	e instanceof Error ? e.stack ?? 'No error stack' : 'Unknown error';

export const handleAppsArticle: RequestHandler = ({ body }, res) => {
	try {
		const article = enhanceArticleType(body);
		const resp = articleToHtml(article);
		res.status(200).send(resp);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}`);
	}
};
