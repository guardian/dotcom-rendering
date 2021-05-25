import { css } from '@emotion/react';

import {
	calloutCampaign,
	calloutCampaignOnlyTwoRadio,
} from '@root/fixtures/manual/calloutCampaign';
import { Form } from './Form';

export default {
	component: Form,
	title: 'Components/Callout/Form',
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
Default.story = { name: 'default' };

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
WithOnlyTwoRadio.story = { name: 'with only two radio' };

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
WithError.story = { name: 'with errors' };
