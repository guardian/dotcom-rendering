import type { RequestHandler } from 'express';
import { validateAsAllEditorialNewslettersPageType } from '../model/validate';
import type { DCRNewslettersPageType } from '../types/newslettersPage';
import { renderEditorialNewslettersPage } from './render.allEditorialNewslettersPage.web';

const getStack = (e: unknown): string =>
	e instanceof Error ? e.stack ?? 'No error stack' : 'Unknown error';

const enhanceAllEditorialNewslettersPage = (
	body: unknown,
): DCRNewslettersPageType => {
	const newsletterData = validateAsAllEditorialNewslettersPageType(body);
	return {
		...newsletterData,
	};
};

export const handleAllEditorialNewslettersPage: RequestHandler = (
	{ body },
	res,
) => {
	try {
		const newslettersPage = enhanceAllEditorialNewslettersPage(body);
		const html = renderEditorialNewslettersPage({ newslettersPage });
		res.status(200).send(html);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}</pre>`);
	}
};
