import { css } from '@emotion/react';
import {
	calloutCampaign,
	calloutCampaignOnlyTwoRadio,
} from '../../../fixtures/manual/calloutCampaign';
import { Form } from './Form';

export default {
	component: Form,
	title: 'Components/Callout Embed Block Component/Form',
};

export const Default = () => {
	return (
		<div
			css={css`
				width: 630px;
				padding: 15px;
			`}
		>
			<Form formFields={calloutCampaign.formFields} onSubmit={() => {}} />
		</div>
	);
};
Default.storyName = 'default';

export const WithOnlyTwoRadio = () => {
	return (
		<div
			css={css`
				width: 630px;
				padding: 15px;
			`}
		>
			<Form
				formFields={calloutCampaignOnlyTwoRadio.formFields}
				onSubmit={() => {}}
			/>
		</div>
	);
};
WithOnlyTwoRadio.storyName = 'with only two radio';

export const WithError = () => {
	return (
		<div
			css={css`
				width: 630px;
				padding: 15px;
			`}
		>
			<Form
				formFields={calloutCampaign.formFields}
				onSubmit={() => {}}
				error="I am a form error"
			/>
		</div>
	);
};
WithError.storyName = 'with errors';
