import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import fetchMock from 'fetch-mock';
import { calloutCampaign as calloutCampaignV2 } from '../../../fixtures/manual/calloutCampaignV2';
import { CalloutBlockComponent } from './CalloutBlockComponent.importable';

const mockFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticlePillar.Opinion,
};

export const Collapsible = () => {
	fetchMock
		.restore()
		.post(
			'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
			{
				status: 201,
				body: null,
			},
		);
	return (
		<CalloutBlockComponent
			callout={{ ...calloutCampaignV2, isNonCollapsible: false }}
			format={mockFormat}
		/>
	);
};

Collapsible.story = { name: 'Collapsible' };

export const NonCollapsible = () => {
	fetchMock
		.restore()
		.post(
			'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
			{
				status: 201,
				body: null,
			},
		);
	return (
		<CalloutBlockComponent
			callout={calloutCampaignV2}
			format={mockFormat}
		/>
	);
};

NonCollapsible.story = { name: 'NonCollapsible' };

export default {
	component: CalloutBlockComponent,
	title: 'Components/CalloutBlockComponent',
};
