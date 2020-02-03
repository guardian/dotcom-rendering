import React from 'react';
import { css } from 'emotion';
import Star from '@frontend/static/icons/star.svg';
import { palette } from '@guardian/src-foundations';

// https://docs.google.com/spreadsheets/d/1QUa5Kh734J4saFc8ERjCYHZu10_-Hj7llNa2rr8urNg/edit?usp=sharing
// A list style variations for each breakpoint

const starWrapper = css`
    display: inline-block;
    padding: 1px;
`;

type SizeType = 'large' | 'medium' | 'small';

const emptyStar = css`
    fill: transparent;
    stroke: ${palette.neutral[7]};
`;

const determineSize = (size: SizeType) => {
    switch (size) {
        case 'small':
            return css`
                padding: 1px;
                svg {
                    width: 12px;
                    height: 12px;
                }
            `;
        case 'medium':
            return css`
                padding: 1px;
                svg {
                    width: 16px;
                    height: 16px;
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
            .map((_, i) => (
                <div className={starWrapper}>
                    <Star className={i > n ? emptyStar : ''} key={i} />
                </div>
            ));
    };
    return <div className={determineSize(size)}>{stars(rating)}</div>;
};
