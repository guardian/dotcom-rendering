import { css } from '@emotion/react';
import {
	calloutCampaign,
	calloutCampaignOnlyTwoRadio,
} from '../../../fixtures/manual/calloutCampaign.ts';
import { Form } from './Form.tsx';

export default {
	component: Form,
	title: 'Components/CalloutEmbedBlockComponent/Form',
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
