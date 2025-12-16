import { css } from '@emotion/react';
import { SvgStar, SvgStarOutline } from '@guardian/source/react-components';
import { palette } from '../../palette';
import type { StarRating as Rating, RatingSizeType } from '../../types/content';

const flex = css`
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
					width: 12px;
					height: 12px;
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
					width: 14px;
					height: 14px;
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
					width: 18px;
					height: 18px;
				}
			`;
	}
};

type Props = {
	rating: Rating;
	size: RatingSizeType;
};

export const StarRating = ({ rating, size }: Props) => (
	<div css={[determineSize(size), flex]}>
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
