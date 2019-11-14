import React from 'react';
import { css } from 'emotion';

import { Card } from '@frontend/web/components/Card/Card';

const Container = ({
    children,
    direction = 'column',
}: {
    children: JSX.Element | JSX.Element[];
    direction?: 'row' | 'column';
}) => (
    <ul
        className={css`
            display: flex;
            flex-direction: ${direction};
            height: 300px;
            border: 3px dashed;
        `}
    >
        {children}
    </ul>
);

/* tslint:disable */
export default {
    component: Card,
    title: 'Components/Card',
};
/* tslint:enable */

export const defaultStory = () => (
    <Card
        linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
        pillar="news"
        headlineString="This is the most basic card view for the news pillar"
    />
);
defaultStory.story = { name: 'default' };

export const VerticalSpacing = () => (
    <Container>
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson heckled on tour"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson shouted at on tour"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson ignored on tour"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
        />
    </Container>
);
VerticalSpacing.story = { name: 'with equal height vertically' };

export const HorizontalSpacing = () => (
    <Container direction="row">
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson heckled on tour"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson shouted at on tour"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson ignored on tour"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
        />
    </Container>
);
HorizontalSpacing.story = { name: 'with equal width horizontally' };
