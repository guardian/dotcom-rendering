import { ArticleDesign, ArticleDisplay, Pillar } from '@guardian/libs';
import fetchMock from 'fetch-mock';
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
			pageId={pageId}
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			}}
		/>
	);
};

Collapsible.storyName = 'Collapsible';

export const NonCollapsible = () => {
	goodRequest();
	return (
		<CalloutBlockComponent
			callout={{ ...calloutCampaignV2, activeUntil: tomorrow }}
			pageId={pageId}
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			}}
		/>
	);
};

NonCollapsible.storyName = 'NonCollapsible';

export const SubmissionFailure = () => {
	badRequest();
	return (
		<CalloutBlockComponent
			callout={{ ...calloutCampaignV2, activeUntil: tomorrow }}
			pageId={pageId}
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			}}
		/>
	);
};

SubmissionFailure.storyName = 'Submission Failure';

export const Expired = () => {
	return (
		<CalloutBlockComponent
			callout={{ ...calloutCampaignV2, activeUntil: yesterday }}
			pageId={pageId}
			format={{
				display: ArticleDisplay.Standard,
				design: ArticleDesign.Standard,
				theme: Pillar.News,
			}}
		/>
	);
};

Expired.storyName = 'Expired';

export const MinimalCallout = () => {
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
				format={{
					display: ArticleDisplay.Standard,
					design: ArticleDesign.Standard,
					theme: Pillar.News,
				}}
			/>
		</>
	);
};

Expired.storyName = 'Expired';
