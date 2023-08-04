import type { RequestHandler } from 'express';
import { enhanceNewslettersPage } from '../model/enhance-newsletters-page.ts';
import { validateAsAllEditorialNewslettersPageType } from '../model/validate.ts';
import { recordTypeAndPlatform } from './lib/logging-store.ts';
import { renderEditorialNewslettersPage } from './render.allEditorialNewslettersPage.web.tsx';

export const handleAllEditorialNewslettersPage: RequestHandler = (
	{ body },
	res,
) => {
	recordTypeAndPlatform('newsletters');
	const feNewslettersData = validateAsAllEditorialNewslettersPageType(body);
	const newslettersPage = enhanceNewslettersPage(feNewslettersData);
	const html = renderEditorialNewslettersPage({ newslettersPage });
	res.status(200).send(html);
};
