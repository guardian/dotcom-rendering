import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	Pillar,
} from '../../articleFormat';
import { campaignDescription, mockCampaign } from 'fixtures/campaign';
import type { ReactElement } from 'react';
import Callout from '.';

const mockFormat: ArticleFormat = {
	theme: Pillar.News,
	design: ArticleDesign.Standard,
	display: ArticleDisplay.Standard,
};

const futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 2);
const pastDate = new Date();
pastDate.setDate(pastDate.getDate() - 1);

const mockFetch =
	(mockedStatus: number) => (input: RequestInfo, init?: RequestInit) => {
		const url = input.toString();

		if (
			url ===
				'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit' &&
			init?.method === 'POST'
		) {
			console.log(`url called: ${url}`);
			return Promise.resolve(
				new Response(null, { status: mockedStatus }),
			);
		} else {
			return Promise.resolve(
				new Response(JSON.stringify({ error: 'Not Found' }), {
					status: 404,
				}),
			);
		}
	};

const callout = (): ReactElement => {
	global.fetch = mockFetch(201) as unknown as typeof fetch;
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
	global.fetch = mockFetch(201) as unknown as typeof fetch;
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
	global.fetch = mockFetch(201) as unknown as typeof fetch;
	return (
		<>
			A callouts prompt, title and description are optional
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
	global.fetch = mockFetch(400) as unknown as typeof fetch;
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
