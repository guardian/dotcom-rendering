import React from 'react';
import fetchMock from 'fetch-mock';

import { viewports } from '@root/.storybook/config';
import { standardReviewCAPI } from '@root/fixtures/CAPI/review/standardReview';
import { NAV } from '@root/fixtures/NAV';
import { mockTab1, responseWithTwoTabs } from '@root/fixtures/mostViewed';
import { series } from '@root/fixtures/series';
import { sharecount } from '@root/fixtures/article';
import { commentCount } from '@root/fixtures/commentCounts';

import { hydrateIslands } from '@frontend/web/islands/islands';
import { StandardLayout } from '@root/src/web/layouts/StandardLayout/StandardLayout';

export default {
    title: 'Articles/Review/Standard',
    parameters: {
        chromatic: { delay: 600, viewports },
    },
};

const mockRESTCalls = () =>
    fetchMock
        .restore()
        // Most read by Geo
        .getOnce(
            'https://api.nextgen.guardianapps.co.uk/most-read-geo.json?dcr=true',
            {
                status: 200,
                body: mockTab1,
            },
            { overwriteRoutes: false },
        )
        // Comment count
        .getOnce(
            'https://api.nextgen.guardianapps.co.uk/discussion/comment-counts.json?shortUrls=/p/4k83z',
            {
                status: 200,
                body: commentCount,
            },
            { overwriteRoutes: false },
        )
        // Most read by category
        .getOnce(
            'https://api.nextgen.guardianapps.co.uk/most-read/stage.json?dcr=true',
            {
                status: 200,
                body: responseWithTwoTabs,
            },
            { overwriteRoutes: false },
        )
        // Series
        .getOnce(
            'https://api.nextgen.guardianapps.co.uk/series/tv-and-radio/series/tv-review.json?dcr',
            {
                status: 200,
                body: series,
            },
            { overwriteRoutes: false },
        )
        // Article share count
        .getOnce(
            'https://api.nextgen.guardianapps.co.uk/sharecount/stage/2020/jan/28/flights-review-project-arts-centre-dublin.json',
            {
                status: 200,
                body: sharecount,
            },
            { overwriteRoutes: false },
        );

export const Review = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(standardReviewCAPI, NAV));
    return <StandardLayout CAPI={standardReviewCAPI} NAV={NAV} />;
};
