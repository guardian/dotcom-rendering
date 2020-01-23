import React from 'react';
import fetchMock from 'fetch-mock';

import { Section } from '@frontend/web/components/Section';

import { MostViewedFooter } from './MostViewedFooter';
import {
    responseWithTwoTabs,
    responseWithOneTab,
    responseWithMissingImage,
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
            <MostViewedFooter
                pillar="news"
                sectionName="politics"
                ajaxUrl="https://api.nextgen.guardianapps.co.uk"
            />
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
            <MostViewedFooter
                pillar="news"
                ajaxUrl="https://api.nextgen.guardianapps.co.uk"
            />
        </Section>
    );
};
withOneTabs.story = { name: 'with one tab' };

export const withNoMostSharedImage = () => {
    fetchMock.restore().getOnce('*', {
        status: 200,
        body: responseWithMissingImage,
    });

    return (
        <Section>
            <MostViewedFooter
                pillar="news"
                ajaxUrl="https://api.nextgen.guardianapps.co.uk"
            />
        </Section>
    );
};
withNoMostSharedImage.story = { name: 'with a missing image on most shared' };
