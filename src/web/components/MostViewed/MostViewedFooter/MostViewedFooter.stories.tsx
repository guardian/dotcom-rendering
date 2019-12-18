import React from 'react';
import fetchMock from 'fetch-mock';

import { Section } from '@frontend/web/components/Section';

import { MostViewedFooter } from './MostViewedFooter';
import {
    responseWithTwoTabs,
    responseWithOneTab,
} from './MostViewedFooter.mocks';

/* tslint:disable */
export default {
    component: MostViewedFooter,
    title: 'Components/MostViewedFooter',
};
/* tslint:enable */

export const withTwoTabs = () => {
    fetchMock.restore().getOnce('*', {
        status: 200,
        body: responseWithTwoTabs,
    });

    return (
        <Section>
            <MostViewedFooter pillar="news" sectionName="politics" />;
        </Section>
    );
};
withTwoTabs.story = { name: 'with two tabs' };

export const withOneTabs = () => {
    fetchMock.restore().getOnce('*', {
        status: 200,
        body: responseWithOneTab,
    });

    return (
        <Section>
            <MostViewedFooter pillar="news" />;
        </Section>
    );
};
withOneTabs.story = { name: 'with one tab' };
