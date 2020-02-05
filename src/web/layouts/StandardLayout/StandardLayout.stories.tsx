import React from 'react';

import { viewports } from '@root/.storybook/config';
import { standardReviewCAPI } from '@root/fixtures/CAPI/review/standardReview';
import { richLink } from '@root/fixtures/CAPI/richLink';
import { NAV } from '@root/fixtures/NAV';

import { mockRESTCalls } from '@root/src/web/lib/mockRESTCalls';
import { hydrateIslands } from '@frontend/web/islands/islands';
import { StandardLayout } from '@root/src/web/layouts/StandardLayout/StandardLayout';

export default {
    title: 'Articles/Standard',
    parameters: {
        chromatic: { delay: 600, viewports },
    },
};

export const Review = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(standardReviewCAPI, NAV));
    return <StandardLayout CAPI={standardReviewCAPI} NAV={NAV} />;
};

export const RichLink = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(richLink, NAV));
    return <StandardLayout CAPI={richLink} NAV={NAV} />;
};
