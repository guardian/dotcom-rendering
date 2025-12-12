import { RequestHandler } from 'express';
import { recordTypeAndPlatform } from './lib/logging-store';
import { validateAsFEHostedContent } from '../model/validate';
import { enhanceHostedContentType } from '../types/hostedContent';
import { renderHtml } from './render.hostedContent.web';
import { makePrefetchHeader } from './lib/header';

export const handleArticle: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('article', 'web');

	const frontendData = validateAsFEHostedContent(body);
	const hostedContent = enhanceHostedContentType(frontendData);
	const { html, prefetchScripts } = renderHtml({
		hostedContent,
	});

	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
