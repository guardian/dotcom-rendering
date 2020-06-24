import React from 'react';
import { css } from 'emotion';

import { Section } from '../Section';
import { Flex } from '../Flex';
import { LeftColumn } from '../LeftColumn';
import { RightColumn } from '../RightColumn';

import { YoutubeBlockComponent } from './YoutubeBlockComponent';
import { Display } from '@root/src/lib/display';

export default {
    component: YoutubeBlockComponent,
    title: 'Components/YoutubeBlockComponent',
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

export const noOverlay = () => {
    return (
        <Container>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.{' '}
            </p>
            <YoutubeBlockComponent
                display={Display.Standard}
                designType="Article"
                element={{
                    mediaTitle:
                        "Prince Harry and Meghan's 'bombshell' plans explained – video",
                    assetId: 'd2Q5bXvEgMg',
                    _type:
                        'model.dotcomrendering.pageElements.YoutubeBlockElement',
                    id: 'c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28',
                    channelId: 'UCIRYBXDze5krPDzAEOxFGVA',
                }}
                pillar="news"
                // eslint-disable-next-line jsx-a11y/aria-role
                role="inline"
            />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.{' '}
            </p>
        </Container>
    );
};
noOverlay.story = { name: 'with no overlay' };

export const Vertical = () => {
    return (
        <Container>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.{' '}
            </p>
            <YoutubeBlockComponent
                display="standard"
                designType="Article"
                element={{
                    mediaTitle:
                        "Prince Harry and Meghan's 'bombshell' plans explained – video",
                    assetId: 'd2Q5bXvEgMg',
                    _type:
                        'model.dotcomrendering.pageElements.YoutubeBlockElement',
                    id: 'c2b8a51c-cb3d-41e7-bb79-1d9a091d0c28',
                    channelId: 'UCIRYBXDze5krPDzAEOxFGVA',
                }}
                pillar="news"
                // eslint-disable-next-line jsx-a11y/aria-role
                role="inline"
                height={259}
                width={460}
            />
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.{' '}
            </p>
        </Container>
    );
};
Vertical.story = { name: 'with height and width set' };
