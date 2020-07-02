import React from 'react';
import { css } from 'emotion';
import fetchMock from 'fetch-mock';

import { calloutCampaign } from '@root/fixtures/calloutCampaign';
import { Callout } from './Callout';

export default {
    component: Callout,
    title: 'Components/Callout',
};

fetchMock
    .restore()
    .post(
        'https://callouts.code.dev-guardianapis.com/formstack-campaign/submit',
        {
            status: 201,
            body: null,
        },
    );

export const Default = () => {
    return (
        <div
            className={css`
                width: 630px;
                padding: 15px;
            `}
        >
            <Callout callout={calloutCampaign} pillar="news" />
        </div>
    );
};
Default.story = { name: 'default' };
