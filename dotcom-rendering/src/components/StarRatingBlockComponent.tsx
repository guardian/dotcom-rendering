import { css } from '@emotion/react';
import { palette } from '../palette';
import type { RatingSizeType } from '../types/content';
import type { DCRArticle } from '../types/frontend';
import { StarRating } from './StarRating/StarRating';

type Props = {
	rating: NonNullable<DCRArticle['starRating']>;
	size: RatingSizeType;
};

const starsWrapper = css`
	background-color: ${palette('--star-rating-background')};
	color: ${palette('--star-rating-fill')};
	display: inline-block;
`;

export const StarRatingBlockComponent = ({ rating, size }: Props) => (
	<div css={starsWrapper}>
		<StarRating rating={rating} size={size} />
	</div>
);
