import { css } from '@emotion/react';
import { brandAltBackground } from '@guardian/source-foundations';
import type { RatingSizeType } from '../../types/content';
import { StarRating } from './StarRating/StarRating';

type Props = {
	rating: number;
	size: RatingSizeType;
};

const starsWrapper = css`
	background-color: ${brandAltBackground.primary};
	display: inline-block;
	padding: 1px 1px 0 1px;
`;

export const StarRatingBlockComponent = ({ rating, size }: Props) => (
	<div css={starsWrapper}>
		<StarRating rating={rating} size={size} />
	</div>
);
