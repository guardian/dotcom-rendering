import React from 'react';
import fetchMock from 'fetch-mock';

import { Section } from '@frontend/web/components/Section';

import { MostViewed } from './MostViewed';
import { responseWithTwoTabs, responseWithOneTab } from './MostViewed.mocks';

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
    component: MostViewed,
    title: 'Components/MostViewed',
};
/* tslint:enable */

export const withTwoTabs = () => {
    fetchMock.restore().getOnce('*', {
        status: 200,
        body: responseWithTwoTabs.data,
    });

    return (
        <Section>
            <MostViewed
                layout="grid"
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
            <MostViewed layout="grid" pillar="news" config={config} />;
        </Section>
    );
};
withOneTabs.story = { name: 'with one tab' };

export const usingListLayout = () => {
    fetchMock.restore().getOnce('*', {
        status: 200,
        body: responseWithOneTab.data,
    });

    return (
        <Section>
            <MostViewed
                config={config}
                pillar="news"
                layout="list"
                geoTargeted={true}
            />
            ;
        </Section>
    );
};
usingListLayout.story = { name: 'using list layout' };
