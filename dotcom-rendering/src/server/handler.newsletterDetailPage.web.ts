import type { RequestHandler } from 'express';
import { validateAsNewsletterDetailPageType } from '../model/validate';
import type { DCRNewsletterDetailPageType } from '../types/newsletterDetailPage';
import { makePrefetchHeader } from './lib/header';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderNewsletterDetailPage } from './render.newsletterDetailPage.web';

export const handleNewsletterDetailPage: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('newsletterDetail');
	const feNewsletterDetailPage = validateAsNewsletterDetailPageType(body);
	// TO DO - there are no enhancements to apply to the FE type to make it a DCR type
	const newsletterDetailPage: DCRNewsletterDetailPageType =
		feNewsletterDetailPage;
	const { html, prefetchScripts } = renderNewsletterDetailPage({
		newsletterDetailPage,
	});
	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
