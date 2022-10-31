import { calloutCampaign } from '../../../../fixtures/manual/calloutCampaign';
import { Form } from './Form';

// import { css } from '@emotion/react';

// storybook structure
export default {
	component: Form,
	title: 'Components/CalloutNew/Form',
};

export const Default = () => {
	return <Form callout={calloutCampaign} />;
};

Default.story = { name: 'default' };
