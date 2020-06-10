import React from 'react';
import { css } from 'emotion';

import { calloutCampaign } from '@root/fixtures/calloutCampaign';
import { Callout } from './Callout';

export default {
    component: Callout,
    title: 'Components/Callout',
};

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
