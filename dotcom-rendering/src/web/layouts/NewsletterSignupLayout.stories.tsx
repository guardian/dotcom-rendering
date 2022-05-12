import { useEffect } from 'react';
import { ArticleDesign, ArticleDisplay } from '@guardian/libs';
import { storiesOf } from '@storybook/react';

import { decideFormat } from '../lib/decideFormat';
import { decidePalette } from '../lib/decidePalette';
import { mockRESTCalls } from '../lib/mockRESTCalls';
import { injectPrivacySettingsLink } from '../lib/injectPrivacySettingsLink';
import { embedIframe } from '../browser/embedIframe/embedIframe';
import { doStorybookHydration } from '../browser/islands/doStorybookHydration';
import { extractNAV } from '../../model/extract-nav';

import { NewletterSignupNews } from '../../../fixtures/generated/articles/NewletterSignupNews';
import { NewletterSignupNewsInteractive } from '../../../fixtures/generated/articles/NewletterSignupNewsInteractive';
import { NewletterSignupSports } from '../../../fixtures/generated/articles/NewletterSignupSports';
import { NewsletterSignupLayout } from './NewsletterSignupLayout';

mockRESTCalls();

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

const Fixtures: Record<string, CAPIArticleType> = {
	News: NewletterSignupNews,
	'News-interactive': NewletterSignupNewsInteractive,
	Sports: NewletterSignupSports,
};

Object.entries(Fixtures).forEach((entry) => {
	const [name, fixture] = entry;
	stories.add(name, () => {
		return <HydratedLayout ServerCAPI={fixture} />;
	});
});
