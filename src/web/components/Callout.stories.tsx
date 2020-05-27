import React from 'react';
import { css } from 'emotion';

import { Callout } from './Callout';
import { rootConfig } from '@root/fixtures/rootConfig';

export default {
    component: Callout,
    title: 'Components/Callout',
};

export const Default = () => {
    return (
        <div
            className={css`
                width: 630px;
            `}
        >
            {/*
            // @ts-ignore */}
            <Callout campaign={rootConfig.page.campaigns[0]} />
        </div>
    );
};
Default.story = { name: 'default' };
