import { css } from '@emotion/react';
import { palette } from '../palette';
import type { StarRating as Rating, RatingSizeType } from '../types/content';
import { StarRating } from './StarRating/StarRating';
import { StarRatingDeprecated } from './StarRating/StarRatingDeprecated';

type Props = {
	rating: Rating;
	size: RatingSizeType;
	isInStarRatingVariant?: boolean;
};

const starsWrapper = css`
	display: inline-block;
`;

const starWrapperColour = css`
	background-color: ${palette('--star-rating-background')};
	color: ${palette('--star-rating-fill')};
`;

export const StarRatingBlockComponent = ({
	rating,
	size,
	isInStarRatingVariant,
}: Props) => (
	<div
		css={[starsWrapper, !isInStarRatingVariant && starWrapperColour]}
		data-spacefinder-role="inline"
	>
		{isInStarRatingVariant ? (
			<StarRating rating={rating} size={size} />
		) : (
			<StarRatingDeprecated rating={rating} size={size} />
		)}
	</div>
);
