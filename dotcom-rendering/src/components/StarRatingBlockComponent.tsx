import { css } from '@emotion/react';
import { brandAltBackground } from '@guardian/source-foundations';
import type { RatingSizeType } from '../types/content.ts';
import { StarRating } from './StarRating/StarRating.tsx';

type Props = {
	rating: number;
	size: RatingSizeType;
};

const starsWrapper = css`
	background-color: ${brandAltBackground.primary};
	display: inline-block;
`;

export const StarRatingBlockComponent = ({ rating, size }: Props) => (
	<div css={starsWrapper}>
		<StarRating rating={rating} size={size} />
	</div>
);
