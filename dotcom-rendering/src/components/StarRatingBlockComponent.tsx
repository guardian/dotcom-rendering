import { css } from '@emotion/react';
import { palette } from '../palette';
import type { StarRating as Rating, RatingSizeType } from '../types/content';
import { StarRating } from './StarRating/StarRating';

type Props = {
	rating: Rating;
	size: RatingSizeType;
};

const starsWrapper = css`
	background-color: ${palette('--star-rating-background')};
	color: ${palette('--star-rating-fill')};
	display: inline-block;
`;

export const StarRatingBlockComponent = ({ rating, size }: Props) => (
	<div css={starsWrapper} data-spacefinder-role="inline">
		<StarRating rating={rating} size={size} />
	</div>
);
