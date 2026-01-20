import type { RequestHandler } from 'express';
import {
	validateAsFEArticle,
	validateAsFEHostedContent,
} from '../model/validate';
import { enhanceHostedContentType } from '../types/hostedContent';
import { makePrefetchHeader } from './lib/header';
import { renderHtml } from './render.hostedContent.web';
import { enhanceArticleType } from '../types/article';

export const handleHostedContent: RequestHandler = ({ body }, res) => {
	const frontendData = validateAsFEArticle(body);
	const hostedContent = enhanceArticleType(frontendData, 'Web');
	const { html, prefetchScripts } = renderHtml({
		hostedContent,
	});

	res.status(200).set('Link', makePrefetchHeader(prefetchScripts)).send(html);
};
