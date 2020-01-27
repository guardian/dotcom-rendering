import React from 'react';
import { css } from 'emotion';

import { ShareCount } from './ShareCount';

/* tslint:disable */
export default {
    component: ShareCount,
    title: 'Components/ShareCount',
};
/* tslint:enable */

const Container = ({ children }: { children: JSXElements }) => (
    <div
        className={css`
            margin: 40px;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
        `}
    >
        {children}
    </div>
);

export const ShareCountStory = () => {
    return (
        <Container>
            <ShareCount short="11k" long="10,898" />
        </Container>
    );
};
ShareCountStory.story = { name: 'default' };
