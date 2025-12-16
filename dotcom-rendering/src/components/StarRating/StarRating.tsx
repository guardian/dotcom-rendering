import { css } from '@emotion/react';
import { SvgStar, SvgStarOutline } from '@guardian/source/react-components';
import type { StarRating as Rating, RatingSizeType } from '../../types/content';

const flex = css`
	display: flex;
	flex-direction: row;
	padding: 2px;
`;

const starBackground = css`
	border-radius: 50%;
	width: fit-content;
	height: fit-content;
`;

const filledColor = css`
	background-color: yellow;
`;
const outlineColor = css`
	background-color: grey;
`;
const determineSize = (size: RatingSizeType) => {
	switch (size) {
		case 'small':
			return css`
				column-gap: 1px;
				svg {
					width: 1.3em;
					height: 1.3em;
					margin: 0 -1px -2px;
				}
			`;
		case 'large':
			return css`
				column-gap: 2px;
				svg {
					width: 1.6em;
					height: 1.6em;
					margin: 0 -2px -2px;
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
				<div key={i} css={[starBackground, filledColor]}>
					<SvgStar />
				</div>
			) : (
				<div key={i} css={[starBackground, outlineColor]}>
					<SvgStarOutline />
				</div>
			),
		)}
	</div>
);
