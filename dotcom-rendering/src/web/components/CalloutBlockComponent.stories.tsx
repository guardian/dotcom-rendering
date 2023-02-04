import fetchMock from 'fetch-mock';
import { calloutCampaign as calloutCampaignV2 } from '../../../fixtures/manual/calloutCampaignV2';
import { CalloutBlockComponent } from './CalloutBlockComponent.importable';

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

export default {
	component: CalloutBlockComponent,
	title: 'Components/CalloutBlockComponent',
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
		/>
	);
};

Collapsible.story = { name: 'Collapsible' };

export const NonCollapsible = () => {
	goodRequest();
	return (
		<CalloutBlockComponent
			callout={{ ...calloutCampaignV2, activeUntil: tomorrow }}
		/>
	);
};

NonCollapsible.story = { name: 'NonCollapsible' };

export const SubmissionFailure = () => {
	badRequest();
	return (
		<CalloutBlockComponent
			callout={{ ...calloutCampaignV2, activeUntil: tomorrow }}
		/>
	);
};

SubmissionFailure.story = { name: 'Submission Failure' };

export const Expired = () => {
	return (
		<CalloutBlockComponent
			callout={{ ...calloutCampaignV2, activeUntil: yesterday }}
		/>
	);
};

Expired.story = { name: 'Expired' };
