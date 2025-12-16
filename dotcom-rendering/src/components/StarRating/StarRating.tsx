import { css } from '@emotion/react';
import { SvgStar, SvgStarOutline } from '@guardian/source/react-components';
import type { StarRating as Rating, RatingSizeType } from '../../types/content';

const padding = css`
	padding: 0 2px;
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
				svg {
					width: 1.3em;
					height: 1.3em;
					margin: 0 -1px -2px;
				}
			`;
		case 'large':
			return css`
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
	<div css={[determineSize(size), padding]}>
		{Array.from({ length: 5 }, (_, i) =>
			i < rating ? (
				<div css={[starBackground, filledColor]}>
					<SvgStar key={i} />
				</div>
			) : (
				<div css={[starBackground, outlineColor]}>
					<SvgStarOutline key={i} />
				</div>
			),
		)}
	</div>
);
