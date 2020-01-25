import React from 'react';
import { css } from 'emotion';

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
