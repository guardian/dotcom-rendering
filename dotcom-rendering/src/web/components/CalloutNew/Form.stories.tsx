import { calloutCampaign } from '../../../../fixtures/manual/calloutCampaign';
import { Form } from './Form';

// import { css } from '@emotion/react';

// storybook structure
export default {
	component: Form,
	title: 'Components/CalloutNew/Form',
};

// convention for getting something into storybook
export const Default = () => {
	return <Form formFields={calloutCampaign} />;
};

Default.story = { name: 'default' };
