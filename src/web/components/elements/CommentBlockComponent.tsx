import React from 'react';
import { css } from 'emotion';

type Props = {
    body: string;
};

const cssClass = css``;

export const CommentBlockComponent = ({ body }: Props) => {
    return <div className={cssClass}>{body}</div>;
};
