import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import fetchMock from 'fetch-mock';
import { calloutCampaign } from '../../../../fixtures/manual/calloutCampaignV2';
import { Form } from './Form';

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
	title: 'Components/CalloutBlockComponent/Form',
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
				formID={calloutCampaign.formId}
				submissionURL={calloutCampaign.calloutsUrl}
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
				formID={calloutCampaign.formId}
				submissionURL={calloutCampaign.calloutsUrl}
			/>
			;
		</>
	);
};

Opinion.story = { name: 'Opinion' };
