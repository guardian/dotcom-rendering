/* eslint-disable jsx-a11y/aria-role */
import React from 'react';
import { css } from 'emotion';

import { Display } from '@guardian/types/Format';
import { Section } from '../Section';
import { Flex } from '../Flex';
import { LeftColumn } from '../LeftColumn';
import { RightColumn } from '../RightColumn';
import { Figure } from '../Figure';

import { ImageBlockComponent } from './ImageBlockComponent';

import { image } from './ImageBlockComponent.mocks';

export default {
    component: ImageBlockComponent,
    title: 'Components/ImageBlockComponent',
    parameters: {
        chromatic: { diffThreshold: 0.4 },
    },
};

const Container = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <Section showTopBorder={false}>
        <Flex>
            <LeftColumn>
                <></>
            </LeftColumn>
            <div
                className={css`
                    max-width: 620px;
                    padding: 20px;
                    flex-grow: 1;
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
            <Figure role="inline">
                <ImageBlockComponent
                    display={Display.Standard}
                    designType="Article"
                    element={{ ...image, role: 'inline' }}
                    pillar="news"
                />
            </Figure>
        </Container>
    );
};
StandardArticle.story = {
    name: 'with role inline',
};

export const Immersive = () => {
    return (
        <Container>
            <Figure role="immersive">
                <ImageBlockComponent
                    display={Display.Standard}
                    designType="Article"
                    element={{ ...image, role: 'immersive' }}
                    pillar="news"
                />
            </Figure>
        </Container>
    );
};
Immersive.story = {
    name: 'with role immersive',
};

export const Showcase = () => {
    return (
        <Container>
            <Figure role="showcase">
                <ImageBlockComponent
                    display={Display.Standard}
                    designType="Article"
                    element={{ ...image, role: 'showcase' }}
                    pillar="news"
                />
            </Figure>
        </Container>
    );
};
Showcase.story = {
    name: 'with role showcase',
};

export const Thumbnail = () => {
    return (
        <Container>
            <Figure role="thumbnail">
                <ImageBlockComponent
                    display={Display.Standard}
                    designType="Article"
                    element={{ ...image, role: 'thumbnail' }}
                    pillar="news"
                />
            </Figure>
        </Container>
    );
};
Thumbnail.story = {
    name: 'with role thumbnail',
};

export const Supporting = () => {
    return (
        <Container>
            <Figure role="supporting">
                <ImageBlockComponent
                    display={Display.Standard}
                    designType="Article"
                    element={{ ...image, role: 'supporting' }}
                    pillar="news"
                />
            </Figure>
        </Container>
    );
};
Supporting.story = {
    name: 'with role supporting',
};

export const HideCaption = () => {
    return (
        <Container>
            <Figure role="inline">
                <ImageBlockComponent
                    display={Display.Standard}
                    designType="Article"
                    element={{ ...image, role: 'inline' }}
                    pillar="news"
                    hideCaption={true}
                />
            </Figure>
        </Container>
    );
};
HideCaption.story = {
    name: 'with hideCaption true',
};

export const InlineTitle = () => {
    return (
        <Container>
            <Figure role="inline">
                <ImageBlockComponent
                    display={Display.Standard}
                    designType="Article"
                    element={{ ...image, role: 'inline' }}
                    pillar="news"
                    title="This is the title text"
                    hideCaption={true}
                />
            </Figure>
        </Container>
    );
};
InlineTitle.story = {
    name: 'with title and role inline',
    parameters: {
        viewport: { defaultViewport: 'desktop' },
        chromatic: { viewports: [1300] },
    },
};

export const InlineTitleMobile = () => {
    return (
        <Container>
            <Figure role="inline">
                <ImageBlockComponent
                    display={Display.Standard}
                    designType="Article"
                    element={{ ...image, role: 'inline' }}
                    pillar="news"
                    title="This is the title text"
                    hideCaption={true}
                />
            </Figure>
        </Container>
    );
};
InlineTitleMobile.story = {
    name: 'with title and role inline on mobile',
    parameters: {
        viewport: { defaultViewport: 'mobileMedium' },
        chromatic: { viewports: [375] },
    },
};

export const ImmersiveTitle = () => {
    return (
        <Container>
            <Figure role="immersive">
                <ImageBlockComponent
                    display={Display.Standard}
                    designType="Article"
                    element={{ ...image, role: 'immersive' }}
                    pillar="news"
                    title="This is the title text"
                    hideCaption={true}
                />
            </Figure>
        </Container>
    );
};
ImmersiveTitle.story = {
    name: 'with title and role immersive',
};

export const ShowcaseTitle = () => {
    return (
        <Container>
            <Figure role="showcase">
                <ImageBlockComponent
                    display={Display.Standard}
                    designType="Article"
                    element={{ ...image, role: 'showcase' }}
                    pillar="news"
                    title="This is the title text"
                    hideCaption={true}
                />
            </Figure>
        </Container>
    );
};
ShowcaseTitle.story = {
    name: 'with title and role showcase',
    parameters: {
        viewport: { defaultViewport: 'desktop' },
        chromatic: { viewports: [980] },
    },
};

export const HalfWidth = () => {
    return (
        <Container>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
            </p>
            <Figure role="halfWidth">
                <ImageBlockComponent
                    display={Display.Standard}
                    designType="Article"
                    element={{ ...image, role: 'halfWidth' }}
                    pillar="news"
                />
            </Figure>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </Container>
    );
};
HalfWidth.story = {
    name: 'with role halfWidth on desktop',
    parameters: {
        viewport: { defaultViewport: 'desktop' },
        chromatic: { viewports: [980] },
    },
};

export const HalfWidthMobile = () => {
    return (
        <Container>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
            </p>
            <Figure role="halfWidth">
                <ImageBlockComponent
                    display={Display.Standard}
                    designType="Article"
                    element={{ ...image, role: 'halfWidth' }}
                    pillar="news"
                />
            </Figure>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </Container>
    );
};
HalfWidthMobile.story = {
    name: 'with role halfWidth on mobile',
    parameters: {
        viewport: { defaultViewport: 'mobileMedium' },
        chromatic: { viewports: [375] },
    },
};

export const HalfWidthWide = () => {
    return (
        <Container>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est
                laborum.Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
            <Figure role="halfWidth">
                <ImageBlockComponent
                    display={Display.Standard}
                    designType="Article"
                    element={{ ...image, role: 'halfWidth' }}
                    pillar="news"
                />
            </Figure>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </Container>
    );
};
HalfWidthWide.story = {
    name: 'with role halfWidth',
    parameters: {
        viewport: { defaultViewport: 'wide' },
        chromatic: { disable: true },
    },
};
