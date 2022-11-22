import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { campaignDescription, mockCampaign } from 'fixtures/campaign';
import type { ReactElement } from 'react';
import Callout from '.';

const mockFormat: ArticleFormat = {
	theme: ArticlePillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

const callout = (): ReactElement => (
	<Callout
		isNonCollapsable={false}
		format={mockFormat}
		campaign={mockCampaign}
		description={campaignDescription}
	/>
);

const nonCollapsableCallout = (): ReactElement => (
	<Callout
		isNonCollapsable={true}
		format={mockFormat}
		campaign={mockCampaign}
		description={campaignDescription}
	/>
);

export default {
	component: callout,
	title: 'AR/Callout',
};

export { callout, nonCollapsableCallout };
