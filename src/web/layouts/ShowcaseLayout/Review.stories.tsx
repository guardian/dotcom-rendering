import React from 'react';
import fetchMock from 'fetch-mock';

import { showcaseReviewCAPI } from '@root/fixtures/CAPI/review/showcaseReview';
import { NAV } from '@root/fixtures/NAV';
import { mockTab1, responseWithTwoTabs } from '@root/fixtures/mostViewed';
import { sharecount } from '@root/fixtures/article';
import { commentCount } from '@root/fixtures/commentCounts';

import { hydrateIslands } from '@frontend/web/islands/islands';
import { ShowcaseLayout } from '@root/src/web/layouts/ShowcaseLayout/ShowcaseLayout';

export default {
    title: 'Articles/Review/Showcase',
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
            'https://api.nextgen.guardianapps.co.uk/most-read/tv-and-radio.json?dcr=true',
            {
                status: 200,
                body: responseWithTwoTabs,
            },
            { overwriteRoutes: false },
        )
        // Article share count
        .getOnce(
            'https://api.nextgen.guardianapps.co.uk/sharecount/tv-and-radio/2020/jan/17/sex-education-season-two-review-netflix.json',
            {
                status: 200,
                body: sharecount,
            },
            { overwriteRoutes: false },
        );

export const ReviewMobileMedium = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(showcaseReviewCAPI, NAV));
    return <ShowcaseLayout CAPI={showcaseReviewCAPI} NAV={NAV} />;
};
ReviewMobileMedium.story = {
    parameters: {
        viewport: { defaultViewport: 'mobileMedium' },
    },
};

export const ReviewMobileLandscape = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(showcaseReviewCAPI, NAV));
    return <ShowcaseLayout CAPI={showcaseReviewCAPI} NAV={NAV} />;
};
ReviewMobileLandscape.story = {
    parameters: {
        viewport: { defaultViewport: 'mobileLandscape' },
    },
};

export const ReviewPhablet = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(showcaseReviewCAPI, NAV));
    return <ShowcaseLayout CAPI={showcaseReviewCAPI} NAV={NAV} />;
};
ReviewPhablet.story = {
    parameters: {
        viewport: { defaultViewport: 'phablet' },
    },
};

export const ReviewTablet = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(showcaseReviewCAPI, NAV));
    return <ShowcaseLayout CAPI={showcaseReviewCAPI} NAV={NAV} />;
};
ReviewTablet.story = {
    parameters: {
        viewport: { defaultViewport: 'tablet' },
    },
};

export const ReviewDesktop = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(showcaseReviewCAPI, NAV));
    return <ShowcaseLayout CAPI={showcaseReviewCAPI} NAV={NAV} />;
};
ReviewDesktop.story = {
    parameters: {
        viewport: { defaultViewport: 'desktop' },
    },
};

export const ReviewLeftCol = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(showcaseReviewCAPI, NAV));
    return <ShowcaseLayout CAPI={showcaseReviewCAPI} NAV={NAV} />;
};
ReviewLeftCol.story = {
    parameters: {
        viewport: { defaultViewport: 'leftCol' },
    },
};

export const ReviewWide = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(showcaseReviewCAPI, NAV));
    return <ShowcaseLayout CAPI={showcaseReviewCAPI} NAV={NAV} />;
};
ReviewWide.story = {
    parameters: {
        viewport: { defaultViewport: 'wide' },
    },
};
