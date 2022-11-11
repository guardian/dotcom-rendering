import type { EmotionCache } from '@emotion/cache';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { renderToString } from 'react-dom/server';
import type { NewslettersPageModel } from '../../model/pageModel';
import type { NewslettersListProps } from '../components/stand-alone/NewslettersList';
import { NewslettersList } from '../components/stand-alone/NewslettersList';
import { StandAlonePage } from '../components/StandAlonePage';
import { populatePageTemplate } from './stand-alone-pages/populatePageTemplate';

const buildNewslettersPage = (
	model: NewslettersPageModel,
	cache: EmotionCache,
) => {
	const props: NewslettersListProps = {
		newsletters: model.newsletters,
	};

	return renderToString(
		<CacheProvider value={cache}>
			<StandAlonePage {...model}>
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

	const html = buildNewslettersPage(model, cache);

	return populatePageTemplate(model, html, cache);
};
