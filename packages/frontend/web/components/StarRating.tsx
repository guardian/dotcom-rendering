import React from 'react';
import { css, cx } from 'emotion';
import Star from '@guardian/pasteup/icons/star.svg';
import { palette } from '@guardian/src-foundations';

const ratingsWrapper = css`
    background-color: ${palette.yellow.main};
    display: inline-block;
`;

const topMetaSize = css`
    padding: 6px 10px;
    margin: 0 0 6px -10px;
    svg {
        width: 20px;
        height: 20px;
    }
`;

const richLinkSize = css`
    padding: 2px;
    margin-bottom: 5px;
    margin-top: 5px;
    svg {
        width: 15px;
        height: 15px;
    }
`;

const emptyStar = css`
    fill: transparent;
    stroke: ${palette.neutral[7]};
`;

export const StarRating: React.FC<{
    rating: number;
    location: string;
}> = ({ rating, location }) => {
    const sizeClass = location === 'topMeta' ? topMetaSize : richLinkSize;
    const stars = (n: number) => {
        return Array(5)
            .fill(0)
            .map((el, i) => {
                if (i < n) {
                    return <Star key={i} />;
                }
                return <Star className={emptyStar} key={i} />;
            });
    };
    return <div className={cx(ratingsWrapper, sizeClass)}>{stars(rating)}</div>;
};
