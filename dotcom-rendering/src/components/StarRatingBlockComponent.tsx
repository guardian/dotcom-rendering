import { css } from '@emotion/react';
import { palette } from '../palette';
import type { StarRating as Rating, RatingSizeType } from '../types/content';
import { StarRatingDeprecated } from './StarRating/StarRatingDeprecated';

type Props = {
	rating: Rating;
	size: RatingSizeType;
};

const starsWrapper = css`
	display: inline-block;
`;

const starWrapperColour = css`
	background-color: ${palette('--star-rating-background')};
	color: ${palette('--star-rating-fill')};
`;

export const StarRatingBlockComponent = ({ rating, size }: Props) => (
	<div css={[starsWrapper, starWrapperColour]} data-spacefinder-role="inline">
		<StarRatingDeprecated rating={rating} size={size} />
	</div>
);
