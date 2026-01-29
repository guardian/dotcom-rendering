import { css } from '@emotion/react';
import type { StarRating as Rating, RatingSizeType } from '../types/content';
import { StarRating } from './StarRating/StarRating';

type Props = {
	rating: Rating;
	size: RatingSizeType;
};

const starsWrapper = css`
	display: inline-block;
`;

export const StarRatingBlockComponent = ({ rating, size }: Props) => (
	<div css={starsWrapper} data-spacefinder-role="inline">
		<StarRating rating={rating} size={size} />
	</div>
);
