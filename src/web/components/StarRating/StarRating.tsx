import React from 'react';
import { css, cx } from 'emotion';
import Star from '@frontend/static/icons/star.svg';
import { palette } from '@guardian/src-foundations';

const ratingsWrapper = css`
    background-color: ${palette.brandYellow.main};
    display: inline-block;
`;

const starWrapper = css`
    display: inline-block;
    padding: 1px;
`;

type SizeType = 'large' | 'medium' | 'small';

const emptyStar = css`
    fill: transparent;
    stroke: ${palette.neutral[7]};
`;

const determinSize = (size: SizeType) => {
    switch (size) {
        case 'small':
            return css`
                padding: 3px;
                svg {
                    width: 12px;
                    height: 12px;
                }
            `;
        case 'medium':
            return css`
                padding: 4px;
                svg {
                    width: 14px;
                    height: 14px;
                }
            `;
        case 'large':
            return css`
                padding: 2px;
                svg {
                    width: 20px;
                    height: 20px;
                }
            `;
    }
};
export const StarRating: React.FC<{
    rating: number;
    size: SizeType;
}> = ({ rating, size }) => {
    const stars = (n: number) => {
        return Array(5)
            .fill(0)
            .map((el, i) => (
                <div className={starWrapper}>
                    {i < n ? (
                        <Star key={i} />
                    ) : (
                        <Star className={emptyStar} key={i} />
                    )}
                </div>
            ));
    };
    return (
        <div className={cx(ratingsWrapper, determinSize(size))}>
            {stars(rating)}
        </div>
    );
};
