import React from 'react';
import { css } from 'emotion';

import { Section } from '../Section';
import { Flex } from '../Flex';
import { LeftColumn } from '../LeftColumn';
import { RightColumn } from '../RightColumn';

import { ImageBlockComponent } from './ImageBlockComponent';

import { image } from './ImageBlockComponent.mocks';

export default {
    component: ImageBlockComponent,
    title: 'Components/ImageBlockComponent',
};

const Container = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <Section showTopBorder={false}>
        <Flex>
            <LeftColumn>
                <></>
            </LeftColumn>
            <div
                className={css`
                    width: 620px;
                    padding: 20px;
                `}
            >
                {children}
            </div>
            <RightColumn>
                <></>
            </RightColumn>
        </Flex>
    </Section>
);

/**
 type Props = {
    display: Display;
    designType: DesignType;
    element: ImageBlockElement;
    pillar: Pillar;
    hideCaption?: boolean;
};
 */

export const StandardArticle = () => {
    return (
        <Container>
            <ImageBlockComponent
                display="standard"
                designType="Article"
                element={{ ...image, role: 'inline' }}
                pillar="news"
            />
        </Container>
    );
};
StandardArticle.story = {
    name: 'with role inline',
};

export const Immersive = () => {
    return (
        <Container>
            <ImageBlockComponent
                display="standard"
                designType="Article"
                element={{ ...image, role: 'immersive' }}
                pillar="news"
            />
        </Container>
    );
};
Immersive.story = {
    name: 'with role immersive',
};

export const Showcase = () => {
    return (
        <Container>
            <ImageBlockComponent
                display="standard"
                designType="Article"
                element={{ ...image, role: 'showcase' }}
                pillar="news"
            />
        </Container>
    );
};
Showcase.story = {
    name: 'with role showcase',
};

export const Thumbnail = () => {
    return (
        <Container>
            <ImageBlockComponent
                display="standard"
                designType="Article"
                element={{ ...image, role: 'thumbnail' }}
                pillar="news"
            />
        </Container>
    );
};
Thumbnail.story = {
    name: 'with role thumbnail',
};

export const Supporting = () => {
    return (
        <Container>
            <ImageBlockComponent
                display="standard"
                designType="Article"
                element={{ ...image, role: 'supporting' }}
                pillar="news"
            />
        </Container>
    );
};
Supporting.story = {
    name: 'with role supporting',
};

export const HideCaption = () => {
    return (
        <Container>
            <ImageBlockComponent
                display="standard"
                designType="Article"
                element={{ ...image, role: 'inline' }}
                pillar="news"
                hideCaption={true}
            />
        </Container>
    );
};
HideCaption.story = {
    name: 'with hideCaption true',
};
