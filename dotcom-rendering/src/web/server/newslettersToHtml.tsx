import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { renderToString } from 'react-dom/server';
import type { NewslettersPageModel } from '../../model/pageModel';
import { NewslettersList } from '../components/stand-alone/NewslettersList';
import { StandAlonePage } from '../layouts/StandAlonePage';
import { populatePageTemplate } from './populatePageTemplate';

export const newslettersToHtml = (model: NewslettersPageModel): string => {
	const key = 'dcr';
	const cache = createCache({ key });
	const html = renderToString(
		<CacheProvider value={cache}>
			<StandAlonePage {...model}>
				<NewslettersList newsletters={model.newsletters} />
			</StandAlonePage>
		</CacheProvider>,
	);

	return populatePageTemplate(model, html, cache);
};
