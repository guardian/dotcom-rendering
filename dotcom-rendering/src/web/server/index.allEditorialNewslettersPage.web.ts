import type { RequestHandler } from 'express';
import { validateAsAllEditorialNewslettersPageType } from '../../model/validate';
import { recordTypeAndPlatform } from '../../server/lib/logging-store';
import type { DCRNewslettersPageType } from '../../types/newslettersPage';
import { renderEditorialNewslettersPage } from './render.allEditorialNewslettersPage.web';

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
	recordTypeAndPlatform('newsletters');
	const newslettersPage = enhanceAllEditorialNewslettersPage(body);
	const html = renderEditorialNewslettersPage({ newslettersPage });
	res.status(200).send(html);
};
