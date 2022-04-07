import { useEffect } from 'react';

import { decideFormat } from '../lib/decideFormat';

import { Article } from '../../../fixtures/generated/articles/Article';

import { embedIframe } from '../browser/embedIframe/embedIframe';
import { mockRESTCalls } from '../lib/mockRESTCalls';
import { injectPrivacySettingsLink } from '../lib/injectPrivacySettingsLink';

import { extractNAV } from '../../model/extract-nav';
import { DecideLayout } from './DecideLayout';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';

mockRESTCalls();

export default {
	title: 'Layouts/InteractiveImmersive',
	parameters: {
		chromatic: { viewports: [1300], delay: 800, diffThreshold: 0.2 },
	},
};

const convertToInteractiveImmersive = (CAPIArticle: CAPIArticleType) => {
	return {
		...CAPIArticle,
		format: {
			...CAPIArticle.format,
			display: 'ImmersiveDisplay' as CAPIDisplay,
			design: 'InteractiveDesign' as CAPIDesign,
		},
	};
};

// HydratedLayout is used here to simulated the hydration that happens after we init react on
// the client. We need a separate component so that we can make use of useEffect to ensure
// the hydrate step only runs once the dom has been rendered.
const HydratedLayout = ({ ServerCAPI }: { ServerCAPI: CAPIArticleType }) => {
	const NAV = extractNAV(ServerCAPI.nav);
	const format: ArticleFormat = decideFormat(ServerCAPI.format);

	useEffect(() => {
		embedIframe().catch((e) =>
			console.error(`HydratedLayout embedIframe - error: ${e}`),
		);
		// Manually updates the footer DOM because it's not hydrated
		injectPrivacySettingsLink();
		doStorybookHydration();
	}, [ServerCAPI]);
	return <DecideLayout CAPIArticle={ServerCAPI} NAV={NAV} format={format} />;
};

export const ArticleStory = (): React.ReactNode => {
	const ServerCAPI = convertToInteractiveImmersive(Article);
	return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
ArticleStory.story = { name: 'Article' };
