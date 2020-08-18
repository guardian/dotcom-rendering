import React, { useEffect } from 'react';

import { makeGuardianBrowserCAPI } from '@root/src/model/window-guardian';
import { MatchReport } from '@root/fixtures/articles/MatchReport';

import { NAV } from '@root/fixtures/NAV';

import { HydrateApp } from '@root/src/web/components/HydrateApp';
import { mockRESTCalls } from '@root/src/web/lib/mockRESTCalls';

import { DecideLayout } from './DecideLayout';

mockRESTCalls();

export default {
    title: 'Layouts/Standard',
    parameters: {
        chromatic: { viewports: [1300], delay: 800, diffThreshold: 0.2 },
    },
};

const convertToStandard = (CAPI: CAPIType) => {
    return {
        ...CAPI,
        pageType: {
            ...CAPI.pageType,
            hasShowcaseMainElement: false,
        },
        isImmersive: false,
    };
};

// HydratedLayout is used here to simulated the hydration that happens after we init react on
// the client. We need a separate component so that we can make use of useEffect to ensure
// the hydrate step only runs once the dom has been rendered.
const HydratedLayout = ({ ServerCAPI }: { ServerCAPI: CAPIType }) => {
    useEffect(() => {
        const CAPI = makeGuardianBrowserCAPI(ServerCAPI);
        HydrateApp({ CAPI, NAV });
    }, [ServerCAPI]);
    return <DecideLayout CAPI={ServerCAPI} NAV={NAV} />;
};

export const MatchReportStory = () => {
    const ServerCAPI = convertToStandard(MatchReport);
    return <HydratedLayout ServerCAPI={ServerCAPI} />;
};
MatchReportStory.story = { name: 'MatchReport' };
