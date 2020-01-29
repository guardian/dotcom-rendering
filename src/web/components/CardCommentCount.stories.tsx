import React from 'react';
import { css } from 'emotion';

import { CardCommentCount } from './CardCommentCount';

/* tslint:disable */
export default {
    component: CardCommentCount,
    title: 'Components/CardCommentCount',
};
/* tslint:enable */

const Container = ({ children }: { children: JSXElements }) => (
    <div
        className={css`
            margin: 40px;
        `}
    >
        {children}
    </div>
);

export const CommentCountStory = () => {
    return (
        <Container>
            <CardCommentCount short="11k" long="10,899" />
        </Container>
    );
};
CommentCountStory.story = { name: 'default' };
