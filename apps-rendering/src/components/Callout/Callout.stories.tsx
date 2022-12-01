import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import type { ArticleFormat } from '@guardian/libs';
import { campaignDescription, mockCampaign } from 'fixtures/campaign';
import fetchMock from 'fetch-mock';
import Int64 from 'node-int64';
import type { ReactElement } from 'react';
import { callouts } from '../../client/callouts';
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
	setTimeout(() => {callouts()}, 1000);
	return (<Callout
		name={mockCampaign.name}
		heading={mockCampaign.fields.callout}
		formId={mockCampaign.fields.formId}
		formFields={mockCampaign.fields.formFields}
		format={mockFormat}
		isNonCollapsible={false}
		activeUntil={new Int64(futureDate.getTime())}
		description={campaignDescription}
	/>
)};

const closedCallout = (): ReactElement => (
	<Callout
		name={mockCampaign.name}
		heading={mockCampaign.fields.callout}
		formId={mockCampaign.fields.formId}
		formFields={mockCampaign.fields.formFields}
		format={mockFormat}
		isNonCollapsible={true}
		activeUntil={new Int64(pastDate.getTime())}
		description={campaignDescription}
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
	setTimeout(() => {callouts()}, 1000);
	return (
	<Callout
		isNonCollapsible={true}
		name={mockCampaign.name}
		heading={mockCampaign.fields.callout}
		formId={mockCampaign.fields.formId}
		formFields={mockCampaign.fields.formFields}
		format={mockFormat}
		activeUntil={new Int64(futureDate.getTime())}
		description={campaignDescription}
	/>
)};

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
	setTimeout(() => {callouts()}, 1000);
	return (<Callout
		isNonCollapsible={true}
		name={mockCampaign.name}
		heading={mockCampaign.fields.callout}
		formId={mockCampaign.fields.formId}
		formFields={mockCampaign.fields.formFields}
		format={mockFormat}
		activeUntil={new Int64(futureDate.getTime())}
		description={campaignDescription}
	/>
)};

export default {
	component: callout,
	title: 'AR/Callout',
};

export { callout, closedCallout, nonCollapsableCallout, calloutWithFormFailure };
