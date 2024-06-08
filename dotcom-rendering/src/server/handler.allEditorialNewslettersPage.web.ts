import type { RequestHandler } from 'express';
import { enhanceNewslettersPage } from '../model/enhance-newsletters-page';
import { validateAsAllEditorialNewslettersPageType } from '../model/validate';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderEditorialNewslettersPage } from './render.allEditorialNewslettersPage.web';

export const handleAllEditorialNewslettersPage: RequestHandler = (
	{ body },
	res,
) => {
	recordTypeAndPlatform('newsletters');
	const feNewslettersData = validateAsAllEditorialNewslettersPageType(body);
	const newslettersPage = enhanceNewslettersPage(feNewslettersData);
	const html = renderEditorialNewslettersPage({
		newslettersPage,
	});
	res.status(200).send(html);
};
