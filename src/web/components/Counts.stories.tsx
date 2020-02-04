import React from 'react';
import { css } from 'emotion';
import fetchMock from 'fetch-mock';

import { sharecount } from '@root/fixtures/article';
import { commentCount } from '@root/fixtures/commentCounts';

import { Counts } from './Counts';

/* tslint:disable */
export default {
    component: Counts,
    title: 'Components/Counts',
};
/* tslint:enable */

const Container = ({ children }: { children: JSXElements }) => (
    <div
        className={css`
            margin: 40px;
        `}
    >
        {children}
    </div>
);

export const Live = () => {
    return (
        <Container>
            <Counts
                ajaxUrl="https://api.nextgen.guardianapps.co.uk"
                shortUrlId="/p/4k83z"
                pageId="/lifeandstyle/2020/jan/25/deborah-orr-parents-jailers-i-loved"
                pillar="news"
            />
        </Container>
    );
};
Live.story = { name: 'with both results' };

export const ShareOnly = () => {
    fetchMock
        .restore()
        // Comment count
        .getOnce(
            'begin:https://api.nextgen.guardianapps.co.uk/discussion/comment-counts.json?shortUrls=',
            {
                status: 200,
                body: {
                    counts: [
                        {
                            id: '/p/4k83z',
                            count: 0,
                        },
                    ],
                },
            },
            { overwriteRoutes: false },
        )
        // Share count
        .getOnce(
            'begin:https://api.nextgen.guardianapps.co.uk/sharecount/',
            {
                status: 200,
                body: sharecount,
            },
            { overwriteRoutes: false },
        );

    return (
        <Container>
            <Counts
                ajaxUrl="https://api.nextgen.guardianapps.co.uk"
                shortUrlId="/p/abc"
                pageId="/lifeandstyle/2020/jan/25/deborah-orr-parents-jailers-i-loved"
                pillar="news"
            />
        </Container>
    );
};
ShareOnly.story = { name: 'with share count only' };

export const CommentOnly = () => {
    fetchMock
        .restore()
        // Comment count
        .getOnce(
            'begin:https://api.nextgen.guardianapps.co.uk/discussion/comment-counts.json?shortUrls=',
            {
                status: 200,
                body: commentCount,
            },
            { overwriteRoutes: false },
        )
        // Share count
        .getOnce(
            'begin:https://api.nextgen.guardianapps.co.uk/sharecount/',
            {
                status: 200,
                body: {
                    path:
                        'money/2017/mar/10/ministers-to-criminalise-use-of-ticket-tout-harvesting-software',
                    share_count: 0,
                    refreshStatus: true,
                },
            },
            { overwriteRoutes: false },
        );
    return (
        <Container>
            <Counts
                ajaxUrl="https://api.nextgen.guardianapps.co.uk"
                shortUrlId="/p/4k83z"
                pageId="/lifeandstyle/abc"
                pillar="news"
            />
        </Container>
    );
};
CommentOnly.story = { name: 'with comment count only' };
