import { ArticleFormat, ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { mockCampaign, campaignDescription } from 'fixtures/campaign';
import Callout from '.';

const mockFormat: ArticleFormat = {
	theme: ArticlePillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

const callout = () => (
	<div style={{padding: '10px'}}>
		<Callout
			isNonCollapsable={false}
			format={mockFormat}
			campaign={mockCampaign}
			description={campaignDescription}
		/>
	</div>
);

const nonCollapsableCallout = () => (
	<div style={{padding: '10px'}}>
		<Callout
			isNonCollapsable={true}
			format={mockFormat}
			campaign={mockCampaign}
			description={campaignDescription}
		/>
	</div>
);



export default {
	component: callout,
	title: 'AR/Callout',
};

export { callout, nonCollapsableCallout };
