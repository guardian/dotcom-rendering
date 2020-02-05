import React from 'react';

import { viewports } from '@root/.storybook/config';
import { showcaseReviewCAPI } from '@root/fixtures/CAPI/review/showcaseReview';
import { NAV } from '@root/fixtures/NAV';
import { mockRESTCalls } from '@root/src/web/lib/mockRESTCalls';

import { hydrateIslands } from '@frontend/web/islands/islands';
import { ShowcaseLayout } from '@root/src/web/layouts/ShowcaseLayout/ShowcaseLayout';

export default {
    title: 'Articles/Showcase',
    parameters: {
        chromatic: { delay: 600, viewports },
    },
};

export const Review = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(showcaseReviewCAPI, NAV));
    return <ShowcaseLayout CAPI={showcaseReviewCAPI} NAV={NAV} />;
};
