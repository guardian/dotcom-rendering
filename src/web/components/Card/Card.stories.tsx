import React from 'react';
import { css } from 'emotion';

import { Card } from '@frontend/web/components/Card/Card';

import { imageElement } from './Card.mocks';

const Container = ({
    children,
    direction = 'column',
    height = '500px',
}: {
    children: JSX.Element | JSX.Element[];
    direction?: 'row' | 'column';
    height?: string;
}) => (
    <ul
        className={css`
            display: flex;
            flex-direction: ${direction};
            height: ${height};
            /* border: 3px dashed; */
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
    <Container direction="row" height="100px">
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

export const ImageAbove = () => (
    <Container direction="row">
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson heckled on tour"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
            image={imageElement}
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson shouted at on tour"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
            image={imageElement}
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson ignored on tour"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
            image={imageElement}
        />
    </Container>
);
ImageAbove.story = { name: 'with images above' };

export const ImageLeft = () => (
    <Container direction="row" height="100%">
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="sport"
            headlineString="Johnson heckled on tour"
            prefix={{
                text: 'World Cup 2019',
                pillar: 'sport',
            }}
            image={imageElement}
            direction="row"
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="sport"
            headlineString="Johnson shouted at on tour"
            prefix={{
                text: 'World Cup 2019',
                pillar: 'sport',
            }}
            image={imageElement}
            direction="row"
        />
        {/* <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="sport"
            headlineString="Johnson ignored on tour"
            prefix={{
                text: 'World Cup 2019',
                pillar: 'sport',
            }}
            image={imageElement}
            direction="row"
        /> */}
    </Container>
);
ImageLeft.story = { name: 'with image to the left' };
