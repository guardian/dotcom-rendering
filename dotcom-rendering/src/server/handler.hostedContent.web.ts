import type { RequestHandler } from 'express';
import { validateAsFEHostedContent } from '../model/validate';
import { enhanceHostedContent } from '../types/hostedContent';
import { makePrefetchHeader } from './lib/header';
import { recordTypeAndPlatform } from './lib/logging-store';
import { renderHostedContent } from './render.hostedContent.web';

export const handleHostedContent: RequestHandler = ({ body }, res) => {
	const frontendData = validateAsFEHostedContent(body);
	const hostedContent = enhanceHostedContent(frontendData);

	const { html, prefetchScripts } = renderHostedContent({
		hostedContent,
	});

	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
