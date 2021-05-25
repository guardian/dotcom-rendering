import React from 'react';
import { css } from '@emotion/react';
import { palette } from '@guardian/src-foundations';

import { Star } from '@frontend/static/icons/Star';

const ratingsWrapper = css`
	background-color: ${palette.brandAlt[400]};
	display: inline-block;
`;

const largeSize = css`
	padding: 6px 10px;
	svg {
		width: 20px;
		height: 20px;
	}
`;

const smallSize = css`
	padding: 2px;
	svg {
		width: 15px;
		height: 15px;
	}
`;

export const StarRating: React.FC<{
	rating: number;
	size: string;
}> = ({ rating, size }) => {
	const sizeClass = size === 'large' ? largeSize : smallSize;
	const stars = (n: number) => {
		return Array(5)
			.fill(0)
			.map((_, i) => (
				<Star starId={`${size}${i}`} isEmpty={i >= n} key={i} />
			));
	};
	return <div css={[ratingsWrapper, sizeClass]}>{stars(rating)}</div>;
};
