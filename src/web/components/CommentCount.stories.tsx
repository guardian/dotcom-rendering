import React from 'react';
import { css } from 'emotion';

import { CommentCount } from './CommentCount';

/* tslint:disable */
export default {
    component: CommentCount,
    title: 'Components/CommentCount',
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

export const CommentCountStory = () => {
    return (
        <Container>
            <CommentCount short="11k" long="10,898" pillar="news" />
        </Container>
    );
};
CommentCountStory.story = { name: 'default' };
