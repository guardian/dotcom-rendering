import React from 'react';
import fetchMock from 'fetch-mock';

import { Section } from '@frontend/web/components/Section';

import { MostViewedGrid } from './MostViewedGrid';
import {
    responseWithTwoTabs,
    responseWithOneTab,
} from './MostViewedGrid.mocks';

const config: ConfigType = {
    ajaxUrl: 'https://api.nextgen.guardianapps.co.uk',
    sentryHost: '',
    sentryPublicApiKey: '',
    dcrSentryDsn: '',
    switches: {},
    abTests: {},
    dfpAccountId: '',
    commercialBundleUrl: '',
    revisionNumber: '',
    isDev: false,
    googletagUrl: '',
    stage: 'DEV',
    frontendAssetsFullURL: '',
    hbImpl: '',
    adUnit: '',
    isSensitive: '',
    videoDuration: 0,
    edition: '',
    section: '',
    sharedAdTargeting: {},
};

/* tslint:disable */
export default {
    component: MostViewedGrid,
    title: 'Components/MostViewedGrid',
};
/* tslint:enable */

export const withTwoTabs = () => {
    fetchMock.restore().getOnce('*', {
        status: 200,
        body: responseWithTwoTabs.data,
    });

    return (
        <Section>
            <MostViewedGrid
                pillar="news"
                config={config}
                sectionName="politics"
            />
            ;
        </Section>
    );
};
withTwoTabs.story = { name: 'with two tabs' };

export const withOneTabs = () => {
    fetchMock.restore().getOnce('*', {
        status: 200,
        body: responseWithOneTab.data,
    });

    return (
        <Section>
            <MostViewedGrid pillar="news" config={config} />;
        </Section>
    );
};
withOneTabs.story = { name: 'with one tab' };
