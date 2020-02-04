import fetchMock from 'fetch-mock';

import { richLinkCard } from '@root/fixtures/card';
import { mockTab1, responseWithTwoTabs } from '@root/fixtures/mostViewed';
import { series } from '@root/fixtures/series';
import { sharecount } from '@root/fixtures/article';
import { commentCount } from '@root/fixtures/commentCounts';

export const mockRESTCalls = () =>
    fetchMock
        .restore()
        // Most read by Geo
        .getOnce(
            /.*api.nextgen.guardianapps.co.uk\/most-read-geo.*/,
            {
                status: 200,
                body: mockTab1,
            },
            { overwriteRoutes: false },
        )
        // Comment count
        .getOnce(
            /.*api.nextgen.guardianapps.co.uk\/discussion.*/,
            {
                status: 200,
                body: commentCount,
            },
            { overwriteRoutes: false },
        )
        // Most read by category
        .getOnce(
            /.*api.nextgen.guardianapps.co.uk\/most-read.*/,
            {
                status: 200,
                body: responseWithTwoTabs,
            },
            { overwriteRoutes: false },
        )
        // Series
        .getOnce(
            /.*api.nextgen.guardianapps.co.uk\/series.*/,
            {
                status: 200,
                body: series,
            },
            { overwriteRoutes: false },
        )
        // Rich link
        .getOnce(
            /.*api.nextgen.guardianapps.co.uk\/embed\/card.*/,
            {
                status: 200,
                body: richLinkCard,
            },
            { overwriteRoutes: false },
        )
        // Article share count
        .getOnce(
            /.*api.nextgen.guardianapps.co.uk\/sharecount.*/,
            {
                status: 200,
                body: sharecount,
            },
            { overwriteRoutes: false },
        );
