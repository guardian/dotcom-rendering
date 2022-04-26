import { useEffect } from 'react';

import { breakpoints } from '@guardian/source-foundations';

import { decideFormat } from '../lib/decideFormat';

import { Live } from '../../../fixtures/generated/articles/Live';

import { embedIframe } from '../browser/embedIframe/embedIframe';
import { mockRESTCalls } from '../lib/mockRESTCalls';
import { injectPrivacySettingsLink } from '../lib/injectPrivacySettingsLink';

import { extractNAV } from '../../model/extract-nav';
import { DecideLayout } from './DecideLayout';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';

mockRESTCalls();

export default {
	title: 'FullPage/LiveBlog',
	parameters: {
		chromatic: {
			viewports: [breakpoints.wide],
			pauseAnimationAtEnd: true,
		},
	},
};

// HydratedLayout is used here to simulated the hydration that happens after we init react on
// the client. We need a separate component so that we can make use of useEffect to ensure
// the hydrate step only runs once the dom has been rendered.
const HydratedLayout = ({
	ServerCAPI,
	modifyPage,
}: {
	ServerCAPI: CAPIArticleType;
	modifyPage?: () => void;
}) => {
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
	if (modifyPage) {
		modifyPage();
	}
	return <DecideLayout CAPIArticle={ServerCAPI} NAV={NAV} format={format} />;
};

export const NoKeyEvents = (): React.ReactNode => {
	const BlogWithoutKeyEvents = {
		...Live,
		format: {
			...Live.format,
			display: 'StandardDisplay' as CAPIDisplay,
			design: 'LiveBlogDesign' as CAPIDesign,
		},
		keyEvents: [],
	};
	return <HydratedLayout ServerCAPI={BlogWithoutKeyEvents} />;
};
