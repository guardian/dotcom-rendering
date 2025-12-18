import type { RequestHandler } from 'express';
import { validateAsFEHostedContent } from '../model/validate';
import { enhanceHostedContentType } from '../types/hostedContent';
import { makePrefetchHeader } from './lib/header';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderHtml } from './render.hostedContent.web';

export const handleHostedContent: RequestHandler = ({ body }, res) => {
	recordTypeAndPlatform('article', 'web');

	const frontendData = validateAsFEHostedContent(body);
	const hostedContent = enhanceHostedContentType(frontendData);
	const { html, prefetchScripts } = renderHtml({
		hostedContent,
	});

	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
