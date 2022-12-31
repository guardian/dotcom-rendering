import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import { calloutCampaign } from '../../../../fixtures/manual/calloutCampaignV2';
import { Form } from './Form';
import fetchMock from 'fetch-mock';

const mockFormatNews = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticlePillar.News,
};

const mockFormatOpinion = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticlePillar.Opinion,
};

export default {
	component: Form,
	title: 'Components/Callout/Form',
};

export const News = () => {
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
		<>
			<Form
				format={mockFormatNews}
				formFields={calloutCampaign.formFields}
				submissionURL={calloutCampaign.calloutsUrl}
				formID={calloutCampaign.formId}
			/>
			;
		</>
	);
};

News.story = { name: 'News' };

export const Opinion = () => {
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
		<>
			<Form
				format={mockFormatOpinion}
				formFields={calloutCampaign.formFields}
				submissionURL={calloutCampaign.calloutsUrl}
				formID={calloutCampaign.formId}
			/>
			;
		</>
	);
};

Opinion.story = { name: 'Opinion' };
