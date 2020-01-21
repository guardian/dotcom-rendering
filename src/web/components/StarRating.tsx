import React from 'react';
import { css, cx } from 'emotion';
import Star from '@frontend/static/icons/star.svg';
import { palette } from '@guardian/src-foundations';

const ratingsWrapper = css`
    background-color: ${palette.brandYellow.main};
    display: inline-block;
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
                padding: 2px;
                svg {
                    width: 15px;
                    height: 15px;
                }
            `;
        case 'medium':
            return css`
                padding: 4px;
                svg {
                    width: 19px;
                    height: 19px;
                }
            `;
        case 'large':
            return css`
                padding: 2px;
                svg {
                    width: 23px;
                    height: 23px;
                }
            `;
    }
};
export const StarRating: React.FC<{
    rating: number;
    size: SizeType;
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
        <div className={cx(ratingsWrapper, determinSize(size))}>
            {stars(rating)}
        </div>
    );
};
