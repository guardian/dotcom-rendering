import type { EmotionCache } from '@emotion/cache';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import type { Request } from 'express';
import { renderToString } from 'react-dom/server';
import { TestContent } from '../../components/stand-alone/TestContent';
import type { TestContentProps } from '../../components/stand-alone/TestContent';
import { StandAlonePage } from '../../components/StandAlonePage';
import { extractExpeditedIslands } from '../extractIslands';
import { pageTemplate } from '../pageTemplate';
import {
	getGaPath,
	getLowPriorityScriptTags,
	getPriorityScriptTags,
} from './scriptTags';

type StandAlonePageBuilder = { (req: Request, cache: EmotionCache): string };

const buildTestPageContent: StandAlonePageBuilder = (req, cache) => {
	const props: TestContentProps = {
		message: `the app is called ${req.app.name}`,
	};

	return renderToString(
		<CacheProvider value={cache}>
			<StandAlonePage subscribeLink="/" editionId="UK">
				<TestContent {...props} />
			</StandAlonePage>
		</CacheProvider>,
	);
};

const getStandAloneContent = (
	pageName: string,
	req: Request,
	cache: EmotionCache,
): string | undefined => {
	switch (pageName) {
		case 'test-page': {
			return buildTestPageContent(req, cache);
		}
		default: {
			return undefined;
		}
	}
};

export const buildStandAlonePage = (req: Request): string | undefined => {
	const key = 'dcr';
	const cache = createCache({ key });

	// eslint-disable-next-line @typescript-eslint/unbound-method -- because
	const { extractCriticalToChunks, constructStyleTagsFromChunks } =
		createEmotionServer(cache);

	const query = req.query as Record<string, string | undefined>;
	const { page: pageName } = query;

	const html = pageName
		? getStandAloneContent(pageName, req, cache)
		: undefined;

	if (!html) {
		return undefined;
	}

	const chunks = extractCriticalToChunks(html);
	const extractedCss = constructStyleTagsFromChunks(chunks);
	const expeditedIslands = extractExpeditedIslands(html);

	const offerHttp3 = false;

	const priorityScriptTags = getPriorityScriptTags(
		expeditedIslands,
		offerHttp3,
		false,
	);
	const lowPriorityScriptTags = getLowPriorityScriptTags(offerHttp3, false);
	const gaPath = getGaPath(false);

	return pageTemplate({
		linkedData: {},
		priorityScriptTags,
		lowPriorityScriptTags,
		css: extractedCss,
		html,
		title: pageName,
		description: 'page description for page',
		windowGuardian: '',
		gaPath,
		ampLink: undefined,
		openGraphData: undefined,
		twitterData: undefined,
		keywords: '',
		initTwitter: undefined,
		offerHttp3,
		canonicalUrl: undefined,
	});
};
