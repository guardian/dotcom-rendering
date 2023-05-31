import type { RequestHandler } from 'express';
import { recordTypeAndPlatform } from '../../server/lib/logging-store';
import { enhanceArticleType } from '../../web/server/index.article';
import { renderArticle } from './render.article';

const getStack = (e: unknown): string =>
	e instanceof Error ? e.stack ?? 'No error stack' : 'Unknown error';

/**
 * Formats script paths as a Link header
 * @see https://datatracker.ietf.org/doc/html/rfc5988#section-5.5
 * @param scriptPaths - the script paths to include in the Link header
 */
const makePrefetchHeader = (scriptPaths: string[]): string =>
	scriptPaths.reduce(
		(acc, scriptPath) => acc + `<${scriptPath}>; rel=prefetch,`,
		'',
	);

export const handleAppsArticle: RequestHandler = ({ body }, res) => {
	try {
		recordTypeAndPlatform('article', 'apps');
		const article = enhanceArticleType(body);
		const { html, clientScripts } = renderArticle(article);

		// The Android app will cache these assets to enable offline reading
		res.set('Link', makePrefetchHeader(clientScripts)).send(html);
	} catch (e) {
		res.status(500).send(`<pre>${getStack(e)}`);
	}
};
