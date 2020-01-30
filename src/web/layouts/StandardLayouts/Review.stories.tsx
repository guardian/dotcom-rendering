import React from 'react';
import fetchMock from 'fetch-mock';

import { standardReviewCAPI } from '@root/fixtures/CAPI/review/standardReview';
import { NAV } from '@root/fixtures/NAV';
import { mockTab1, responseWithTwoTabs } from '@root/fixtures/mostViewed';
import { sharecount } from '@root/fixtures/article';
import { commentCount } from '@root/fixtures/commentCounts';

import { hydrateIslands } from '@frontend/web/islands/islands';
import { StandardLayout } from '@root/src/web/layouts/StandardLayouts/StandardLayout';

export default {
    title: 'Articles/Review/Standard',
    parameters: {
        chromatic: { delay: 600 },
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
        // Article share count
        .getOnce(
            'https://api.nextgen.guardianapps.co.uk/sharecount/stage/2020/jan/28/flights-review-project-arts-centre-dublin.json',
            {
                status: 200,
                body: sharecount,
            },
            { overwriteRoutes: false },
        );

export const ReviewMobileMedium = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(standardReviewCAPI, NAV));
    return <StandardLayout CAPI={standardReviewCAPI} NAV={NAV} />;
};
ReviewMobileMedium.story = {
    parameters: {
        viewport: { defaultViewport: 'mobileMedium' },
    },
};

export const ReviewMobileLandscape = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(standardReviewCAPI, NAV));
    return <StandardLayout CAPI={standardReviewCAPI} NAV={NAV} />;
};
ReviewMobileLandscape.story = {
    parameters: {
        viewport: { defaultViewport: 'mobileLandscape' },
    },
};

export const ReviewPhablet = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(standardReviewCAPI, NAV));
    return <StandardLayout CAPI={standardReviewCAPI} NAV={NAV} />;
};
ReviewPhablet.story = {
    parameters: {
        viewport: { defaultViewport: 'phablet' },
    },
};

export const ReviewTablet = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(standardReviewCAPI, NAV));
    return <StandardLayout CAPI={standardReviewCAPI} NAV={NAV} />;
};
ReviewTablet.story = {
    parameters: {
        viewport: { defaultViewport: 'tablet' },
    },
};

export const ReviewDesktop = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(standardReviewCAPI, NAV));
    return <StandardLayout CAPI={standardReviewCAPI} NAV={NAV} />;
};
ReviewDesktop.story = {
    parameters: {
        viewport: { defaultViewport: 'desktop' },
    },
};

export const ReviewLeftCol = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(standardReviewCAPI, NAV));
    return <StandardLayout CAPI={standardReviewCAPI} NAV={NAV} />;
};
ReviewLeftCol.story = {
    parameters: {
        viewport: { defaultViewport: 'leftCol' },
    },
};

export const ReviewWide = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(standardReviewCAPI, NAV));
    return <StandardLayout CAPI={standardReviewCAPI} NAV={NAV} />;
};
ReviewWide.story = {
    parameters: {
        viewport: { defaultViewport: 'wide' },
    },
};
