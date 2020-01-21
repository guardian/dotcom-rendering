import React from 'react';
import { css, cx } from 'emotion';
import Star from '@frontend/static/icons/star.svg';
import { palette } from '@guardian/src-foundations';

const ratingsWrapper = css`
    background-color: ${palette.brandYellow.main};
    display: inline-block;
`;

const largeStyles = css`
    padding: 2px;
    svg {
        width: 23px;
        height: 23px;
    }
`;

const smallStyles = css`
    padding: 2px;
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
    size: 'large' | 'small';
}> = ({ rating, size = 'small' }) => {
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
    return (
        <div
            className={cx(
                ratingsWrapper,
                size === 'large' && largeStyles,
                size === 'small' && smallStyles,
            )}
        >
            {stars(rating)}
        </div>
    );
};
