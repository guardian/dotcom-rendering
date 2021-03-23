import React from 'react';
import { css } from 'emotion';
import { Star } from '@frontend/static/icons/Star';
import { neutral } from '@guardian/src-foundations/palette';

// https://docs.google.com/spreadsheets/d/1QUa5Kh734J4saFc8ERjCYHZu10_-Hj7llNa2rr8urNg/edit?usp=sharing
// A list style variations for each breakpoint

const starWrapper = css`
	display: inline-block;
	padding: 1px;
`;

type SizeType = 'large' | 'medium' | 'small';

const emptyStar = css`
	fill: transparent;
	stroke: ${neutral[7]};
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
}> = ({ rating, size }) => (
	<div className={determineSize(size)}>
		<div className={starWrapper}>
			<Star starId={`${size}1`} isEmpty={rating < 1} />
		</div>
		<div className={starWrapper}>
			<Star starId={`${size}2`} isEmpty={rating < 2} />
		</div>
		<div className={starWrapper}>
			<Star starId={`${size}3`} isEmpty={rating < 3} />
		</div>
		<div className={starWrapper}>
			<Star starId={`${size}4`} isEmpty={rating < 4} />
		</div>
		<div className={starWrapper}>
			<Star starId={`${size}5`} isEmpty={rating < 5} />
		</div>
	</div>
);
