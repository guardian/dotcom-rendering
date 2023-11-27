import type { ArticleFormat } from '@guardian/libs';
import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import type { StoryObj } from '@storybook/react';
import fetchMock from 'fetch-mock';
import {
	splitTheme,
	type StoryProps,
} from '../../.storybook/decorators/splitThemeDecorator';
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

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: Pillar.News,
} satisfies ArticleFormat;

export default {
	component: CalloutBlockComponent,
	title: 'Components/CalloutBlockComponent',
};

export const Collapsible: StoryObj = ({ format }: StoryProps) => {
	goodRequest();
	return (
		<CalloutBlockComponent
			callout={{
				...calloutCampaignV2,
				isNonCollapsible: false,
				activeUntil: tomorrow,
			}}
			pageId={pageId}
			format={format}
		/>
	);
};

Collapsible.decorators = [splitTheme([defaultFormat])];

export const NonCollapsible: StoryObj = ({ format }: StoryProps) => {
	goodRequest();
	return (
		<CalloutBlockComponent
			callout={{ ...calloutCampaignV2, activeUntil: tomorrow }}
			pageId={pageId}
			format={format}
		/>
	);
};
NonCollapsible.storyName = 'NonCollapsible';
NonCollapsible.decorators = [splitTheme([defaultFormat])];

export const SubmissionFailure: StoryObj = ({ format }: StoryProps) => {
	badRequest();
	return (
		<CalloutBlockComponent
			callout={{ ...calloutCampaignV2, activeUntil: tomorrow }}
			pageId={pageId}
			format={format}
		/>
	);
};
SubmissionFailure.decorators = [splitTheme([defaultFormat])];

export const Expired: StoryObj = ({ format }: StoryProps) => {
	return (
		<CalloutBlockComponent
			callout={{ ...calloutCampaignV2, activeUntil: yesterday }}
			pageId={pageId}
			format={format}
		/>
	);
};
Expired.decorators = [splitTheme([defaultFormat])];

export const MinimalCallout: StoryObj = ({ format }: StoryProps) => {
	return (
		<>
			<div css={{ fontWeight: 'bold', paddingBottom: '16px' }}>
				Prompt, title and description are all optional
			</div>
			<CalloutBlockComponent
				callout={{
					...calloutCampaignV2,
					activeUntil: tomorrow,
					isNonCollapsible: false,
					title: '',
					prompt: '',
					description: '',
				}}
				pageId={pageId}
				format={format}
			/>
		</>
	);
};
MinimalCallout.decorators = [splitTheme([defaultFormat])];
