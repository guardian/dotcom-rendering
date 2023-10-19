import { css } from '@emotion/react';
import { palette } from '../palette';
import type { RatingSizeType } from '../types/content';
import { StarRating } from './StarRating/StarRating';

type Props = {
	rating: number;
	size: RatingSizeType;
};

const starsWrapper = css`
	background-color: ${palette('--star-rating-background')};
	display: inline-block;
`;

export const StarRatingBlockComponent = ({ rating, size }: Props) => (
	<div css={starsWrapper}>
		<StarRating rating={rating} size={size} />
	</div>
);
