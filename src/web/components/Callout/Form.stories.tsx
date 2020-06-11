import React from 'react';
import { css } from 'emotion';

import { calloutCampaign } from '@root/fixtures/calloutCampaign';
import { Form } from './Form';

export default {
    component: Form,
    title: 'Components/Callout/Form',
};

export const Default = () => {
    return (
        <div
            className={css`
                width: 630px;
                padding: 15px;
            `}
        >
            <Form
                formFields={calloutCampaign.formFields}
                submitForm={() => {}}
                formId={1234}
            />
        </div>
    );
};
Default.story = { name: 'default' };

export const WithError = () => {
    return (
        <div
            className={css`
                width: 630px;
                padding: 15px;
            `}
        >
            <Form
                formFields={calloutCampaign.formFields}
                submitForm={() => {}}
                formId={1234}
                error="I am a form error"
            />
        </div>
    );
};
WithError.story = { name: 'with errors' };
