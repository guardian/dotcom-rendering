import fetchMock from 'fetch-mock';
import { calloutCampaign } from '../../../../fixtures/manual/calloutCampaignV2';
import { Form } from './Form';

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
				formFields={calloutCampaign.formFields}
				formID={calloutCampaign.formId.toString()}
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
				formFields={calloutCampaign.formFields}
				formID={calloutCampaign.formId.toString()}
				submissionURL={calloutCampaign.calloutsUrl}
			/>
			;
		</>
	);
};

Opinion.story = { name: 'Opinion' };
