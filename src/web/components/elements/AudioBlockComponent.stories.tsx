import React from 'react';
import { css } from 'emotion';

import { AudioBlockComponent } from './AudioBlockComponent';

export default {
    component: AudioBlockComponent,
    title: 'Components/AudioBlockComponent',
};

const Container = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
    <div
        className={css`
            max-width: 620px;
            padding: 20px;
        `}
    >
        {children}
    </div>
);

export const standardAspectRatio = () => {
    return (
        <Container>
            <p>abc</p>
            <AudioBlockComponent
                embedUrl="https://open.spotify.com/embed/playlist/0l7thID8yCC1KG1olWcknH"
                height={380}
                width={300}
                title="Listeners recommnend - the Pet Shop Boys"
            />
            <p>abc</p>
        </Container>
    );
};
standardAspectRatio.story = { name: 'with standard aspect ratio' };
