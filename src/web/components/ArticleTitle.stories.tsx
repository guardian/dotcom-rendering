import React from 'react';
import { css } from 'emotion';

import { ArticleTitle } from './ArticleTitle';

const Container = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <div
        className={css`
            width: 620px;
            padding: 20px;
        `}
    >
        {children}
    </div>
);
const CAPI = {
    tags: [],
    guardianBaseURL: 'https://theguardian.com',
    inLeftCol: true,
    fallbackToSection: true,
};
const brexitCAPI = {
    ...CAPI,
    ...{
        sectionLabel: 'Brexit',
        sectionUrl: '/brexit',
        badge: {
            seriesTag: 'politics/series/brexit-how-it-came-to-this',
            imageUrl:
                'https://assets.guim.co.uk/images/badges/05c6ace4e60dd0209a3f80eb03e16524/EUReferendumBadge.svg',
        },
    },
};

const beyondTheBladeCAPI = {
    ...CAPI,
    ...{
        sectionLabel: 'Beyond the blade',
        sectionUrl: '/beyond-the-blade',
        badge: {
            seriesTag: 'membership/series/beyond-the-blade',
            imageUrl:
                'https://assets.guim.co.uk/images/badges/bfc00bc58eb966845ccf1200fd8c54e0/beyondthebladebadge.svg',
        },
    },
};

/* tslint:disable */
export default {
    component: ArticleTitle,
    title: 'Components/ArticleTitle',
};
/* tslint:enable */

export const defaultStory = () => {
    return (
        <Container>
            <ArticleTitle {...brexitCAPI} pillar="sport" />
        </Container>
    );
};
defaultStory.story = { name: 'Brexit badge' };

export const beyondTheBlade = () => {
    return (
        <Container>
            <ArticleTitle {...beyondTheBladeCAPI} pillar="news" />
        </Container>
    );
};
beyondTheBlade.story = { name: 'Beyond the blade badge' };
