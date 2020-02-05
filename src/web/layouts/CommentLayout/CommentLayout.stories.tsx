import React from 'react';
import fetchMock from 'fetch-mock';

import { viewports } from '@root/.storybook/config';
import { comment as commentCAPI } from '@root/fixtures/CAPI/comment';
import { NAV } from '@root/fixtures/NAV';
import { mockTab1, responseWithTwoTabs } from '@root/fixtures/mostViewed';

import { hydrateIslands } from '@frontend/web/islands/islands';
import { CommentLayout } from '@root/src/web/layouts/CommentLayout/CommentLayout';

export default {
    title: 'Articles/CommentLayout',
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
            'begin:https://api.nextgen.guardianapps.co.uk/discussion/comment-counts',
            {
                status: 200,
                body: {
                    counts: [
                        {
                            id: '/p/4k83z',
                            count: 76,
                        },
                    ],
                },
            },
            { overwriteRoutes: false },
        )
        // Most read by category
        .getOnce(
            'begin:https://api.nextgen.guardianapps.co.uk/most-read/',
            {
                status: 200,
                body: responseWithTwoTabs,
            },
            { overwriteRoutes: false },
        )
        // Article share count
        .getOnce(
            'begin:https://api.nextgen.guardianapps.co.uk/sharecount/',
            {
                status: 200,
                body: {
                    path: commentCAPI.pageId,
                    share_count: 273,
                    refreshStatus: true,
                },
            },
            { overwriteRoutes: false },
        )
        // Rich link
        .getOnce('begin:https://api.nextgen.guardianapps.co.uk/embed/', {
            status: 200,
            body: {},
        });

export const Default = () => {
    mockRESTCalls();
    setTimeout(() => hydrateIslands(commentCAPI, NAV));
    return <CommentLayout CAPI={commentCAPI} NAV={NAV} />;
};
Default.story = { name: 'default' };
