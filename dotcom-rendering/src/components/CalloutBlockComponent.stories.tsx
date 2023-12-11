import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { StoryObj } from '@storybook/react';
import fetchMock from 'fetch-mock';
import { splitTheme } from '../../.storybook/decorators/splitThemeDecorator';
import { calloutCampaign as calloutCampaignV2 } from '../../fixtures/manual/calloutCampaignV2';
import { CalloutBlockComponent } from './CalloutBlockComponent.importable';

const tomorrow = new Date().setDate(new Date().getDate() + 1) / 1000;
const yesterday = new Date().setDate(new Date().getDate() - 1) / 1000;
const pageId =
	'world/2023/mar/01/tell-us-have-you-been-affected-by-the-train-crash-in-greece';

const goodRequest = () => {
	fetchMock
		.restore()
		.post(
			'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
			{
				status: 201,
				body: null,
			},
		)
		.spy('end:.hot-update.json');
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
		)
		.spy('end:.hot-update.json');
};

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
	goodRequest();
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
	goodRequest();
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
	badRequest();
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
