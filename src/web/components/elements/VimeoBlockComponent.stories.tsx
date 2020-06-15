import React from 'react';
import { css } from 'emotion';

import { VimeoBlockComponent } from './VimeoBlockComponent';

export default {
    component: VimeoBlockComponent,
    title: 'Components/VimeoComponent',
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
            <p>abc</p>
            <VimeoBlockComponent
                url="https://player.vimeo.com/video/327310297?app_id=122963"
                pillar="news"
                height={460}
                width={259}
                caption="blah"
                credit=""
                title=""
            />
            <p>abc</p>
        </Container>
    );
};
noOverlay.story = { name: 'with no overlay' };
