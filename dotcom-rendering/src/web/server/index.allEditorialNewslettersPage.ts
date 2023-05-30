import type { RequestHandler } from 'express';
import { enhanceNewslettersPage } from '../../model/enhance-newsletters-page';
import { validateAsAllEditorialNewslettersPageType } from '../../model/validate';
import { renderEditorialNewslettersPage } from './render.allEditorialNewslettersPage';

const getStack = (e: unknown): string =>
	e instanceof Error ? e.stack ?? 'No error stack' : 'Unknown error';

export const handleAllEditorialNewslettersPage: RequestHandler = (
	{ body },
	res,
) => {
	try {
		const newsletterData = validateAsAllEditorialNewslettersPageType(body);
		const newslettersPage = enhanceNewslettersPage(newsletterData);
		const html = renderEditorialNewslettersPage({ newslettersPage });
		res.status(200).send(html);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}</pre>`);
	}
};
