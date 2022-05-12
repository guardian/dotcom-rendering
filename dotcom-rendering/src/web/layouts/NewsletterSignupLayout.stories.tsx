import { useEffect } from 'react';

import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { storiesOf } from '@storybook/react';

import { decideFormat } from '../lib/decideFormat';

import { NewletterSignup } from '../../../fixtures/generated/articles/NewletterSignup';

import { embedIframe } from '../browser/embedIframe/embedIframe';
import { mockRESTCalls } from '../lib/mockRESTCalls';
import { injectPrivacySettingsLink } from '../lib/injectPrivacySettingsLink';

import { extractNAV } from '../../model/extract-nav';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';
import { NewsletterSignupLayout } from './NewsletterSignupLayout';
import { decidePalette } from '../lib/decidePalette';

mockRESTCalls();

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

	const newsletterFormat = {
		theme: format.theme,
		design: ArticleDesign.NewsletterSignup,
		display: ArticleDisplay.Standard,
	};
	const newsletterPalette = decidePalette(newsletterFormat);

	return (
		<NewsletterSignupLayout
			CAPIArticle={ServerCAPI}
			NAV={NAV}
			format={newsletterFormat}
			palette={newsletterPalette}
		/>
	);
};


const stories = storiesOf(`Layouts/NewsletterSignUp`, module).addParameters({
	chromatic: {
		diffThreshold: 0.2,
		pauseAnimationAtEnd: true,
	},
});


stories.add('Moving the goalposts', () => {
	return (
		<HydratedLayout
			ServerCAPI={NewletterSignup}
		/>
	);
});
