import React from 'react';
import { css } from 'emotion';

type Props = {
    children: ChildrenType;
    imagePosition?: ImagePositionType;
};

const decideDirection = (imagePosition?: ImagePositionType) => {
    switch (imagePosition) {
        case 'top':
            return 'column';
        case 'left':
            return 'row';
        case 'right':
            return 'row-reverse';
        // If there's no image (so no imagePosition) default to top down
        default:
            return 'column';
    }
};

export const CardLayout = ({ children, imagePosition }: Props) => (
    <div
        className={css`
            display: flex;
            flex-direction: ${decideDirection(imagePosition)};
            width: 100%;
        `}
    >
        {children}
    </div>
);
