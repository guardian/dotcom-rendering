import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import fetchMock from 'fetch-mock';
import { calloutCampaign as calloutCampaignV2 } from '../../../fixtures/manual/calloutCampaignV2';
import { CalloutBlockComponent } from './CalloutBlockComponent.importable';

const mockFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticlePillar.Opinion,
};

const tomorrow = new Date().setDate(new Date().getDate() + 1) / 1000;
const yesterday = new Date().setDate(new Date().getDate() - 1) / 1000;

const goodRequest = () => {
	fetchMock
		.restore()
		.post(
			'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
			{
				status: 201,
				body: null,
			},
		);
};

const badRequest = () => {
	fetchMock
		.restore()
		.post(
			'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
			{
				status: 400,
				body: null,
			},
		);
};

export const Collapsible = () => {
	goodRequest();
	return (
		<CalloutBlockComponent
			callout={{
				...calloutCampaignV2,
				isNonCollapsible: false,
				activeUntil: tomorrow,
			}}
			format={mockFormat}
		/>
	);
};

Collapsible.story = { name: 'Collapsible' };

export const NonCollapsible = () => {
	goodRequest();
	return (
		<CalloutBlockComponent
			callout={{ ...calloutCampaignV2, activeUntil: tomorrow }}
			format={mockFormat}
		/>
	);
};

NonCollapsible.story = { name: 'NonCollapsible' };

export const SubmissionFailure = () => {
	badRequest();
	return (
		<CalloutBlockComponent
			callout={{ ...calloutCampaignV2, activeUntil: tomorrow }}
			format={mockFormat}
		/>
	);
};

SubmissionFailure.story = { name: 'Submission Failure' };

export default {
	component: CalloutBlockComponent,
	title: 'Components/CalloutBlockComponent',
};

export const Expired = () => {
	return (
		<CalloutBlockComponent
			callout={{ ...calloutCampaignV2, activeUntil: yesterday }}
			format={mockFormat}
		/>
	);
};

Expired.story = { name: 'Expired' };
