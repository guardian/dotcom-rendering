import React from 'react';
import fetchMock from 'fetch-mock';

import { showcaseReviewCAPI } from '@root/fixtures/CAPI/review/showcaseReview';
import { standardReviewCAPI } from '@root/fixtures/CAPI/review/standardReview';
import { NAV } from '@root/fixtures/NAV';
import { mockTab1, responseWithTwoTabs } from '@root/fixtures/mostViewed';
import { sharecount } from '@root/fixtures/article';
import { commentCount } from '@root/fixtures/commentCounts';

import { hydrateIslands } from '@frontend/web/islands/islands';
import { ShowcaseLayout } from '@root/src/web/layouts/ShowcaseLayout';
import { StandardLayout } from '@root/src/web/layouts/StandardLayout';

/* tslint:disable */
export default {
    title: 'Articles/Review',
    parameters: {
        chromatic: { delay: 600 },
    },
};
/* tslint:enable */

export const ReviewShowcase = () => {
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
            'https://api.nextgen.guardianapps.co.uk/most-read/money.json?dcr=true',
            {
                status: 200,
                body: responseWithTwoTabs,
            },
            { overwriteRoutes: false },
        )
        // Article share count
        .getOnce(
            'https://api.nextgen.guardianapps.co.uk/sharecount/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software.json',
            {
                status: 200,
                body: sharecount,
            },
            { overwriteRoutes: false },
        );
    // return <div />;
    setTimeout(() => hydrateIslands(showcaseReviewCAPI, NAV));
    return <ShowcaseLayout CAPI={showcaseReviewCAPI} NAV={NAV} />;
};

export const ReviewStandard = () => {
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
            'https://api.nextgen.guardianapps.co.uk/most-read/money.json?dcr=true',
            {
                status: 200,
                body: responseWithTwoTabs,
            },
            { overwriteRoutes: false },
        )
        // Article share count
        .getOnce(
            'https://api.nextgen.guardianapps.co.uk/sharecount/money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software.json',
            {
                status: 200,
                body: sharecount,
            },
            { overwriteRoutes: false },
        );
    // return <div />;
    setTimeout(() => hydrateIslands(standardReviewCAPI, NAV));
    return <StandardLayout CAPI={standardReviewCAPI} NAV={NAV} />;
};
