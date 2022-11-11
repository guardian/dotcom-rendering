import type { EmotionCache } from '@emotion/cache';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { renderToString } from 'react-dom/server';
import type { NewslettersPageModel } from '../../model/pageModel';
import type { NewslettersListProps } from '../components/stand-alone/NewslettersList';
import { NewslettersList } from '../components/stand-alone/NewslettersList';
import { StandAlonePage } from '../components/StandAlonePage';
import { extractExpeditedIslands } from './extractIslands';
import { pageTemplate } from './pageTemplate';
import {
	getGaPath,
	getLowPriorityScriptTags,
	getPriorityScriptTags,
} from './stand-alone-pages/scriptTags';

const buildNewslettersPage = (
	model: NewslettersPageModel,
	cache: EmotionCache,
) => {
	const props: NewslettersListProps = {
		newsletters: model.newsletters,
	};

	return renderToString(
		<CacheProvider value={cache}>
			<StandAlonePage
				subscribeUrl={model.nav.readerRevenueLinks.header.subscribe}
				editionId={model.editionId}
				nav={model.nav}
				footer={model.footer}
			>
				<NewslettersList {...props} />
			</StandAlonePage>
		</CacheProvider>,
	);
};

export const newslettersToHtml = (
	model: NewslettersPageModel,
): string | undefined => {
	const key = 'dcr';
	const cache = createCache({ key });

	// eslint-disable-next-line @typescript-eslint/unbound-method -- because
	const { extractCriticalToChunks, constructStyleTagsFromChunks } =
		createEmotionServer(cache);

	const html = buildNewslettersPage(model, cache);

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
		title: 'email newsletters',
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
