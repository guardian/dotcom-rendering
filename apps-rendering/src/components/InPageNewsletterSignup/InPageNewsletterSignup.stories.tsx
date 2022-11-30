// ----- Imports ----- //
import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { FC } from 'react';
import { selectDesign, selectPillar } from 'storybookHelpers';
import InPageNewsletterSignup from '.';

// ---- Constants ---- //
const TEST_NEWSLETTER = {
	identityName: 'patriarchy',
	description:
		'Reviewing the most important stories on feminism and sexism and those fighting for equality',
	name: 'The Week in Patriarchy',
	frequency: 'Weekly',
	theme: 'opinion',
	successDescription: "We'll send you The Week in Patriarchy every week",
};

// ----- Stories ----- //

const Default: FC = () => (
	<InPageNewsletterSignup
		newsletter={TEST_NEWSLETTER}
		format={{
			design: selectDesign(ArticleDesign.NewsletterSignup),
			display: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.News),
		}}
		defaultTo={'form'}
	/>
);

const Unsupported: FC = () => (
	<InPageNewsletterSignup
		newsletter={TEST_NEWSLETTER}
		format={{
			design: selectDesign(ArticleDesign.NewsletterSignup),
			display: ArticleDisplay.Standard,
			theme: selectPillar(ArticlePillar.News),
		}}
		defaultTo={'fallback'}
	/>
);

// ----- Exports ----- //

export default {
	component: InPageNewsletterSignup,
	title: 'AR/InPageNewsletterSignup',
};

export { Default, Unsupported };
