import type { StoryObj } from '@storybook/react';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { calloutCampaign as calloutCampaignV2 } from '../../fixtures/manual/calloutCampaignV2';
import {
	ArticleDesign,
	ArticleDisplay,
	type ArticleFormat,
	Pillar,
} from '../lib/articleFormat';
import { CalloutBlockComponent } from './CalloutBlockComponent.importable';
import { customMockedFetch } from '../lib/mockRESTCalls';

const tomorrow = new Date().setDate(new Date().getDate() + 1) / 1000;
const yesterday = new Date().setDate(new Date().getDate() - 1) / 1000;
const pageId =
	'world/2023/mar/01/tell-us-have-you-been-affected-by-the-train-crash-in-greece';

const goodRequest = customMockedFetch([
	{
		mockedMethod: 'POST',
		mockedUrl:
			'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
		mockedStatus: 201,
	},
]);

const badRequest = customMockedFetch([
	{
		mockedMethod: 'POST',
		mockedUrl:
			'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
		mockedStatus: 400,
	},
]);

/** ensure that multiple form IDs are not present on the same page */
let counter = 0;

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
} satisfies ArticleFormat;

export default {
	component: CalloutBlockComponent,
	title: 'Components/CalloutBlockComponent',
};

export const Collapsible: StoryObj = () => {
	global.fetch = goodRequest;
	return (
		<CalloutBlockComponent
			callout={{
				...calloutCampaignV2,
				formId: calloutCampaignV2.formId + ++counter,
				isNonCollapsible: false,
				activeUntil: tomorrow,
			}}
			pageId={pageId}
		/>
	);
};

Collapsible.decorators = [splitTheme([defaultFormat])];

export const NonCollapsible: StoryObj = () => {
	global.fetch = goodRequest;
	return (
		<CalloutBlockComponent
			callout={{ ...calloutCampaignV2, activeUntil: tomorrow }}
			pageId={pageId}
		/>
	);
};
NonCollapsible.storyName = 'NonCollapsible';
NonCollapsible.decorators = [splitTheme([defaultFormat])];

export const SubmissionFailure: StoryObj = () => {
	global.fetch = badRequest;
	return (
		<CalloutBlockComponent
			callout={{ ...calloutCampaignV2, activeUntil: tomorrow }}
			pageId={pageId}
		/>
	);
};
SubmissionFailure.decorators = [splitTheme([defaultFormat])];
SubmissionFailure.play = async ({ canvasElement }) => {
	await new Promise((resolve) => {
		// there’s some weirdness that resets the form
		setTimeout(resolve, 600);
	});
	const buttons = [...canvasElement.querySelectorAll('button[type=submit]')];
	for (const button of buttons) {
		if (!(button instanceof HTMLButtonElement)) return;
		button.click();
	}
};

export const Expired: StoryObj = () => {
	return (
		<CalloutBlockComponent
			callout={{ ...calloutCampaignV2, activeUntil: yesterday }}
			pageId={pageId}
		/>
	);
};
Expired.decorators = [splitTheme([defaultFormat])];

export const MinimalCallout: StoryObj = () => {
	global.fetch = goodRequest;
	return (
		<>
			<div css={{ fontWeight: 'bold', paddingBottom: '16px' }}>
				Prompt, title and description are all optional
			</div>
			<CalloutBlockComponent
				callout={{
					...calloutCampaignV2,
					formId: calloutCampaignV2.formId + ++counter,
					activeUntil: tomorrow,
					isNonCollapsible: false,
					title: '',
					prompt: '',
					description: '',
				}}
				pageId={pageId}
			/>
		</>
	);
};
MinimalCallout.decorators = [splitTheme([defaultFormat])];
