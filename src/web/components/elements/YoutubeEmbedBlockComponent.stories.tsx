import React from 'react';
import { css } from 'emotion';

import { YoutubeEmbedBlockComponent } from './YoutubeEmbedBlockComponent';

export default {
    component: YoutubeEmbedBlockComponent,
    title: 'Components/YoutubeEmbedComponent',
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
            <YoutubeEmbedBlockComponent
                url="https://www.youtube-nocookie.com/embed/79fzeNUqQbQ?wmode=opaque&feature=oembed"
                pillar="news"
                height={259}
                width={460}
                caption="blah"
                credit=""
                title=""
                display="standard"
                designType="Article"
            />
            <p>abc</p>
        </Container>
    );
};
standardAspectRatio.story = { name: 'with standard aspect ratio' };
