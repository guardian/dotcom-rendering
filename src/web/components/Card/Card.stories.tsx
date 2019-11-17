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
            padding: 20px;
        `}
    >
        {children}
    </ul>
);

/* tslint:disable */
export default {
    component: Card,
    title: 'Components/Card',
    parameters: {
        viewport: {
            // This has the effect of turning off the viewports addon by default
            defaultViewport: 'doesNotExist',
        },
    },
};
/* tslint:enable */

export const defaultStory = () => (
    <Container height="150px">
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="This is the most basic card view. Cards expand to fit the height and width of their container."
            webPublicationDate="2019-11-16T09:45:30.000Z"
        />
    </Container>
);
defaultStory.story = { name: 'default' };

export const VerticalSpacing = () => (
    <Container>
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson heckled on tour"
            webPublicationDate="2019-11-15T09:45:30.000Z"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson shouted at on tour"
            webPublicationDate="2019-11-14T09:45:30.000Z"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson ignored on tour"
            webPublicationDate="2019-11-16T09:45:30.000Z"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
        />
    </Container>
);
VerticalSpacing.story = { name: 'with equal height vertically' };

export const HorizontalSpacing = () => (
    <Container direction="row" height="100%">
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson heckled on tour"
            webPublicationDate="2019-11-12T09:45:30.000Z"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson shouted at on tour"
            webPublicationDate="2019-10-16T09:45:30.000Z"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson ignored on tour"
            webPublicationDate="2019-11-16T22:45:30.000Z"
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
            webPublicationDate="2019-11-16T09:45:30.000Z"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
            image={{ element: imageElement, position: 'top', size: 'large' }}
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson shouted at on tour"
            webPublicationDate="2019-11-16T09:45:30.000Z"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
            image={{ element: imageElement, position: 'top', size: 'large' }}
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="news"
            headlineString="Johnson ignored on tour"
            webPublicationDate="2019-11-16T09:45:30.000Z"
            prefix={{
                text: 'Election 2019',
                pillar: 'news',
            }}
            image={{ element: imageElement, position: 'top', size: 'large' }}
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
            image={{ element: imageElement, position: 'left' }}
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="sport"
            headlineString="Johnson shouted at on tour"
            prefix={{
                text: 'World Cup 2019',
                showPulsingDot: true,
                showSlash: true,
                pillar: 'sport',
            }}
            image={{ element: imageElement, position: 'left' }}
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="sport"
            headlineString="Johnson ignored on tour"
            prefix={{
                text: 'World Cup 2019',
                pillar: 'sport',
            }}
            image={{ element: imageElement, position: 'left' }}
        />
    </Container>
);
ImageLeft.story = { name: 'with image to the left' };

export const ImageRight = () => (
    <Container direction="row" height="100%">
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="sport"
            headlineString="Johnson heckled on tour"
            prefix={{
                text: 'World Cup 2019',
                pillar: 'sport',
            }}
            image={{ element: imageElement, position: 'right', size: 'large' }}
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="sport"
            headlineString="Johnson shouted at on tour"
            prefix={{
                text: 'World Cup 2019',
                showPulsingDot: true,
                showSlash: true,
                pillar: 'sport',
            }}
            image={{ element: imageElement, position: 'right', size: 'large' }}
        />
    </Container>
);
ImageRight.story = { name: 'with large image to the right' };

export const Standfirst = () => (
    <Container direction="row" height="100%">
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="sport"
            headlineString="Johnson heckled on tour"
            webPublicationDate="2019-11-16T09:45:30.000Z"
            prefix={{
                text: 'World Cup 2019',
                pillar: 'sport',
            }}
            image={{ element: imageElement, position: 'left', size: 'large' }}
            standfirst="This is the standfirst text. This is more standfirst text to show how it looks when wrapped"
        />
        <Card
            linkTo="/society/2019/nov/14/witchcraft-and-black-magic-contribute-to-increase-in-child-abuse"
            pillar="sport"
            headlineString="Johnson shouted at on tour"
            webPublicationDate="2019-11-16T09:45:30.000Z"
            prefix={{
                text: 'World Cup 2019',
                showPulsingDot: true,
                showSlash: true,
                pillar: 'sport',
            }}
            image={{ element: imageElement, position: 'left', size: 'large' }}
        />
    </Container>
);
Standfirst.story = { name: 'with standfirst' };
