import { ArticleDesign, ArticleDisplay, ArticlePillar } from '@guardian/libs';
import fetchMock from 'fetch-mock';
import { MessageForm } from '../../../fixtures/manual/message-us-form';
import { Section } from './Section';
import { SendAMessage } from './SendAMessage.importable';

export default {
	component: SendAMessage,
	title: 'Components/MessageUs',
	parameters: {
		chromatic: { diffThreshold: 0.2 },
	},
};

const defaultFormat = {
	display: ArticleDisplay.Standard,
	design: ArticleDesign.Standard,
	theme: ArticlePillar.News,
};

const goodRequest = () => {
	fetchMock
		.restore()
		.post(
			'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
			{
				status: 201,
				body: null,
			},
		);
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
		);
};

export const Default = () => {
	goodRequest();
	return (
		<Section>
			<SendAMessage
				formFields={MessageForm.formFields}
				formId={MessageForm.formId}
				format={defaultFormat}
				pageId=""
			/>
		</Section>
	);
};

export const SubmissionFailure = () => {
	badRequest();
	return (
		<Section>
			<SendAMessage
				formFields={MessageForm.formFields}
				formId={MessageForm.formId}
				format={defaultFormat}
				pageId=""
			/>
		</Section>
	);
};
Default.storyName = 'default';
