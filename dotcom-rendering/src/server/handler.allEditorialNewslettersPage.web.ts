import type { RequestHandler } from 'express';
import { enhanceNewslettersPage } from '../model/enhance-newsletters-page';
import { validateAsAllEditorialNewslettersPageType } from '../model/validate';
import { makePrefetchHeader } from './lib/header';
import { renderEditorialNewslettersPage } from './render.allEditorialNewslettersPage.web';

export const handleAllEditorialNewslettersPage: RequestHandler = (
	{ body },
	res,
) => {
	const feNewslettersData = validateAsAllEditorialNewslettersPageType(body);
	const newslettersPage = enhanceNewslettersPage(feNewslettersData);
	const { html, prefetchScripts } = renderEditorialNewslettersPage({
		newslettersPage,
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
