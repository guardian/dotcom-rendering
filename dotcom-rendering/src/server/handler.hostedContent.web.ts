import { RequestHandler } from 'express';
import { recordTypeAndPlatform } from './lib/logging-store';
import { validateAsFEHostedContent } from '../model/validate';
import { enhanceHostedContentType } from '../types/hostedContent';

export const handleArticle: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('article', 'web');

	const frontendData = validateAsFEHostedContent(body);
	const article = enhanceHostedContentType(frontendData);
	// const { html, prefetchScripts } = renderHtml({
	// 	article,
	// });

	// res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
