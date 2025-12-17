import { css } from '@emotion/react';
import { SvgStar, SvgStarOutline } from '@guardian/source/react-components';
import { palette } from '../../palette';
import type { StarRating as Rating, RatingSizeType } from '../../types/content';
import { from } from '@guardian/source/foundations';

const container = css`
	display: flex;
	flex-direction: row;
`;

const starBackground = css`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
`;

const filledStarColor = css`
	background-color: ${palette('--star-rating-background')};
`;
const emptyStarColor = css`
	background-color: ${palette('--star-rating-empty-background')};
`;
const determineSize = (size: RatingSizeType) => {
	switch (size) {
		case 'small':
			return css`
				column-gap: 1px;

				div {
					width: 18px;
					height: 18px;
				}

				svg {
					width: 16px;
					height: 16px;
				}
			`;

		case 'medium':
			return css`
				column-gap: 2px;

				div {
					width: 22px;
					height: 22px;
				}

				svg {
					width: 20px;
					height: 20px;
				}
			`;
		case 'large':
			return css`
				column-gap: 2px;

				div {
					width: 28px;
					height: 28px;
				}

				svg {
					width: 24px;
					height: 24px;
				}
			`;
	}
};

type PaddingSizeType = 'small' | 'medium' | 'large';

const determinePaddingTop = (size: PaddingSizeType) => {
	switch (size) {
		case 'small':
			return css`
				padding-top: 4px;
			`;

		case 'medium':
			return css`
				padding-top: 4px;

				${from.tablet} {
					padding-top: 8px;
				}
			`;
		case 'large':
			return css`
				padding-top: 8px;

				${from.tablet} {
					padding-top: 12px;
				}
			`;
	}
};

type Props = {
	rating: Rating;
	size: RatingSizeType;
	paddingSize?: PaddingSizeType;
};

export const StarRating = ({ rating, size, paddingSize = 'small' }: Props) => (
	<div
		css={[determineSize(size), determinePaddingTop(paddingSize), container]}
	>
		{Array.from({ length: 5 }, (_, i) =>
			i < rating ? (
				<div key={i} css={[starBackground, filledStarColor]}>
					<SvgStar />
				</div>
			) : (
				<div key={i} css={[starBackground, emptyStarColor]}>
					<SvgStarOutline />
				</div>
			),
		)}
	</div>
);
