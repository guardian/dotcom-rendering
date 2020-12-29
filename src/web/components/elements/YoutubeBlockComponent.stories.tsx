import React from 'react';
import { css } from 'emotion';

import { Display } from '@guardian/types/Format';
import { Section } from '../Section';
import { Flex } from '../Flex';
import { LeftColumn } from '../LeftColumn';
import { RightColumn } from '../RightColumn';

import { YoutubeBlockComponent } from './YoutubeBlockComponent';

export default {
    component: YoutubeBlockComponent,
    title: 'Components/YoutubeBlockComponent',
};

const overrideImage =
    'https://i.guim.co.uk/img/media/49565a29c6586fe6b748926e0be96c5e9c90473c/0_0_4981_2989/500.jpg?quality=85&auto=format&fit=max&s=17c70ec70002ea34886fd6c2605cd81e';

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
                    expired: false,
                    overrideImage,
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
                    expired: false,
                    overrideImage,
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

export const Expired = () => {
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
                    expired: true,
                    overrideImage,
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
Expired.story = { name: 'expired video' };
