import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { campaignDescription, mockCampaign } from 'fixtures/campaign';
import type { ReactElement } from 'react';
import Callout from '.';
import { handleSubmission } from '../../client/callouts';

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
		// Temporary fix to avoid the storybook error as storybook doesn't like the submit in an iframe
		onSubmit={(e) => {e.preventDefault(); handleSubmission()}}
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
