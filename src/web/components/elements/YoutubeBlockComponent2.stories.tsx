import React from 'react';
import { css } from 'emotion';

import { YoutubeBlockComponent2 } from './YoutubeBlockComponent2';

export default {
    component: YoutubeBlockComponent2,
    title: 'Components/YouTubeComponent',
};

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

export const noOverlay = () => {
    return (
        <Container>
            <YoutubeBlockComponent2
                display="standard"
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
        </Container>
    );
};
noOverlay.story = { name: 'with no overlay' };
