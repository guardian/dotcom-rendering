import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import fetchMock from 'fetch-mock';
import { campaignDescription, mockCampaign } from 'fixtures/campaign';
import type { ReactElement } from 'react';
import Callout from '.';

const mockFormat: ArticleFormat = {
	theme: ArticlePillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 2);
const pastDate = new Date();
pastDate.setDate(pastDate.getDate() - 1);

const callout = (): ReactElement => {
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
		<Callout
			name={mockCampaign.name}
			prompt="Share your experience"
			heading={mockCampaign.fields.callout}
			formId={mockCampaign.fields.formId}
			formFields={mockCampaign.fields.formFields}
			format={mockFormat}
			isNonCollapsible={false}
			activeUntil={futureDate.getTime()}
			description={campaignDescription}
			contacts={mockCampaign.fields.contacts}
		/>
	);
};

const closedCallout = (): ReactElement => (
	<Callout
		name={mockCampaign.name}
		prompt="Share your experience"
		heading={mockCampaign.fields.callout}
		formId={mockCampaign.fields.formId}
		formFields={mockCampaign.fields.formFields}
		format={mockFormat}
		isNonCollapsible={true}
		activeUntil={pastDate.getTime()}
		description={campaignDescription}
		contacts={mockCampaign.fields.contacts}
	/>
);
const nonCollapsableCallout = (): ReactElement => {
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
		<Callout
			isNonCollapsible={true}
			name={mockCampaign.name}
			prompt="Share your experience"
			heading={mockCampaign.fields.callout}
			formId={mockCampaign.fields.formId}
			formFields={mockCampaign.fields.formFields}
			format={mockFormat}
			activeUntil={futureDate.getTime()}
			description={campaignDescription}
			contacts={mockCampaign.fields.contacts}
		/>
	);
};
const minimalCallout = (): ReactElement => {
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
		<>A callouts prompt, title and description are optional
		<Callout
			isNonCollapsible={true}
			name={mockCampaign.name}
			formId={mockCampaign.fields.formId}
			formFields={mockCampaign.fields.formFields}
			format={mockFormat}
			activeUntil={futureDate.getTime()}
			contacts={mockCampaign.fields.contacts}
			prompt=""
			heading=""
			/>
			</>
	);
};

const calloutWithFormFailure = (): ReactElement => {
	fetchMock
		.restore()
		.post(
			'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
			{
				status: 400,
				body: null,
			},
		);
	return (
		<Callout
			isNonCollapsible={true}
			name={mockCampaign.name}
			prompt="Share your experience"
			heading={mockCampaign.fields.callout}
			formId={mockCampaign.fields.formId}
			formFields={mockCampaign.fields.formFields}
			format={mockFormat}
			activeUntil={futureDate.getTime()}
			description={campaignDescription}
			contacts={mockCampaign.fields.contacts}
		/>
	);
};

export default {
	component: callout,
	title: 'AR/Callout',
};

export {
	callout,
	closedCallout,
	nonCollapsableCallout,
	calloutWithFormFailure,
	minimalCallout,
};
