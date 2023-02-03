import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { renderToString } from 'react-dom/server';
import { extractNAV } from '../../model/extract-nav';
import type { DCRNewslettersPageType } from '../../types/newslettersPage';
import { NewslettersList } from '../components/NewslettersList';
import { StandAlonePage } from '../layouts/StandAlonePage';
import { populatePageTemplate } from './populatePageTemplate';

export const newslettersToHtml = (model: DCRNewslettersPageType): string => {
	const NAV = extractNAV(model.nav);
	const key = 'dcr';
	const cache = createCache({ key });
	const html = renderToString(
		<CacheProvider value={cache}>
			<StandAlonePage model={model} nav={NAV}>
				<NewslettersList
					newsletters={model.newsletters}
					headingText={model.webTitle}
					mmaUrl={model.config.mmaUrl}
					editionId={model.editionId}
				/>
			</StandAlonePage>
		</CacheProvider>,
	);

	return populatePageTemplate(model, html, cache);
};
